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


const DashboardTable = () => {
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
    
  ], []);

  const tableData = useMemo(() => {
    if (Array.isArray(data)) {
      return  data.slice(-2);;
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
          Recent Clients
        </div>
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

export default DashboardTable;
