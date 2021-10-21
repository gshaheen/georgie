import { createAlchemyWeb3 } from "@alch/alchemy-web3";

export default (address, options) => {
  //add check & prompt for API key, add prompt for network
  //const PROVIDER_URL = "https://eth-mainnet.alchemyapi.io/v2/t6xJw7aHQF5AymDZktnp1UdyZbUztX6A";
  const web3 = createAlchemyWeb3(PROVIDER_URL);
  console.log(PROVIDER_URL);

  async function getBalance () {
      try { 
        const data = await web3.eth.getBalance(address);
        
        var strData = data.toString();
        var ether = web3.utils.fromWei(strData, 'ether');
        console.log(ether);

        if (options.pretty) {
          return console.log(data);
        }
    
        return console.log(JSON.stringify(data));
      } catch (error) { 
        return console.log(error.name + ": " + error.message);
      }
    };
  getBalance();
};