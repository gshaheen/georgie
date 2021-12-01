import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { table } from "table";
import chalk from "chalk";

export default (address, options) => {
  const web3 = createAlchemyWeb3(PROVIDER_URL);

  async function watch() {
    try {

      const data = await web3.alchemy.getAssetTransfers({
        fromAddress: address
      });

      let transactionData = [];
      const txArray = [];

      const config = {
        border: {
          topBody: `─`,
          topJoin: `┬`,
          topLeft: `┌`,
          topRight: `┐`,
      
          bottomBody: `─`,
          bottomJoin: `┴`,
          bottomLeft: `└`,
          bottomRight: `┘`,
      
          bodyLeft: `│`,
          bodyRight: `│`,
          bodyJoin: `│`,
      
          joinBody: `─`,
          joinLeft: `├`,
          joinRight: `┤`,
          joinJoin: `┼`
        }
      };

      for (let i = 0; i < data.transfers.length; i++) {
        transactionData.push(data.transfers[i]);
      };

      for (let i = 0; i < transactionData.length; i++) {
        let tempArray = ['block: ' + web3.utils.hexToNumberString(transactionData[i].blockNum),
                      'from: ' + transactionData[i].from,
                      'to: ' + transactionData[i].to,
                      'value: ' + transactionData[i].value,
                      'erc721token: ' + web3.utils.hexToNumberString(transactionData[i].erc721TokenId),
                      'asset: ' + transactionData[i].asset,
                      'category: ' + transactionData[i].category];
        txArray.push(tempArray);
      };
      
      console.log(table(txArray, config));
     

    } catch (error) {
      return console.log(error.name + ": " + error.message);
    }
  };
  setInterval(watch, 15000);
};