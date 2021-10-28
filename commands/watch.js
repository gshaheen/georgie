import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { table } from "table";
import chalk from "chalk";
import blessed from "blessed";

export default (address, options) => {
  const web3 = createAlchemyWeb3(PROVIDER_URL);

  async function watch () {
      try { 
        const data = await web3.alchemy.getAssetTransfers({
          fromAddress:address,
          fromBlock:7777777
        });
        
        var strData = JSON.stringify(data);

        return console.log(data);

      } catch (error) { 
        return console.log(error.name + ": " + error.message);
      }
    };
  watch();
};