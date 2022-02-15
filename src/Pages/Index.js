import React, {useEffect, useRef, useState} from "react";

import {useAccount} from "wagmi";

import axios from "axios";
import styled from "styled-components";
import {SketchField, Tools} from "react-sketch";
import {ethers} from "ethers";

import cartooneyes from "../Assets/cartooneyes.png";
import lasereyes from "../Assets/lasereyes.png";
import shades from "../Assets/shades.png";
// import rainbow from "../Assets/rainbow.png";
import troll from "../Assets/troll.png";

import sample1 from "../Assets/truffle-1.png";
import sample2 from "../Assets/truffle-2.png";
import sample3 from "../Assets/truffle-3.png";
import sample4 from "../Assets/truffle-4.png";
import sample5 from "../Assets/truffle-5.png";

const fabric = require("fabric").fabric;

const IPFS = require("ipfs-mini");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
const ipfsClient = require("ipfs-http-client");

const StyledSketchField = styled(SketchField)`
  margin-top: 1rem;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  background-color: #e8e8e8;
`;

const StyledTextBox = styled.input`
  width: 100%;
  font-size: 1.6rem;
  border: solid 1px #c1b6b6;
  border-radius: 1rem;
  padding: 0.4rem 0.8rem;
  margin-bottom: 0.2rem;
  font-family: "courier";
`;

const StyledButton = styled.button`
  cursor: pointer;
  margin: 0.6rem 0.4rem;
  border-radius: 1rem;
  border: 0;
  padding: 0.6rem 1.4rem;
  font-size: 2rem;
  font-family: "courier";
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);

  :hover {
    background-color: orange;
    color: white;
  }
`;

const MemeButton = styled.button`
  cursor: pointer;
  margin: 1rem 0.1rem 1rem 0.1rem;
  border: 0;
  border-radius: 0.4rem;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  font-family: "courier";
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);

  :hover {
    background-color: orange;
    color: white;
  }
`;

const ThumbImg = styled.img`
  border-radius: 1rem;
  width: 6rem;
  padding: 0.2rem;
  cursor: pointer;
`;

// let l1Provider, l1Signer, arbitrumProvider;
// let walletDetected = !!window.ethereum;

// try {
//   if (window.ethereum) {
//     window.ethereum
//       .enable()
//       .then((l1Provider = new ethers.providers.Web3Provider(window.ethereum)));
//     l1Signer = l1Provider.getSigner();
//   } else {
//     l1Provider = ethers.getDefaultProvider("kovan");
//   }

//   arbitrumProvider = new ethers.providers.JsonRpcProvider(
//     `https://kovan4.arbitrum.io/rpc`
//   );
// } catch (err) {
//   console.log(err);
// }

const abi = [
  "function totalSupply() view returns (uint)",
  "function tokenByIndex(uint) view returns (uint)",
  "function tokenURI(uint) view returns (string)",
  "function mint(address, string) returns (uint)",
];

// function App() {
//   const [imageCID, setImageCID] = useState("");
//   const [metadataCID, setMetadataCID] = useState("");
//   const [importAddress, setImportAddress] = useState(
//     "0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405"
//   );
//   const [importId, setImportId] = useState(Math.floor(Math.random() * 24437)); // 24437, 12345, 11155, 1265, 175, 17367, 17618, 10798 :)))
//   const [tool, setTool] = useState(Tools.Select);
//   const [mintStatus, setMintStatus] = useState(false);

//   const [mintModal, setMintModal] = useState(false);
//   const [loadModal, setLoadModal] = useState(false);
//   const [saveModal, setSaveModal] = useState(false);
//   const [accountDialog, showAccountDialog] = useState(false);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isValidL1, setIsValidL1] = useState();

//   console.log(l1Signer || l1Provider);
//   const contract = new ethers.Contract(
//     "0xEb56A7AE1557117Acd1bBeA07D2053035f352b7b",
//     abi,
//     l1Signer || l1Provider
//   );
//   // const contractArbitrum = new ethers.Contract("0xe41eE07A9F41CD1Ab4e7F25A93321ba1Dc0Ec5b0", abi, arbitrumProvider);

