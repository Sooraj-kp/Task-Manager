import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );

            console.log("Login response:", response.data);

            // Save JWT token
            localStorage.setItem("token", response.data.token);

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            // Go to dashboard
            navigate("/dashboard", { replace: true });

        } catch (error) {
            console.error("Login error:", error);

            setMessage(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="text-center">
            <h1>Task Manager</h1>
            <h2>Login</h2>

            {message && (
                <div className="message-alert">{message}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit">
                    Login
                </button>
            </form>

            <p>
                Don't have an account?{" "}
                <Link to="/register">
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default Login;