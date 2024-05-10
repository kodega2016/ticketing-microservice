import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email:", email, "password:", password);
    try {
      await axios.post("/api/users/signup", {
        email,
        password,
      });
      setErrors([]);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto">
        <h1>Signup page</h1>
        {errors && errors.length > 0 && (
          <div className="alert alert-danger">
            <ul className="my-0">
              {errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          Register
        </button>
      </div>
    </form>
  );
};

export default Signup;
