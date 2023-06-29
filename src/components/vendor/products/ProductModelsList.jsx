import { TableCell, TableRow } from "@mui/material";
import EditProductModel from "./EditProductModel";
import ProductColors from "./ProductColors";

const ProductModelsList = ({ model, index, refetch, Image }) => {
  return (
    <TableRow
      key={index}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>

      <TableCell align="left">{model?.name}</TableCell>
      <TableCell align="left">{model?.price}</TableCell>
      <TableCell align="left">{model?.discount}</TableCell>
      <TableCell align="left">{model?.massKg}</TableCell>
      <TableCell align="left">{model?.volume}</TableCell>
      <TableCell align="left">
        <ProductColors
          productcolorSet={model.productcolorSet}
          productModelName={model?.name}
          productId={model.productId}
          refetch={refetch}
        />
      </TableCell>
      <TableCell align="left">
        <EditProductModel model={model} refetch={refetch} />
      </TableCell>
    </TableRow>
  );
};

export default ProductModelsList;
