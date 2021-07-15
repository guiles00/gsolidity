const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "size mistake word angry choose twice story someone divorce quick weather depth",
  "https://rinkeby.infura.io/v3/f68b569cbf5f4e989d5a9e926e1e20d0"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);
  //console.log(compiledFactory);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  //console.log(result.options);
  console.log("Contract deployed to", result.options.address);
};
deploy();
//0xa518D13c1eCee668e7889b0152faF378Ebe23B45