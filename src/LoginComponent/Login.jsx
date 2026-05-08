import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const API = import.meta.env.VITE_API_URL;

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [newEmail, setnewEmail] = useState("");
    const [newuser, setnewuser] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [Conpassword, setConPassword] = useState("");

    const [errorEmail, seterrorEmail] = useState(null);
    const [errorpass, seterrorpass] = useState(null);
    const [errorname, seterrorname] = useState(null);

    const [signedup, setsignedup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    // LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/api/auth/login`, {
                username,
                password,
            });

            const user = res.data.user;
            const token = res.data.token;

            localStorage.setItem("token", token);
            localStorage.setItem("loggedUser", JSON.stringify(user));

            navigate("/Home");
        } catch (err) {
            swal("Login Failed", err.response?.data?.msg || "Invalid credentials", "error");
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(newEmail)) {
            seterrorEmail("Invalid email");
            return;
        }
        if (newpassword.length < 8) {
            seterrorpass("Minimum 8 characters required");
            return;
        }
        if (newuser.length > 12) {
            seterrorname("Max 12 characters allowed");
            return;
        }
        if (newpassword !== Conpassword) {
            alert("Passwords must match");
            return;
        }

        try {
            await axios.post(`${API}/api/auth/signup`, {
                email: newEmail,
                username: newuser,
                password: newpassword,
            });

            swal("Success", "Signup successful. Please login.", "success");

            setsignedup(false);
            setnewEmail("");
            setnewuser("");
            setnewpassword("");
            setConPassword("");

            seterrorEmail(null);
            seterrorpass(null);
            seterrorname(null);

        } catch (err) {
            swal("Signup Failed", err.response?.data?.msg || "Error", "error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">

            <div className="w-[1100px] h-[500px] bg-gray-100 rounded-xl shadow-lg flex overflow-hidden ">

                {!signedup ? (
                    <>
                        <div className="w-1/2 bg-blue-50 flex flex-col justify-center items-center p-8">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                Welcome Back
                            </h1>
                            <img
                                src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
                                className="w-60 mb-4"
                                alt="login"
                            />
                            <p className="text-gray-600 text-center">
                                Login to continue your surveys.
                            </p>
                        </div>

                        <div className="w-1/2  flex flex-col justify-content-center p-10 m-10">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center" >Login</h2>

                            <form onSubmit={handleLogin} className="space-y-4">

                                <input
                                    type="text"
                                    placeholder="Username or Email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                                </div>

                                <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
                                    Login
                                </button>

                                <p className="text-sm text-center">
                                    Not registered?{" "}
                                    <span
                                        className="text-blue-600 cursor-pointer"
                                        onClick={() => setsignedup(true)}
                                    >
                    Create account
                  </span>
                                </p>

                            </form>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-1/2 p-12">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                                Sign Up
                            </h2>

                            <form onSubmit={handleSignUp} className="space-y-4">

                                <div>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        value={newEmail}
                                        onChange={(e) => setnewEmail(e.target.value)}
                                        className={`w-full p-3 border rounded-md focus:ring-2 transition ${
                                            errorEmail
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-500"
                                        }`}
                                    />
                                    {errorEmail && (
                                        <div className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            ⚠ {errorEmail}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={newuser}
                                        onChange={(e) => setnewuser(e.target.value)}
                                        className={`w-full p-3 border rounded-md ${
                                            errorname ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errorname && (
                                        <div className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            ⚠ {errorname}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={newpassword}
                                            onChange={(e) => setnewpassword(e.target.value)}
                                            className={`w-full p-3 border rounded-md ${
                                                errorpass ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        <span
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-600"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
                                    </div>

                                    {errorpass && (
                                        <div className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            ⚠ {errorpass}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            value={Conpassword}
                                            onChange={(e) => setConPassword(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        />
                                        <span
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-600"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
                                    </div>
                                </div>


                                <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
                                    Sign Up
                                </button>

                                <p className="text-sm text-center">
                                    Already have an account?{" "}
                                    <span
                                        className="text-blue-600 cursor-pointer"
                                        onClick={() => setsignedup(false)}
                                    >
        Login
      </span>
                                </p>

                            </form>
                        </div>

                        <div className="w-1/2 bg-blue-50 flex flex-col justify-center items-center p-8">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                Join Us
                            </h1>
                            <img
                                src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
                                className="w-60 mb-4"
                                alt="signup"
                            />
                            <p className="text-gray-600 text-center">
                                Create your account and start exploring.
                            </p>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}