import "./App.css";

import Index from "./Pages/Index";
import About from "./Pages/About";
import View from "./Pages/View";
import NotFound from "./Pages/NotFound";
import Navigation from "./Components/Navigation";
import {Routes, Route, Outlet} from "react-router-dom";
import Gallery from "./Pages/Gallery";

import {Provider, defaultChains} from "wagmi"
import {InjectedConnector} from "wagmi/connectors/injected"

// Chains for connectors to support
const chains = defaultChains

// Set up connectors
const connectors = ({_chainId}) => {
  return [
    new InjectedConnector({
      chains,
      options: {shimDisconnect: true},
    }),
  ]
}

function App() {
  return (
      <Provider autoConnect connectors={connectors}>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Index/>}/>
            <Route path="gallery" element={<Gallery/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="/v/:id" element={<View/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </Provider>
  );
}

function Layout() {
  return (
      <div className="App">
        <Navigation/>
        <main>
          <Outlet/>
        </main>
      </div>
  );
}

export default App;
