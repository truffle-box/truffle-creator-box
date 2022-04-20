import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import remixr from '../contracts/Remixr.json';


const Gallery = ({ contract }) => {
  const [l1Assets, setL1Assets] = useState([]);

  const loadL1 = async () => {

    contract = remixr.networks[1650483476769].address;

    try {
      const totalSupplyNum = (await contract.totalSupply()).toNumber();

      [...Array(totalSupplyNum)].map(async (_, i) => {
        const id = i + 1;
        const item = await contract.tokenURI(id);

        const newItem = (
          <li key={i}>
            <Link to={`/v/${id}`}>{`${item} (${id})`}</Link>
          </li>
        );

        setL1Assets((prev) => {
          return [...prev, newItem];
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadL1();
  });

  return (
    <div className="App">
      <h2>Gallery</h2>
      <header className="App-header">
        <p>all the remixed goodness</p>
        <br />
        <ul>{l1Assets.length === 0 ? "loading..." : l1Assets}</ul>
      </header>
    </div>
  );
};

export default Gallery;
