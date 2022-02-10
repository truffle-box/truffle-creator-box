import "./App.css";

import AppPage from "./Pages/App";
import About from "./Pages/About";
import View from "./Pages/View";
import NotFound from "./Pages/NotFound";
import Navigation from "./Components/Navigation";
import { Routes, Route, Outlet} from "react-router-dom";
import Gallery from "./Pages/Gallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AppPage />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="about" element={<About />} />
        <Route path="/v/:id" element={<View />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
