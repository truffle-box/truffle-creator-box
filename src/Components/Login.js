import React from "react";
import { useConnect, useAccount } from "wagmi";

export default function Login() {
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  if (accountData) {
    return (
      <div>
        {/* <img src={accountData.ens?.avatar} alt="ENS Avatar" /> */}
        <div>
          {accountData.ens?.name
            ? `${accountData.ens?.name} (${accountData.address})`
            : accountData.address} &nbsp;
        {/* <div>Connected to {accountData.connector.name}</div> */}
        <button onClick={disconnect}>Disconnect</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {connectData.connectors.map((x) => (
          <button disabled={!x.ready} key={x.id} onClick={() => connect(x)}>
            {x.name}
            {!x.ready && " (unsupported)"}
          </button>
        ))}
        {connectError && (
          <div>{connectError?.message ?? "Failed to connect"}</div>
        )}
      </div>
    );
  }

}
