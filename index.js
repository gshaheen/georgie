#!/usr/bin/env node

import cli from "commander";
import posts from "./commands/posts.js";
import comments from "./commands/comments.js";
import users from "./commands/users.js";

cli.description("Access the JSON Placeholder API");
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

cli.parse(process.argv);