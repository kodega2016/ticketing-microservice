import { useState } from "react";
import axios from "axios";
import useRequest from "../../hooks/use-request";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { email, password },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await doRequest();
    console.log("response:", response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto">
        <h1>Signup page</h1>
        {/* {errors && errors.length > 0 && ( */}
        {/*   <div className="alert alert-danger"> */}
        {/*     <ul className="my-0"> */}
        {/*       {errors.map((err) => ( */}
        {/*         <li key={err.message}>{err.message}</li> */}
        {/*       ))} */}
        {/*     </ul> */}
        {/*   </div> */}
        {/* )} */}
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
