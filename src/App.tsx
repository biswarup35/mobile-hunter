import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Article, About, Privacy } from "./pages";
import { Navbar, Footer } from "./views";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path=":slug" element={<Article />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Footer />
    </Fragment>
  );
};

export default App;
