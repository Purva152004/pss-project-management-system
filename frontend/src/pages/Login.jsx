import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      const user = JSON.parse(localStorage.getItem("user"));

      if (user.role === "admin") navigate("/admin");
      if (user.role === "employee") navigate("/employee");
      if (user.role === "client") navigate("/client");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded w-96">
        <h2 className="text-2xl mb-6 text-center font-bold">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;