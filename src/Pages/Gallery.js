import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Gallery = ({ contract }) => {
  const [l1Assets, setL1Assets] = useState([]);

  const loadL1 = async () => {
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
        <p>all the meme-ified goodness</p>
        <br />
        <div>
          <strong>l1</strong>
        </div>
        <div>kovan</div>
        <br />
        <ul>{l1Assets.length === 0 ? "loading..." : l1Assets}</ul>
      </header>
    </div>
  );
};

export default Gallery;
