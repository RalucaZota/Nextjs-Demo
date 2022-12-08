import "../styles/globals.css";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
//acts as a route component that next js will render/ it receives props and uses obj destructuring to pull info out of the props
//these props are passed in MyApp component automatically by the next js, since thenext js is the thing using that specific component
//component is a prop that holds the actual page content that should be rendered, so it will e diff whenever we switch a page and page props are specific props our pages in might be getting
//component will be the actual page content of our diff pages
