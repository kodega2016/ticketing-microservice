import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { email, password },
    onSuccess: (res) => {
      console.log("res:", res);
      Router.push("/");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doRequest();
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto">
        <h1>Signup page</h1>
        {errors && errors}
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
