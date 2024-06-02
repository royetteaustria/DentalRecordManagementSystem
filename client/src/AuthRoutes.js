
// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import { MdManageAccounts } from "react-icons/md";


const AuthRoutes = [
  {
    name: "Accounts",
    layout: "/auth",
    path: "/",
    icon: <MdManageAccounts className="h-6 w-6" />,
    component: <SignIn />,
  },
  
  
];
export default AuthRoutes;
