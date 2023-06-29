import IconBasket from "@/Icons/IconBasket";
import IconDashboard from "@/Icons/IconDashboard";
import IconDeliveryReturn from "@/Icons/IconDeliverReturn";
import IconDelivery from "@/Icons/IconDelivery";
import IconStar from "@/Icons/iconStar";
import Chart from "chart.js/auto";
import TotalRevenu from "./TotalRevenu";
import ProductSellByCategory from "./ProductSellByCategory";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Table,
} from "@mui/material";
import PurchasesForTheYear from "./PurchasesForTheYear";

const GeneralReport = () => {
  let orders = [
    {
      name: "WMQ96921",
      date: "18 Sep 2019",
      order: "#ABU81275",
      quantity: "8",
      price: "14689",
      status: "Completed",
    },
    {
      name: "WMQ60538",
      date: "29 May 2019",
      order: "#HGA55521",
      quantity: "34",
      price: "19888",
      status: "Delayed",
    },
    {
      name: "WMQ95994",
      date: "24 Jun 2019",
      order: "#HGA99169",
      quantity: "36",
      price: "90939",
      status: "Cancelled",
    },
    {
      name: "WMQ37340",
      date: "18 Sep 2019",
      order: "#HGA26866",
      quantity: "128",
      price: "41198",
      status: "Delayed",
    },
    {
      name: "WMQ61947",
      date: "18 Sep 2019",
      order: "#XCA68589",
      quantity: "67",
      price: "68601",
      status: "Completed",
    },
    {
      name: "WMQ37027",
      date: "18 Sep 2019",
      order: "#XCA24410",
      quantity: "527",
      price: "73",
      status: "Completed",
    },
  ];
  // git clone -b update_script https://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@github.com/Razala10/alx-pre_course.git
  return (
    <>
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-evenly gap-5">
          <div className="grid bg-rose-500 px-5  py-3 text-white rounded-xl w-full">
            <div className="flex gap-2 ">
              <span className="block hover:scale-110">
                <IconStar />
              </span>
              <span>Sales</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <h1 className="text-4xl font-medium">5968</h1>
              <small>
                <h5 className="px-2 py-1 border-2 border-white rounded-xl text-xs">
                  High 311
                </h5>
              </small>
            </div>
            <h2 className="text-sm mt-2">Total for this month</h2>
          </div>
          <div className="grid bg-teal-600 px-5  py-3 text-white rounded-xl w-full">
            <div className="flex gap-2 ">
              <span className="block hover:scale-110">
                <IconBasket />
              </span>
              <span>Purchases</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <h1 className="text-4xl font-medium">5968</h1>
              <small>
                <h5 className="px-2 py-1 border-2 border-white rounded-xl text-xs">
                  High 311
                </h5>
              </small>
            </div>
            <h2 className="text-sm mt-2">Total for this month</h2>
          </div>
          <div className="grid bg-cyan-600 px-5  py-3 text-white rounded-xl w-full">
            <div className="flex gap-3">
              <span className="block hover:scale-110">
                <IconDeliveryReturn />
              </span>
              <span>Returns</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <h1 className="text-4xl font-medium">5968</h1>
              <small>
                <h5 className="px-2 py-1 border-2 border-white rounded-xl text-xs">
                  High 311
                </h5>
              </small>
            </div>
            <h2 className="text-sm mt-2">Total for this month</h2>
          </div>
          <div className="grid bg-violet-600 px-5  py-3 text-white rounded-xl w-full">
            <div className="flex gap-2 ">
              <span className="block hover:scale-110">
                <IconDelivery />
              </span>
              <span>Deliveries</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <h1 className="text-4xl font-medium">5968</h1>
              <small>
                <h5 className="px-2 py-1 border-2 border-white rounded-xl text-xs">
                  High 311
                </h5>
              </small>
            </div>
            <h2 className="text-sm mt-2">Total for this month</h2>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 md:gap-2 lg:gap-16 mt-10">
        <div className="grid grid-cols-1  mt-10 shadow-lg w-full rounded-lg">
          <h1 className="mb-3 px-5 mt-3 text-gray-800 font-medium">
            Customers
          </h1>
          <h1 className="text-gray-600 px-5 text-sm">
            Total customers this month
          </h1>
          <div className="flex flex-col justify-center items-center my-16 ">
            <h1 className="font-extrabold text-5xl text-gray-900">9258</h1>
            <h4 className="text-gray-700">
              <span className="text-sky-700">1.35 </span> more than last month
            </h4>
          </div>
          {/* eslint-disable-next-line */}
          <img src="/wave1.svg" alt="chart" />
        </div>
        <div className="grid grid-cols-1  mt-10 shadow-lg w-full rounded-lg">
          <h1 className="mb-3 px-5 mt-3 text-gray-800 font-medium">
            Conversion
          </h1>
          <h1 className="text-gray-600 px-5 text-sm">
            Total conversion this month
          </h1>
          <div className="flex flex-col justify-center items-center my-16 ">
            <h1 className="font-extrabold text-5xl text-gray-900">9258</h1>
            <h4 className="text-gray-700">
              <span className="text-sky-700">1.35 </span> more than last month
            </h4>
          </div>
          {/* eslint-disable-next-line */}
          <img src="/wave2.svg" alt="chart" />
        </div>
        <div className="grid grid-cols-1  mt-10 shadow-lg w-full rounded-lg">
          <h1 className="mb-3 px-5 mt-3 text-gray-800 font-medium">Revenue</h1>
          <h1 className="text-gray-600 px-5 text-sm">
            Total Revenue this month
          </h1>
          <div className="flex flex-col justify-center items-center my-16 ">
            <h1 className="font-extrabold text-5xl text-gray-900">9258</h1>
            <h4 className="text-gray-700">
              <span className="text-sky-700">1.35 </span> more than last month
            </h4>
          </div>
          {/* eslint-disable-next-line */}
          <img src="/wave3.svg" alt="chart" />
        </div>
      </div>

      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 mt-10 gap-5">
        <div className="grid grid-cols-1 md:col-span-2 shadow-lg">
          <h3 className="px-5 font-medium text-gray-800 mt-3">
            Revenue For Last 30 Days
          </h3>
          <p className="px-5 text-sm mt-3 text-gray-600">
            sales Performance for online revenue of past 30 days
          </p>
          <div className="px-3 pb-5">
            <TotalRevenu />
          </div>
        </div>
        <div className="grid grid-cols-1 md:col-span-1 shadow-lg">
          <h3 className="px-5 font-medium text-gray-800 mt-3">
            All Online Sales
          </h3>
          <p className="px-5 text-sm mt-3 text-gray-600">
            The total number of sessions within the date range. It is the period
            time a user is actively engaged with your website, page or app, etc.
          </p>
          <div className="px-3 pb-5 flex justify-center">
            <ProductSellByCategory />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 mt-10 gap-5">
        <div className="col-span-1 md:col-span-2 ">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Product</TableCell>
                  <TableCell align="left">Order</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Amount</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.date}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.order}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.quantity}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.price}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.status == "Completed" ? (
                        <Chip
                          label={`${order.status}`}
                          color="primary"
                          variant="outlined"
                        />
                      ) : null}
                      {order.status == "Delayed" ? (
                        <Chip
                          label={`${order.status}`}
                          color="warning"
                          variant="outlined"
                        />
                      ) : null}
                      {order.status == "Cancelled" ? (
                        <Chip
                          label={`${order.status}`}
                          color="error"
                          variant="outlined"
                        />
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="col-span-1 shadow-lg relative">
          <div>
            <h3 className="px-5 mt-5 text-gray-800">Sales Total</h3>
            <h1 className="px-5 text-5xl text-gray-900 font-bold mt-3">
              $97562
            </h1>
            <p className="px-5 text-sm text-gray-600 mt-10">
              The French Revolution constituted for the conscience of the
              dominant aristocratic class a fall from innocence, and upturning
              of the natural chain
            </p>

            {/* eslint-disable-next-line */}
            <img src="/wave4.svg" alt="chart" className="absolute bottom-0" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 mt-10 gap-5">
        <div className="col-span-1 ">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Invoice number </TableCell>
                  <TableCell align="left">product</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.order}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {order.status == "Completed" ? (
                        <Chip label={`${order.status}`} color="primary" />
                      ) : null}
                      {order.status == "Delayed" ? (
                        <Chip label={`${order.status}`} color="warning" />
                      ) : null}
                      {order.status == "Cancelled" ? (
                        <Chip label={`${order.status}`} color="error" />
                      ) : null}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="col-span-1 shadow-lg flex justify-center items-center">
          <PurchasesForTheYear />
        </div>
      </div>
    </>
  );
};

export default GeneralReport;
