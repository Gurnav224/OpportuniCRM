import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="border w-40 p-3">
    <nav>
      <ul>
      <li>
        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={'/'}>Home</Link>
      </li>
        <li>
          <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={'/leads'}>Leads</Link>
        </li>
        <li>
          <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={'/sales'}>Sales</Link>
        </li>
        <li>
          <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={'/agents'}>Agents</Link>
        </li>
        <li>
          <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={'/reports'}>Reports</Link>
        </li>
        <li>
          <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={'/settings'}>Settings</Link>
        </li>
      </ul>
    </nav>
  </aside>
  )
}

export default Sidebar
