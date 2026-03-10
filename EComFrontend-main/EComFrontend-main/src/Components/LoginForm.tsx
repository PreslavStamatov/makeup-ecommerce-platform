import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../Context/useAuth";

interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const { loginUser } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your login logic here

    loginUser(formData.email, formData.password);
  };

  return (
      <div className="w-full h-4/6 flex flex-col bg-white p-8 rounded-md">
        <h2 className="font-bold text-gray-800 mb-6 text-4xl">Login with email address</h2>
        <h2 className="font-semibold text-gray-800 mb-6 text-md">Login with email address or
          <a href="/register" className="text-primary"> create account</a>.
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full h-3/6 px-3 py-4 border border-gray-400 rounded-3xl shadow-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-4 border border-gray-400 rounded-3xl shadow-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Remember Me */}
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-4 font-semibold rounded-3xl hover:bg-white hover:text-primary border border-primary
            bg-primary mb-4"
          >
            Login
          </button>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-800 font-semibold">
              Keep me logged in
            </label>
          </div>
        </form>
      </div>
  );
};

export default LoginForm;