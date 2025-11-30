import { UserIcon, SparklesIcon, NotebookIcon } from "lucide-react";
import { LogIn, LogOut, PlusIcon, SquarePen } from "lucide-react";
import { Link } from "react-router";

const UnauthorizedUser = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">Welcome to Notes</h3>
      <p className="text-base-content/70">
        Sign in to start!
        Access your Notes across all your devices.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Link to="/login" className="btn btn-primary flex-1">
          <LogIn className="size-5" />
          Sign In
        </Link>
        <Link to="/signup" className="btn btn-outline btn-primary flex-1">
          <SquarePen className="size-5" />
          Create Account
        </Link>
      </div>
      <div className="mt-4 p-4 bg-base-200 rounded-lg"></div>
    </div>
  );
};

export default UnauthorizedUser;
