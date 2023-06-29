import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import { Button } from "@mui/material";
import IconPhone from "@/Icons/IconPhone";
import { DELETE_SHOP_PHONE } from "@/graphql";
import { useMutation } from "@apollo/client";
import client from "../../../apollo-client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ConfirmDialogIcon from "@/components/ProductCards/ConfirmDialogIcon";
import { showToast } from "@/components/showToast ";
import Head from "next/head";

const ShopPhoneNumbers = () => {
  const { seller, setSellerInfo } = useContext(AuthContext);

  const deletePhoneNumber = async (phone) => {
    await client
      .mutate({
        mutation: DELETE_SHOP_PHONE,
        variables: { phone: phone },
      })
      .then((res) => {
        showToast("success", "phone number deleted");
        setSellerInfo(res.data.deleteShopPhone.shop);
      })
      .catch((err) => {
        showToast("error", err.message);
      });
  };

  return (
    <>
      <Head>
        <title>Shops PhoneNumbers</title>
      </Head>
      <div className="container mx-auto min-h-screen">
        <h1 className="text-4xl font-medium text-primary mt-5">
          Shop phone numbers
        </h1>
        <div className="flex justify-end">
          <Link href="/vendor/addPhone">
            <Button variant="outlined">
              Add Phone <IconPhone />
            </Button>
          </Link>
        </div>
        <div className="mt-5">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    N<sup className="underline mt-3">o</sup>
                  </TableCell>
                  <TableCell align="left">phone Number</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {seller?.phoneNumber?.map((phone, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {phone?.number}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <ConfirmDialogIcon
                        message="Are you sure you went to delete this product ?"
                        productId={phone.number}
                        confirm={deletePhoneNumber}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ShopPhoneNumbers;
