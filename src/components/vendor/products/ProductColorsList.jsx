import Image from "next/image";
import EditProductQuantity from "./EditProductQuantity";
import { TableCell, TableRow } from "@mui/material";

const ProductColorsList = ({
  color,
  index,
  productModelName,
  productId,
  refetch,
}) => {
  return (
    <TableRow
      key={index}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>

      <TableCell align="left">
        {color?.imagesSet.map((images, index) => (
          <>
            {images.image !== null ? (
              <Image
                key={index}
                src={`https://awdma.afroel.com/media/${images.image}`}
                height="50"
                width="50"
                alt="pro image"
                className="rounded-lg"
              />
            ) : (
              <h1>No image for this color</h1>
            )}
          </>
        ))}
      </TableCell>
      <TableCell align="left">{color?.name}</TableCell>
      <TableCell align="left">{color?.quantity}</TableCell>

      <TableCell align="left">
        <EditProductQuantity
          productModelName={productModelName}
          productId={productId}
          color={color}
          refetch={refetch}
        />
      </TableCell>
    </TableRow>
    // <tr className="bg-white border-b hover:bg-gray-100 " key={index}>
    //   <td class="px-6 py-4">
    //     {index + 1}
    //     {color?.id}
    //   </td>

    //   <td className="px-6 py-4 capitalize">{color?.name}</td>
    //   <td className="px-6 py-4 capitalize">{color?.quantity}</td>
    //   <td className="px-6 py-4 capitalize">
    //     <EditProductQuantity
    //       productModelName={productModelName}
    //       productId={productId}
    //       color={color}
    //       refetch={refetch}
    //     />
    //   </td>
    // </tr>
  );
};

export default ProductColorsList;