//   const infuraProvider = new ethers.providers.InfuraProvider();

//   const checkNetworks = async () => {
//     if (l1Provider) {
//       const network = await l1Provider.getNetwork();
//       if ([42, 1337, 344435, 801984078892471].includes(network.chainId)) {
//         setIsValidL1(true);
//       }
//     } else {
//       setIsValidL1(false);
//     }
//   };

//   const _sketch = useRef();

//   const shadify = () => {
//     _sketch.current.addImg(shades);
//   };

//   const eyes = () => {
//     _sketch.current.addImg(cartooneyes);
//   };

//   const laserify = () => {
//     _sketch.current.addImg(lasereyes);
//   };

//   const trollify = () => {
//     _sketch.current.addImg(troll);
//   };

//   const select = () => {
//     setTool(Tools.Select);
//   };

//   const pen = () => {
//     setTool(Tools.Pencil);
//   };

//   const text = async () => {
//     _sketch.current.addText("TRUFFLES!", {
//       fontFamily: "Impact",
//       fill: "#fff",
//       stroke: "#000",
//       strokeWidth: "1",
//     });
//     setTool(Tools.Select);
//   };

//   const remove = async () => {
//     _sketch.current.removeSelected();
//   };

//   const toggleLoadModal = () => {
//     if (loadModal) {
//       setLoadModal(false);
//     } else {
//       setLoadModal(true);
//     }
//   };

//   const sanitize = (url) => {
//     // hacks all the way down
//     const x = url.replace("ipfs/", "").replace("ipfs://", "");
//     const cidV0 = x.split("/")[0];
//     const cidV1 = new ipfsClient.CID(cidV0).toV1();
//     const sanitized = `https://${cidV1}.ipfs.dweb.link/${x.split("/")[1]}`;
//     return sanitized;
//   };

//   const loadImage = async (url) => {
//     if (url.indexOf("mp4") > -1) {
//       alert("unable to load videos");
//       setLoadModal(true);
//       return;
//     }

//     const response = await axios.get(url, { responseType: "blob" });
//     const reader = new FileReader();
//     reader.readAsDataURL(response.data);
//     reader.onload = async () => {
//       fabric.Image.fromURL(reader.result, function (oImg) {
//         oImg.scaleToWidth(640);
//         _sketch.current.setBackgroundFromDataUrl(oImg.toDataURL(), {
//           stretched: true,
//           originX: "left",
//           originY: "top",
//         });
//       });
//     };
//   };

//   const loadExistingNFT = async () => {
//     const contract = new ethers.Contract(importAddress, abi, infuraProvider);
//     const metadataUri = await contract.tokenURI(importId);
//     const metadataRes = await fetch(metadataUri);
//     const metadata = await metadataRes.json();
//     const santizedMetadataUri = sanitize(metadata.image);

//     console.log(santizedMetadataUri);
//     loadImage(santizedMetadataUri);
//     setLoadModal(false);
//   };

//   const load = async (url) => {
//     loadImage(url);
//     setLoadModal(false);
//   };

//   const toggleSaveModal = () => {
//     if (saveModal) {
//       setSaveModal(false);
//     } else {
//       setSaveModal(true);
//     }
//   };

//   const save = async () => {
//     toggleSaveModal();
//   };

//   const actuallySave = async () => {
//     const reader = new FileReader();
//     reader.onloadend = async function () {
//       const fileContents = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><image width="100%" height="100%" href="${reader.result}" /></svg>`;
//       const ipfsImg = await ipfs.add(fileContents);
//       setImageCID(ipfsImg);

//       // TODO - load the title / description from fields (prepopulate from what's loaded)
//       const metadata = `{ "name":"${title}", "description":"${description}","image":"ipfs://${ipfsImg}" }`;

