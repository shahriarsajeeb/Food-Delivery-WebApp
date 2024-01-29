"use client";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Icons } from "../../../utils/Icon";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FOODS } from "../../../graphql/actions/get.foods";
import Loader from "../layout/loader";
import { format } from "timeago.js";
import { DELETE_FOOD } from "../../../graphql/actions/delete.food";
import toast from "react-hot-toast";

const FoodData = () => {
  const { data, loading, refetch } = useQuery(GET_FOODS);
  const [DeleteFood] = useMutation(DELETE_FOOD);
  const foods = data?.getLoggedInRestaurantFoods?.foods;

  const handleDeleteFood = async (e: string) => {
    await DeleteFood({
      variables: {
        id: e,
      },
      refetchQueries: [{ query: GET_FOODS }],
    })
      .then((res) => {
        toast.success("Your Food Deleted successfully!");
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns: GridColDef<FoodsDataType>[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", flex: 0.5 },
    { field: "totalOrders", headerName: "Total Orders", flex: 0.5 },
    { field: "createdAt", headerName: "Created At", flex: 0.5 },
    {
      field: " ",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div className="md:w-[50%] flex justify-center">
            <span
              className="text-3xl cursor-pointer"
              onClick={() => handleDeleteFood(params.row.id)}
            >
              {Icons.delete}
            </span>
          </div>
        );
      },
    },
  ];

  const rows: FoodsDataType[] = [];

  foods?.map((i: FoodsDataType) => {
    rows.push({
      id: i.id,
      name: i.name,
      price: i.price + "$",
      totalOrders: 10,
      createdAt: format(i.createdAt),
    });
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Box
            m={"40px 0 0 0"}
            height={"85vh"}
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
            <DataGrid checkboxSelection={true} rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default FoodData;
