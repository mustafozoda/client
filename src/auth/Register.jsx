import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await register({ username, email, password });

    if (result.success) {
      navigate("/login");
    } else {
      setError("Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-96 bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-center text-2xl font-bold">Register</h2>
        {error && <p className="text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* <label className="block text-gray-700">Username</label> */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full rounded border p-2 text-black"
              required
            />
          </div>
          <div>
            {/* <label className="block text-gray-700">Email</label> */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded border p-2 text-black"
              required
            />
          </div>
          <div>
            {/* <label className="block text-gray-700">Password</label> */}
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border p-2 text-black"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded p-2 text-white transition ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
