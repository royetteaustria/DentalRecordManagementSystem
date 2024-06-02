// Auth Imports
import SignIn from "views/auth/SignIn";
import EmailVerfied from "views/auth/EmailVerified";
import { MdOutlineEmail } from "react-icons/md";
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
  {
    name: "EmailVerified",
    layout: "/auth",
    path: "emailVerified",
    icon: <MdOutlineEmail className="h-6 w-6" />,
    component: <EmailVerfied />,
  },
];
export default AuthRoutes;
