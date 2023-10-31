import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { PageRoute, PageRoutes } from "./routes/Routes";
type Props = {};

const App = (props: Props) => {
  return (
    <Layout>
      <Routes>
        {PageRoutes.map((route: PageRoute) => {
          return <Route key={route.path} path={route.path} element={route.component} />;
        })}
      </Routes>
    </Layout>
  );
};

export default App;
