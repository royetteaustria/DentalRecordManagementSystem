import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { BsPeopleFill } from "react-icons/bs";

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-5">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings this month"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<BsPeopleFill  className="h-6 w-6" />}
          title={"Total Clients"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1">
        <TotalSpent />
        {/* <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div> */}
        {/* <WeeklyRevenue /> */}
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 flex flex-col md:flex-row">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
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
