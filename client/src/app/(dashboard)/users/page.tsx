"use client";

import { useGetEmployeesQuery } from "@/state/api/employeeApi";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "firstName", headerName: "First Name", width: 100 },
  { field: "lastName", headerName: "Last Name", width: 100 },
  { field: "position", headerName: "Position", width: 200 },
];

function Users() {
  const { data: users, isError, isLoading } = useGetEmployeesQuery();

  if (isLoading) {
    return <div className="py-4">Loading..</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-100 mt-5 !text-gray-700"
      />
    </div>
  );
}

export default Users;
