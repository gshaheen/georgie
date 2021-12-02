#!/usr/bin/env node

import cli from "commander";
import chalk from "chalk";
import nconf from "nconf";
import config from "./commands/config.js";
import getBalance from "./commands/getBalance.js";
import gasPrice from "./commands/gasPrice.js";
import watch from "./commands/watch.js";

// global variables
// global.API_KEY = "t6xJw7aHQF5AymDZktnp1UdyZbUztX6A";
nconf.file({ file: './config.json' });
global.API_KEY = "";
global.PROVIDER_URL = nconf.get('PROVIDER_URL');
global.PROVIDER_MAINNET = "https://eth-mainnet.alchemyapi.io/v2/";
global.PROVIDER_GOERLI = "https://eth-goerli.alchemyapi.io/v2/";
global.PROVIDER_KOVAN = "https://eth-kovan.alchemyapi.io/v2/";
global.PROVIDER_RINKEBY = "https://eth-rinkeby.alchemyapi.io/v2/";
global.PROVIDER_ROPSTEN = "https://eth-ropsten.alchemyapi.io/v2/";

cli.description("query ethereum");
cli.name("georgie");
cli.usage("<command>");
cli.addHelpCommand(false);
cli.helpOption(false);

cli
  .command("config")
  .description(
    "Set new API endpoint."
  )
  .action(config);

cli
  .command("getBalance")
  .argument("[address]", "address of the balance you'd like to retrieve.")
  .description(
    "Retrieve the balance of an ethereum address."
  )
  .action(getBalance);

  cli
  .command("gasPrice")
  .description(
    "Retrieve the current gas price."
  )
  .action(gasPrice);

  cli
  .command("watch")
  .argument("[address]", "address you want to watch")
  .description(
    "Watch the transaction for an address, if no address, then default is latest block."
  )
  .action(watch);

if (!PROVIDER_URL) {
  console.log("");
  console.log(chalk.bgRed("Configuration not detected, starting config..."));  
  config();
  
} else {

  console.log(chalk.blueBright.bold("\nUSING: " + chalk.underline(PROVIDER_URL) + " | " + "CHANGE: georgie config\n"));

  cli.parse(process.argv);
}