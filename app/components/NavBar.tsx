import LoginForm from "./LoginForm";

interface NavBarProps {}

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 p-8">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Hasui Kawase's Prints</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="flex justify-center">
            <a>Products</a>
          </li>
          <li>
            <details className="dropdown dropdown-end">
              <summary>
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
              </summary>
              <LoginForm />
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
