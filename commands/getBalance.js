import Web3 from "web3";
import fetch from "node-fetch";

export default (address, options) => {
    //var Web3 = require('web3');
    var web3 = new Web3("https://eth-mainnet.alchemyapi.io/v2/t6xJw7aHQF5AymDZktnp1UdyZbUztX6A");

    async function getBalance () {
        const data = await web3.eth.getBalance(address);
        var strData = data.toString();
        var ether = web3.utils.fromWei(strData, 'ether');
        console.log(ether);

        if (options.pretty) {
          return console.log(data);
        }
    
        return console.log(JSON.stringify(data));
      };
    getBalance();
};