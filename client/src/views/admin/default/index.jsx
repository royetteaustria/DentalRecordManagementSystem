import MiniCalendar from "components/calendar/MiniCalendar";
import TotalSpent from "views/admin/default/components/TotalSpent";
import { MdBarChart } from "react-icons/md";
import Widget from "components/widget/Widget";
import { BsPeopleFill } from "react-icons/bs";
import DashboardTable from "../tables/components/DashboardTable";
import useFetch from "hooks/api/fetch/useFetch";
import { useMemo } from "react";
import CardsLoader from "components/Loader/CardsLoader";

const Dashboard = () => {
  const url = `http://localhost:4000/api/ClientRoutes`;
  const { data, loading, error } = useFetch(url);

  const totalDownpayment = useMemo(() => {
    if (data) {
      return data.reduce((sum, client) => sum + (client.DownPayment || 0), 0);
    }
    return 0;
  }, [data]);
  const totalDownpaymentThisMonth = useMemo(() => {
    if (data) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      return data.reduce((sum, client) => {
        const clientDate = new Date(client.createdAt); // Assuming `createdAt` field exists
        const clientMonth = clientDate.getMonth();
        const clientYear = clientDate.getFullYear();

        if (clientMonth === currentMonth && clientYear === currentYear) {
          return sum + (client.DownPayment || 0);
        }
        return sum;
      }, 0);
    }
    return 0;
  }, [data]);
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-2 3xl:grid-cols-2">
      {/* <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings this month"}
          subtitle={totalDownpaymentThisMonth.toFixed(2)}
        /> */}
        { loading ? <CardsLoader/> : error? 'Error' :
        <Widget
        icon={<BsPeopleFill className="h-6 w-6" />}
        title={"Total Clients"}
        subtitle={data ? data.length : 0}
      />
        }
        { loading ? <CardsLoader/> : error? 'Error' :
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={`₱${totalDownpayment}`}
        />
      }
      </div>

      {/* Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
        <TotalSpent />
      </div> */}

      {/* Tables & Charts */}

      <div className="mt-5 flex flex-col md:flex-row">
        <DashboardTable
          // columnsData={columnsDataComplex}
          // tableData={tableDataComplex}
        />
        <div className="md:ml-5">
          {/* Task chart & Calendar */}
          {/* <TaskCard /> */}
          <div className="mt-4 grid grid-cols-1 justify-end rounded-[20px] md:mt-0">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
