import buildClient from "../api/build-client";

const Landing = ({ data }) => {
  console.log("data", data);
  return <div>this is landing page</div>;
};

Landing.getInitialProps = async (context) => {
  try {
    const client = buildClient(context);
    const { data } = await client.get("/api/users/currentuser");
    return data;
  } catch (e) {
    console.log(e.message);
    return {};
  }
};

export default Landing;
