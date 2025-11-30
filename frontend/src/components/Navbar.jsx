import { Link } from "react-router";
import { LogIn, LogOut, PlusIcon, SquarePen } from "lucide-react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
// import { toast } from "react-hot-toast";

const Navbar = ({ noteAmount }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogoutClick = () => {
    if (!window.confirm("Log Out?")) return;
    logout();
  };

  return (
    <header className="bg-neutral border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-4xl font-extrabold text-primary tracking-tighter">
            Notes
          </h1>
          <div className="flex items-center gap-4">
            {user && (
              <>
                {noteAmount > 0 && (
                  <Link to={"/create"} className="btn btn-primary">
                    <PlusIcon className="size-5" />
                    <span>Add Note</span>
                  </Link>
                )}
                <div className="flex flex-col items-center">
                  <span className="text text-xs">{user?.email}</span>
                  <Link
                    onClick={handleLogoutClick}
                    className="btn btn-ghost btn-sm"
                  >
                    <LogOut className="size-5" />
                    <span>Log Out</span>
                  </Link>
                </div>
              </>
            )}
            {/* {!user && false && (
              <>
                <Link
                  to={"/login"}
                  className="btn btn-ghost btn-sm"
                >
                  <LogIn className="size-5" />
                  <span>Log In</span>
                </Link>
                <Link
                  to={"/signup"}
                  className="btn btn-ghost btn-sm"
                >
                  <SquarePen className="size-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )} */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
