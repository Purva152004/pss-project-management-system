import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="font-bold">Purva Software Solutions</h1>
      {user && (
        <div className="flex gap-4">
          <span>{user.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;