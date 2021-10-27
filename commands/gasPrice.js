import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { table } from "table";
import chalk from "chalk";

export default (options) => {
  const web3 = createAlchemyWeb3(PROVIDER_URL);

  async function gasPrice () {
      try { 
        const data = await web3.eth.getGasPrice();
        
        var strData = data.toString();
        var ether = web3.utils.fromWei(strData, 'ether');
        
        const dataArray = [
          [chalk.bold.blue('WEI'), strData],
          [chalk.bold.blue('ETHER'), ether]
        ];

        return console.log(table(dataArray));

      } catch (error) { 
        return console.log(error.name + ": " + error.message);
      }
    };
  gasPrice();
};