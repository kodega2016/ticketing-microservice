const Landing = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <div>
      <h1>You are not signed in</h1>
      <a href="/auth/signin">Sign in</a>
    </div>
  );
};

Landing.getInitialProps = async () => {
  return {};
};

export default Landing;
