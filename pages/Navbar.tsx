import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Services</a>
              <ul className="p-2">
                <li>
                  <a>Certificates</a>
                </li>
                <li>
                  <a>Complaints</a>
                </li>
              </ul>
            </li>
            <li>
              <a>News</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Barangay Tejero</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Home</a>
          </li>
          <li>
            <details>
              <summary>Services</summary>
              <ul className="p-2 bg-base-100 w-40 z-1">
                <li>
                  <a>Certificates</a>
                </li>
                <li>
                  <a>Complaints</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>News</a>
          </li>
          <li>
            <a>About</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link className="btn" href={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
