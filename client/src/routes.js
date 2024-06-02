import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import DataTables from "views/admin/tables";
import { FaCalendarAlt } from "react-icons/fa";
// Icon Imports
import { BsPeopleFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import Appointment from "views/admin/appointment/Appointment";
const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Clients",
    layout: "/admin",
    icon: <BsPeopleFill className="h-6 w-6" />,
    path: "Client",
    component: <DataTables />,
  },
  {
    name: "Appointements",
    layout: "/admin",
    path: "appointment",
    icon: <FaCalendarAlt className="h-5 w-5 " />,
    component: <Appointment />,
  },
  // {
  //   name: "Accounts",
  //   layout: "/admin",
  //   path: "account",
  //   icon: <MdManageAccounts className="h-5 w-5 " />,
  //   component: <AddAccount />,
  // },
  
  
  
];
export default routes;
