"use client";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const OrdersData = ({ isDashboard }: { isDashboard?: boolean }) => {
  const colums: GridColDef<OrdersDataType>[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
    },
    { field: "name", headerName: "Name", flex: isDashboard ? 0.8 : 0.5 },
    ...(isDashboard ? [] : [{ field: "email", headerName: "Email", flex: 1 }]),
    { field: "title", headerName: "Food", flex: 0.8 },
    { field: "price", type: "number", headerName: "Price", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
  ];

  const rows: OrdersDataType[] = [];

  [...Array(10)].map((i: OrdersDataType) => {
    rows.push({
      id: "123",
      name: "shahriar sajeeb",
      email: "support@becodemy.com",
      title: "Juicy chicken burger",
      price: "12$",
      created_at: "2days ago",
    });
  });

  return (
    <Box>
      <Box
        m={isDashboard ? "0" : "40px 0 0 0"}
        height={isDashboard ? "60vh" : "85vh"}
        overflow={"hidden"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            outline: "none",
          },
          "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
            color: "#fff",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#fff",
          },
          "& .MuiDataGrid-row": {
            color: "#fff",
            borderBottom: "1px solid #ffffff30!important",
          },
          "& .MuiTablePagination-root": {
            color: "#fff",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none!important",
          },
          "& .name-column--cell": {
            color: "#fff",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3e4396",
            borderBottom: "none",
            color: "#fff",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#1F2A40",
          },
          "& .MuiDataGrid-footerContainer": {
            color: "#fff",
            borderTop: "none",
            backgroundColor: "#3e4396",
          },
          "& .MuiCheckbox-root": {
            color: `#b7ebde !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `#fff !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection={isDashboard ? false : true}
          rows={rows}
          columns={colums}
        />
      </Box>
    </Box>
  );
};

export default OrdersData;
