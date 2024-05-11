import "bootstrap/dist/css/bootstrap.min.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, data }) => {
  return (
    <div className="container">
      <Header currentUser={data} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  try {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get("/api/users/currentuser");
    let pageProps = {};

    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {
      pageProps,
      ...data,
    };
  } catch (error) {
    console.log(error.message);
    return {};
  }
};

export default AppComponent;
