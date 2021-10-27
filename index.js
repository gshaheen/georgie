#!/usr/bin/env node

import cli from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import nconf from "nconf";
import posts from "./commands/posts.js";
import comments from "./commands/comments.js";
import users from "./commands/users.js";
import config from "./commands/config.js";
import getBalance from "./commands/getBalance.js";

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
  .command("posts")
  .argument("[postId]", "ID of post you'd like to retrieve.")
  .option("-p, --pretty", "Pretty-print output from the API.")
  .description(
    "Retrieve a list of all posts or one post by passing the post ID (e.g., posts 1)."
  )
  .action(posts);

cli
  .command("comments")
  .option("-p, --pretty", "Pretty-print output from the API.")
  .description("Retrieve a list of all comments.")
  .action(comments);

cli
  .command("users")
  .argument("[userId]", "ID of the user you'd like to retrieve.")
  .option("-p, --pretty", "Pretty-print output from the API.")
  .description(
    "Retrieve a list of all users or one user by passing the user ID (e.g., users 1)."
  )
  .action(users);

cli
  .command("config")
  .description(
    "Set new API endpoint."
  )
  .action(config);

cli
  .command("getBalance")
  .argument("[address]", "address of the balance you'd like to retrieve.")
  .option("-p, --pretty", "Pretty-print output from the API.")
  .description(
    "Retrieve the balance of an ethereum address."
  )
  .action(getBalance);



if (!PROVIDER_URL) {
  console.log("If you don't already have an API key, get one here: https://alchemy.com/?r=3d90611b34ed2439");
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
      console.log(PROVIDER_URL);
      nconf.set('PROVIDER_URL', PROVIDER_URL.toString());
      console.log(chalk.blue(nconf.get('PROVIDER_URL')));

      nconf.save();

      console.log(chalk.red("USING: " + PROVIDER_URL));

      cli.parse(process.argv);
    });
} else {
  console.log(chalk.blue.bold.bgWhite("   USING: " + chalk.underline(PROVIDER_URL) + " | " + "CHANGE: georgie config   "));

  cli.parse(process.argv);
}