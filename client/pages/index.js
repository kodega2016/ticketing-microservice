import buildClient from "../api/build-client";

const Landing = ({ data }) => {
  return data ? (
    <h1>You are signed in</h1>
  ) : (
    <div>
      <h1>You are not signed in</h1>;<a href="/auth/signin">Sign in</a>
    </div>
  );
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
