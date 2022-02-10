import "./App.css";

import AppPage from "./Pages/App";
import About from "./Pages/About";
import View from "./Pages/View";
import NotFound from "./Pages/NotFound";
import Navigation from "./Components/Navigation";
import { Routes, Route, Outlet} from "react-router-dom";
import Gallery from "./Pages/Gallery";

import { Provider, chain, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
// import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

// API key for Ethereum node via infura
const infuraId = process.env.INFURA_ID

// Chains for connectors to support
const chains = defaultChains

// Set up connectors
const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0]
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    // new WalletConnectConnector({
    //   options: {
    //     infuraId,
    //     qrcode: true,
    //   },
    // }),
    // new WalletLinkConnector({
    //   options: {
    //     appName: 'My wagmi app',
    //     jsonRpcUrl: `${rpcUrl}/${infuraId}`,
    //   },
    // }),
  ]
}


function App() {
  return (
    <Provider autoConnect connectors={connectors}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AppPage />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="about" element={<About />} />
        <Route path="/v/:id" element={<View />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </Provider>
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
