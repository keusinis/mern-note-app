import { useState } from "react";
import { Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signup(email, password);
    if (user) {
      toast.success("Welcome!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card bg-neutral">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input input-primary bg-base-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="your password"
                    className="input input-primary bg-base-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && <div className="label text-error">{error}</div>}
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div className="card-actions justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Sign Up"}
                    </button>
                    <Link to={"/login"} className=" btn btn-ghost">
                      Log In Instead
                      <ArrowRightIcon className="size-5" />
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
