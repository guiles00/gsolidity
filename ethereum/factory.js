import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xa518D13c1eCee668e7889b0152faF378Ebe23B45"
);

export default instance;