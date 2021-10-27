import fs from "fs";
import nconf from "nconf";
import inquirer from "inquirer";
import chalk from "chalk";

export default (options) => {
  console.log(chalk.green("\nIf you don't already have an API key, get one here: https://alchemy.com/?r=3d90611b34ed2439\n"));

    inquirer.prompt([
        {
          name: 'network',
          message: 'What ethereum network do you want to use?',
          type: 'list',
          choices: ["MAINNET", "GOERLI", "KOVAN", "RINKEBY", "ROPSTEN"]
        },
        {
          type: 'input',
          name: 'api_key',
          message: "What's your API key?",
        }])
        .then(function (answer) {
          API_KEY = answer.api_key;
          switch (answer.network) {
            case "MAINNET":
              PROVIDER_URL = PROVIDER_MAINNET + API_KEY;
              break;
            case "GOERLI":
              PROVIDER_URL = PROVIDER_GOERLI + API_KEY;
              break;
            case "KOVAN":
              PROVIDER_URL = PROVIDER_KOVAN + API_KEY;
              break;
            case "RINKEBY":
              PROVIDER_URL = PROVIDER_RINKEBY + API_KEY;
              break;
            case "ROPSTEN":
              PROVIDER_URL = PROVIDER_ROPSTEN + API_KEY;
              break;
          };

          nconf.set('PROVIDER_URL', PROVIDER_URL.toString());
    
          nconf.save();
    
          console.log(chalk.green("UPDATED: " + PROVIDER_URL));

        });

};