//       const ipfsMetadata = await ipfs.add(metadata);
//       setMetadataCID(ipfsMetadata);
//     };
//     const canvas = _sketch.current.toDataURL();
//     const blob = await (await fetch(canvas)).blob();
//     reader.readAsDataURL(blob);
//   };

//   const mintNFT = async () => {
//     setMintStatus("minting...");
//     const address = await l1Signer.getAddress();
//     const tx = await contract.mint(address, metadataCID);
//     setMintStatus("transaction sent!");
//     await tx.wait();
//     setMintStatus("minted! head to the gallery to check it out");
//   };

//   const mint = () => {
//     if (mintModal) {
//       setMintModal(false);
//     } else {
//       setMintModal(true);
//     }
//   };

//   const storageDeal = async () => {
//     const metadataDeal = {
//       jsonrpc: "2.0",
//       id: 0,
//       method: "Filecoin.ClientStartDeal",
//       params: [
//         {
//           Data: {
//             TransferType: "graphsync",
//             Root: { "/": metadataCID },
//             PieceCid: null,
//             PieceSize: 0,
//           },
//           Wallet:
//             "t3r3yrbujjmmjdixnnaab35ioi7ntpnlrt4bmsrtw4j5d6kjb2eeyu7axr2zv2g5m5emby6mzn6rvqjwzbfrya",
//           Miner: "t01000",
//           EpochPrice: 2500,
//           MinBlocksDuration: 300,
//         },
//       ],
//     };
//     const res = await axios.post("http://localhost:7777/rpc/v0", metadataDeal);
//     console.log(res);
//   };

//   // const switchToSKALE = async () => {
//   //   let params = {
//   //     chainId: "0x54173", //decodes to 344435
//   //     chainName: "SKALE Network Testnet",
//   //     rpcUrls: ["https://dev-testnet-v1-0.skalelabs.com"],
//   //     nativeCurrency: {
//   //       name: "SKALE ETH",
//   //       symbol: "skETH",
//   //       decimals: 18
//   //     },
//   //     blockExplorerUrls: [
//   //       "https://expedition.dev/?rpcUrl=https://dev-testnet-v1-0.skalelabs.com"
//   //     ]
//   //   };

//   //   const address = await l1Signer.getAddress();

//   //   //request change to SKALE Network
//   //   window.ethereum
//   //     .request({
//   //       method: "wallet_addEthereumChain",
//   //       params: [params, address]
//   //     })
//   //     .catch((error) => console.log(error.message));
//   // }

//   const randomize = () => {
//     setImportId(Math.floor(Math.random() * 24437));
//   };

//   // const mintToSKALE = async () => {
//   //   debugger;
//   //   setMintStatus('minting...')
//   //   const address = await l1Signer.getAddress();
//   //   const tx = await contract.mint(address, metadataCID);
//   //   setMintStatus('transaction sent!');
//   //   await tx.wait();
//   //   setMintStatus('minted! head to the gallery to check it out');
//   // }

//   // const mintToArb = async () => {
//   //   setMintModal(false);
//   //   showAccountDialog(true);
//   // }

//   useEffect(() => {
//     checkNetworks();
//   }, []);

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * @param min {number}
 * @param max {number}
 * @return {number} in range of min/max
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BAYC_ADDRESS = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
const AZUKI_ADDRESS = "0xED5AF388653567Af2F388E6224dC7C4b3241C544";
const DOODLES_ADDRESS = "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e";
const CC_ADDRESS = "0x1981CC36b59cffdd24B01CC5d698daa75e367e04";

