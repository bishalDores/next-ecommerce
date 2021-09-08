import { useEffect } from "react";
import { wrapper } from "../redux/store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
