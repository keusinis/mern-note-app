import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = ({ noteAmount }) => (
  <header className="bg-neutral border-b border-base-content/10">
    <div className="mx-auto max-w-6xl p-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-extrabold text-primary tracking-tighter">
          Notes
        </h1>
        <div className="flex items-center gap-4">
          {noteAmount > 0 && (
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>Add Note</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
