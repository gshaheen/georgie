import { createAlchemyWeb3 } from "@alch/alchemy-web3";

export default (address, options) => {
  const web3 = createAlchemyWeb3(PROVIDER_URL);
  //console.log(PROVIDER_URL);

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