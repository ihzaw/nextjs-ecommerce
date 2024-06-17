import Link from "next/link";
import LoginForm from "./LoginForm";
import OrderHistoryBtn from "./OrderHistoryBtn";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 p-8">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">Hasui Kawase's Prints</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li className="flex justify-center">
            <OrderHistoryBtn />
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