export default function Index() {
  const [{data: accountData}] = useAccount({
    fetchEns: true,
  });

  const [imageCID, setImageCID] = useState("");
  const [metadataCID, setMetadataCID] = useState("");

  const [mintStatus, setMintStatus] = useState(false);
  const [isValidL1, setIsValidL1] = useState();
  const [mintModal, setMintModal] = useState(false);
  const [loadModal, setLoadModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);

  const [tool, setTool] = useState(Tools.Select);
  const [importAddress, setImportAddress] = useState("0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405");
  const [importId, setImportId] = useState(getRandomInt(0, 10000)); // set to some kind of usable base.

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const _sketch = useRef();
  const infuraProvider = new ethers.providers.InfuraProvider();

  //   console.log(l1Signer || l1Provider);
  //   const contract = new ethers.Contract(
  //     "0xEb56A7AE1557117Acd1bBeA07D2053035f352b7b",
  //     abi,
  //     l1Signer || l1Provider
  //   );

  const shadify = () => {
    _sketch.current.addImg(shades);
  };

  const eyes = () => {
    _sketch.current.addImg(cartooneyes);
  };

  const laserify = () => {
    _sketch.current.addImg(lasereyes);
  };

  const trollify = () => {
    _sketch.current.addImg(troll);
  };

  const select = () => {
    setTool(Tools.Select);
  };

  const pen = () => {
    setTool(Tools.Pencil);
  };

  const text = async () => {
    _sketch.current.addText("TRUFFLES!", {
      fontFamily: "Impact",
      fill: "#fff",
      stroke: "#000",
      strokeWidth: "1",
    });
    setTool(Tools.Select);
  };

  const remove = async () => {
    _sketch.current.removeSelected();
  };

  const toggleLoadModal = () => {
    if (loadModal) {
      setLoadModal(false);
    } else {
      setLoadModal(true);
    }
  };

  const randomize = () => {
    setImportId(getRandomInt(1, 10000));
  };

  const loadImage = async (url) => {
    if (url.indexOf("mp4") > -1) {
      alert("unable to load videos");
      setLoadModal(true);
      return;
    }

    const response = await axios.get(url, {responseType: "blob"});
    const reader = new FileReader();
    reader.readAsDataURL(response.data);
    reader.onload = async () => {
      fabric.Image.fromURL(reader.result, function(oImg) {
        oImg.scaleToWidth(640);
        _sketch.current.setBackgroundFromDataUrl(oImg.toDataURL(), {
          stretched: true,
          originX: "left",
          originY: "top",
        });
      });
    };
  };

  const loadExistingNFT = async () => {
    const contract = new ethers.Contract(importAddress, abi, infuraProvider);
    const metadataUri = await contract.tokenURI(importId);
    const sanitisedUri = processUri(metadataUri);
    const metadataRes = await fetch(sanitisedUri);
    const metadata = await metadataRes.json();
    const sanitizedMetadataUri = processUri(metadata.image);
    await loadImage(sanitizedMetadataUri);
    setLoadModal(false);
  };

  const load = async (url) => {
    await loadImage(url);
    setLoadModal(false);
  };

  const toggleSaveModal = () => {
    if (saveModal) {
      setSaveModal(false);
    } else {
      setSaveModal(true);
    }
  };

  const mint = () => {
    if (mintModal) {
      setMintModal(false);
    } else {
      setMintModal(true);
    }
  };

  const storageDeal = async () => {
    const metadataDeal = {
      jsonrpc: "2.0",
      id: 0,
      method: "Filecoin.ClientStartDeal",
      params: [
        {
          Data: {
            TransferType: "graphsync",
            Root: {"/": metadataCID},
            PieceCid: null,
            PieceSize: 0,
          },
          Wallet:
              "t3r3yrbujjmmjdixnnaab35ioi7ntpnlrt4bmsrtw4j5d6kjb2eeyu7axr2zv2g5m5emby6mzn6rvqjwzbfrya",
          Miner: "t01000",
          EpochPrice: 2500,
          MinBlocksDuration: 300,
        },
      ],
    };
    const res = await axios.post("http://localhost:7777/rpc/v0", metadataDeal);
    console.log(res);
  };

  const save = async () => {
    toggleSaveModal();
  };

  const actuallySave = async () => {
    const reader = new FileReader();
    reader.onloadend = async function() {
      const fileContents = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><image width="100%" height="100%" href="${reader.result}" /></svg>`;
      const ipfsImg = await ipfs.add(fileContents);
      setImageCID(ipfsImg);

      // TODO - load the title / description from fields (prepopulate from what's loaded)
      const metadata = `{ "name":"${title}", "description":"${description}","image":"ipfs://${ipfsImg}" }`;

      const ipfsMetadata = await ipfs.add(metadata);
      setMetadataCID(ipfsMetadata);
    };
    const canvas = _sketch.current.toDataURL();
    const blob = await (await fetch(canvas)).blob();
    reader.readAsDataURL(blob);
  };

  const sanitize = (url) => {
    // hacks all the way down
    const x = url.replace("ipfs/", "").replace("ipfs://", "");
    const cidV0 = x.split("/")[0];
    const cidV1 = new ipfsClient.CID(cidV0).toV1();
    return `https://${cidV1}.ipfs.dweb.link/${x.split("/")[1]}`;
  };

  /**
   * Fixes the prefix to be HTTP compliant for our axios code to grab.
   *
   * @param metadataUri {string}
   * @returns {string} with a fixed ipfs.io proxy added or the url if it's not an ipfs:// prefix.
   */
  function processUri(metadataUri) {
    if (metadataUri.indexOf("ipfs://") === 0) {
      // https://ipfs.io/ipfs/QmZHKZDavkvNfA9gSAg7HALv8jF7BJaKjUc9U2LSuvUySB/9317.json
      return metadataUri.replace("ipfs://", "https://ipfs.io/ipfs/")
    }
    return metadataUri;
  }

  useEffect(() => {
    async function checkNetwork() {
      if (accountData) {
        const chainId = await accountData.connector.getChainId();
        if ([42, 1337, 344435, 801984078892471].includes(chainId)) {
          setIsValidL1(true);
        }
      } else {
        setIsValidL1(false);
      }
    }

    checkNetwork();
  }, [accountData]);

  return (
      <div className="Content">
        {!isValidL1 ? (
            <div>
              unable to detect valid network. please connect to the kovan l1 testnet
            </div>
        ) : (
            <></>
        )}

        <header className="App-header">
          <div>
            <StyledButton onClick={() => toggleLoadModal()}>load</StyledButton>
            <span>&gt;</span>
            <StyledButton onClick={() => save()}>save</StyledButton>
            <span>&gt;</span>
            <StyledButton onClick={() => mint()}>mint</StyledButton>
          </div>
          <div>
            <MemeButton onClick={() => eyes()}>eyes</MemeButton>
            <MemeButton onClick={() => laserify()}>lasers</MemeButton>
            <MemeButton onClick={() => trollify()}>troll</MemeButton>
            <MemeButton onClick={() => shadify()}>shades</MemeButton>
            <MemeButton onClick={() => text()}>text</MemeButton>
            &nbsp;&nbsp;
            <MemeButton onClick={() => select()}>select</MemeButton>
            <MemeButton onClick={() => pen()}>pen</MemeButton>
            <MemeButton onClick={() => remove()}>remove</MemeButton>
          </div>
          <StyledSketchField
              width="640px"
              height="640px"
              tool={tool}
              lineColor="black"
              lineWidth={3}
              ref={(c) => {
                _sketch.current = c;
              }}
              name="sketch"
          />
        </header>

        <div className={`modal ${loadModal ? "is-active" : ""}`}>
          <div className="modal-background"/>
          <div className="modal-content">
            <header className="modal-card-head">
              <p className="modal-card-title">load</p>
              <button
                  className="delete"
                  aria-label="close"
                  onClick={() => toggleLoadModal()}
              />
            </header>
            <section className="modal-card-body">
              <h2>select your truffle...</h2>
              <ThumbImg src={sample1} onClick={() => load(sample1)}/>
              <ThumbImg src={sample2} onClick={() => load(sample2)}/>
              <ThumbImg src={sample3} onClick={() => load(sample3)}/>
              <ThumbImg src={sample4} onClick={() => load(sample4)}/>
              <ThumbImg src={sample5} onClick={() => load(sample5)}/>
              <hr/>
              <h2>load from an existing NFT, e.g.</h2>
              <button onClick={() => setImportAddress(BAYC_ADDRESS)}>BAYC</button>
              <button onClick={() => setImportAddress(AZUKI_ADDRESS)}>AZUKI</button>
              <button onClick={() => setImportAddress(DOODLES_ADDRESS)}>Doodles</button>
              <button onClick={() => setImportAddress(CC_ADDRESS)}>Crypto Chicks</button>
              <StyledTextBox
                  value={importAddress}
                  placeholder={`contract address`}
                  onChange={(e) => setImportAddress(e.currentTarget.value)}
              />
              <br/>
              <StyledTextBox
                  value={importId}
                  placeholder={`id`}
                  onChange={(e) => setImportId(e.currentTarget.value)}
              />
              <br/>
              <div>
                <MemeButton onClick={() => randomize()}>randomize</MemeButton>
                &nbsp;
                <MemeButton onClick={() => loadExistingNFT()}>
                  load from contract
                </MemeButton>
              </div>
            </section>
            <footer className="modal-card-foot"/>
          </div>
        </div>

        <div className={`modal ${saveModal ? "is-active" : ""}`}>
          <div className="modal-background"/>
          <div className="modal-content">
            <header className="modal-card-head">
              <p className="modal-card-title">save</p>
              <button
                  className="delete"
                  aria-label="close"
                  onClick={() => toggleSaveModal()}
              />
            </header>
            <section className="modal-card-body">
              <StyledTextBox
                  value={title}
                  placeholder={`nft name`}
                  onChange={(e) => setTitle(e.currentTarget.value)}
              />
              <br/>
              <StyledTextBox
                  value={description}
                  placeholder={`nft description`}
                  onChange={(e) => setDescription(e.currentTarget.value)}
              />
              <br/>
              <MemeButton onClick={() => actuallySave()}>
                save to ipfs
              </MemeButton>
              <hr/>
              <p>
                Image CID:{" "}
                <a
                    href={`ipfs://${imageCID}`}
                    target="_blank"
                >{`ipfs://${imageCID}`}</a>
              </p>
              <p>
                Metadata CID:{" "}
                <a
                    href={`ipfs://${metadataCID}`}
                    target="_blank"
                >{`ipfs://${metadataCID}`}</a>
              </p>
              <p>{metadataCID ? `done! you're now ready to mint!` : ``}</p>
              <hr/>
              <p>
                once your assets have been saved, it's highly recommended to
                preserve with a storage deal or pinning service
              </p>
              <MemeButton onClick={() => storageDeal()}>
                preserve with filecoin
              </MemeButton>
              &nbsp;
              <MemeButton>
                <a
                    href="http://pinata.cloud/"
                    target="_blank"
                    style={{color: "#000"}} rel="noreferrer"
                >
                  preserve with pinata
                </a>
              </MemeButton>
              <p>
                note that a filecoin requires a locally running lotus node
              </p>
            </section>
            <footer className="modal-card-foot"/>
          </div>
        </div>
        {/*
         <div className={`modal ${mintModal ? "is-active" : ""}`}>
         <div className="modal-background"></div>
         <div className="modal-content">
         <header className="modal-card-head">
         <p className="modal-card-title">mint</p>
         <button
         className="delete"
         aria-label="close"
         onClick={() => mint()}
         ></button>
         </header>
         <section className="modal-card-body">
         <p>
         <strong>layer 1</strong>
         </p>
         <p>mint to layer 1 (more expensive / immediately usable)</p>
         <MemeButton onClick={() => mintNFT()}>mint to L1</MemeButton>
         <p>{mintStatus}</p>
         </section>
         <footer className="modal-card-foot"></footer>
         </div>
         </div>
         */}
      </div>
  );
}
