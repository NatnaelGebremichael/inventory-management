"use client";

import { useGetProductsQuery } from "@/state/api/productApi";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useOrganization } from "@clerk/nextjs";
import { useState } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`, //(params) => params.value ? `$${params.value}` : 'N/A',
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"), //(params) => params.value !== undefined ? params.value : "N/A",
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const { organization } = useOrganization();
  const organizationID = organization?.id;
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery({
    search: searchTerm,
    organizationId: organizationID!,
  });

  if (isLoading) {
    return <div className="py-4">Loading..</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-100 mt-5 !text-gray-700"
      />
    </div>
  );
}

export default Inventory;
