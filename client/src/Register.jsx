import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useContext(AuthContext); // 🧠 use context

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("Registering...");

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          login(data.token); // ✅ save token and set user
        } else {
          setMessage("✅ Registered, now log in.");
        }

        setEmail("");
        setPassword("");
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setMessage("❌ Server error. Try again.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white shadow-md p-6 rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Register
        </button>
      </form>

      {message && (
        <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
