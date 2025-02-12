import { Link, useLocation } from "react-router-dom";
import { HomeIcon, UserGroupIcon, ClipboardDocumentIcon,  ChartBarIcon, CogIcon,  UserIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";




const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/", icon: <HomeIcon className="w-5 h-5" /> },
    { name: "Leads", path: "/leads", icon: <UserGroupIcon className="w-5 h-5" /> },
    { name: "Sales", path: "/sales", icon: <CurrencyDollarIcon className="w-5 h-5" /> },
    { name: "Lead Status View", path: "/statusview", icon:<ClipboardDocumentIcon className="w-5 h-5"/>},
    { name: "Agents", path: "/agents", icon: <UserIcon className="w-5 h-5" /> },
    { name: "Reports", path: "/reports", icon: <ChartBarIcon className="w-5 h-5" /> },
    { name: "Settings", path: "/settings", icon: <CogIcon className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-md h-screen  p-5 ">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">OpportuniCRM</h2>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
