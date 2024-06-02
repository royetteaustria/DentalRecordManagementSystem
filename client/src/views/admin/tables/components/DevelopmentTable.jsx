import Card from "components/card";
import { Link } from "react-router-dom";
import React, { useMemo } from "react";
import useFetch from "hooks/api/fetch/useFetch";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import useFormatDateTime from "hooks/Date/useDateFormat";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Skeleton from "components/Loader/Skeleton";
import NoConnection from "components/Error/NoConnection";

const DevelopmentTable = () => {
  const url = `http://localhost:4000/api/ClientRoutes`;
  const { data, loading, error } = useFetch(url);
  const date = useFormatDateTime()
  const columnsData = useMemo(() => [
    {
      Header: "Name",
      accessor: "Name",
      Cell: ({ row }) => `${row.original.FirstName.toUpperCase()} ${row.original.LastName.toUpperCase()}`
    },
    {
      Header: "Dental Type Services",
      accessor: "DentalTypeServices",
      Cell: ({ value }) => value.toUpperCase(), // Uppercasing the value
    },
    {
      Header: "Status",
      accessor: "ClientStatus",
      Cell: ({ value }) => (<span style={{ color: value === "Pending" ? "orange" : "green" }}>
      {value.toUpperCase()}
    </span>)
    },
    {
      Header: "Date Start",
      accessor: "DateStart",
      Cell: ({ value }) => {
        return date(value);
      },
    },
    {
      Header: "Actions",
      accessor: "Actions",
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link to={`profile/${row.original._id}`}>
            <MdOutlineRemoveRedEye className="text-xl text-blue-500 hover:text-blue-700" />
          </Link>
          <Link to={`UpdateClient/${row.original._id}`}>
            <FaRegEdit className="text-xl text-green-500 hover:text-green-700" />
          </Link>
        </div>
      ),
    }
  ], []);

  const tableData = useMemo(() => {
    if (Array.isArray(data)) {
      return data;
    } else {
      return []; // or return a fallback value if data is not an array
    }
  }, [data]);
  

  const tableInstance = useTable(
    {
      columns: columnsData,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;

  initialState.pageSize = 11;

  if (loading) {
    return <div><Skeleton/></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card extra={"w-full h-full p-4"}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Clients
        </div>
        <button className="linear mt-2 w-28 rounded-xl bg-brand-500 py-[8px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          <Link to='/admin/addClient'>Add Client</Link>
        </button>
      </div>

      <div className="h-full overflow-x-scroll xl:overflow-x-hidden">
        <table
          className="mt-8 h-max w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-gray-200 pr-32 pb-[10px] text-start dark:!border-navy-700 "
                    key={column.id}
                  >
                    <div className="text-md font-bold tracking-wide text-black">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.length === 0 ? (
              <tr>
                <td colSpan={columnsData.length} className="text-center py-4">
                  <p className="italic">No data available</p>
                </td>
              </tr>
            ) : (
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="border-b border-gray-200 pr-32 pb-[10px] text-start dark:border-navy-700 "
                        key={cell.column.id}
                      >
                        <div className="text-md text-black py-4">
                          {cell.render("Cell")}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default DevelopmentTable;
