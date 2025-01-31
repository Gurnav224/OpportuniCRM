import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="border w-40 p-3">
    <h1 className="text-2xl" >Sidebar</h1>
    <nav>
      <ul>
      <li>
        <Link to={'/'}>Home</Link>
      </li>
        <li>
          <Link to={'/leads'}>Leads</Link>
        </li>
        <li>
          <Link to={'/sales'}>Sales</Link>
        </li>
        <li>
          <Link to={'/agents'}>Agents</Link>
        </li>
        <li>
          <Link to={'/reports'}>Reports</Link>
        </li>
        <li>
          <Link to={'/settings'}>Settings</Link>
        </li>
      </ul>
    </nav>
  </aside>
  )
}

export default Sidebar
