import {
  RiShieldUserFill,
  RiLoginCircleLine,
  RiShutDownLine,
} from "react-icons/ri";
import { FaPersonSnowboarding, FaCircleUser, FaUserPen } from "react-icons/fa6";
import { PiDotsThreeOutlineDuotone, PiPiggyBank } from "react-icons/pi";
import { TiHome } from "react-icons/ti";
import { HiMail } from "react-icons/hi";
import { BsFillShieldLockFill } from "react-icons/bs";
import {
  IoEye,
  IoEyeOff,
  IoSettingsOutline,
  IoDocumentTextOutline,
  IoPricetag,
  IoAddCircleOutline,
  IoEyeOutline,
} from "react-icons/io5";
import { FaSnowboarding } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { TbMoneybag, TbEdit } from "react-icons/tb";
import { BiDollarCircle, BiMoneyWithdraw } from "react-icons/bi";
import { LuMenu } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import { MdLockReset } from "react-icons/md";

/* 🔥 GLOBAL ICON WRAPPER (fix size everywhere) */
const withIcon = (Icon) => (props) =>
  <Icon size={16} className="shrink-0" {...props} />;

/* ✅ Export all icons with controlled size */
export const Register = withIcon(RiShieldUserFill);
export const Login = withIcon(RiLoginCircleLine);
export const StartNow = withIcon(FaPersonSnowboarding);
export const ThreeDots = withIcon(PiDotsThreeOutlineDuotone);
export const Home = withIcon(TiHome);
export const User = withIcon(FaCircleUser);
export const Email = withIcon(HiMail);
export const Password = withIcon(BsFillShieldLockFill);
export const Eye = withIcon(IoEye);
export const EyeOff = withIcon(IoEyeOff);
export const Logout = withIcon(FaSnowboarding);
export const Dashboard = withIcon(RxDashboard);
export const Income = withIcon(TbMoneybag);
export const Expense = withIcon(BiDollarCircle);
export const Settings = withIcon(IoSettingsOutline);
export const ShutDown = withIcon(RiShutDownLine);
export const Menu = withIcon(LuMenu);
export const Balance = withIcon(PiPiggyBank);
export const Title = withIcon(IoDocumentTextOutline);
export const Category = withIcon(IoPricetag);
export const Add = withIcon(IoAddCircleOutline);
export const Amount = withIcon(BiMoneyWithdraw);
export const Edit = withIcon(TbEdit);
export const Delete = withIcon(FiTrash);
export const EyeOutline = withIcon(IoEyeOutline);
export const UpdateProfile = withIcon(FaUserPen);
export const ResetPassword = withIcon(MdLockReset);