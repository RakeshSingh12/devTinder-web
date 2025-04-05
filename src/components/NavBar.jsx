import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((store) => store.user)

  return <div className="navbar bg-base-300 shadow-sm">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">👨‍💻 daisyUI</Link>
    </div>
    <div className="flex gap-2">
      {user && (<div className="dropdown dropdown-end mx-5   flex">
        <p className="py-2 mx-2">Welcome, {user.firstName}</p>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar  justify-center">

          <div className="w-20 rounded-full">

            <img
              alt="user photo"
              src={user.photoURL} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>)}
    </div>
  </div>
}

export default NavBar;