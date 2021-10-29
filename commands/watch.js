import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { table } from "table";
import chalk from "chalk";
import blessed from "blessed";

export default (address, options) => {
  const web3 = createAlchemyWeb3(PROVIDER_URL);

  async function watch() {
    try {
      const data = await web3.alchemy.getAssetTransfers({
        fromAddress: address,
        fromBlock: 7777777,
        maxCount: 5
      });

      let headers = ['blocknum','hash','from','to','value','erc721token','asset','category','raw contract'];
      let transactionData = [];

      for (let i = 0; i < data.transfers.length; i++) {
        transactionData.push(data.transfers[i]);
      };
console.log(transactionData);
      for (let i = 0; i < transactionData.length; i++) {
        console.log(transactionData[i].blockNum + ' ' + transactionData[i].hash);
      };

      //return console.log(data);

      // // Create a screen object.
      // var screen = blessed.screen({
      //   smartCSR: true
      // });

      // screen.title = 'ethereum activity';

      // // Create a box perfectly centered horizontally and vertically.
      // var box = blessed.box({
      //   top: 'center',
      //   left: 'center',
      //   width: '100%',
      //   height: '100%',
      //   content: strData,
      //   }
      // );

      // // var table = blessed.table();
      // // table.setData([
      // //   [ 'Animals',  'Foods'  ],
      // //   [ 'Elephant', 'Apple'  ],
      // //   [ 'Bird',     'Orange' ]
      // // ]);

      // // Append our box to the screen.
      // screen.append(box);
      // // box.append(table);

      // // Quit on Escape, q, or Control-C.
      // screen.key(['escape', 'q', 'C-c'], function (ch, key) {
      //   return process.exit(0);
      // });

      // // Focus our element.
      // box.focus();

      // // Render the screen.
      // screen.render();

    } catch (error) {
      return console.log(error.name + ": " + error.message);
    }
  };
  watch();
};