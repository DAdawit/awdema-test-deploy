import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

const PaginationComponent = ({ page, handleChange, count }) => {
  return (
    // <Stack spacing={2}>
    // <Grid item xs={2}>
    <div className="flex justify-center gap-2 items-center my-5">
      <Typography>Page: {page}</Typography>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </div>
    // </Grid>
    // </Stack>
  );
};
export default PaginationComponent;
