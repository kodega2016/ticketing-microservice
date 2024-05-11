import useRequest from "../../hooks/use-request";
import Router from "next/router";
const { useState } = require("react");

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: { email, password },
    onSuccess: (res) => {
      Router.push("/");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doRequest();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Sign-in</h1>
      {errors && errors}
      <form onSubmit={handleSubmit}>
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
          Signin
        </button>
      </form>
    </div>
  );
};
export default Signin;
