#!/usr/bin/env node
const { program } = require("commander");
const fs = require("fs");

program.description("CLI to count words in a document").version("0.8.0");

program
  .command("count <file>")
  .description("Count words in the specified file")
  .action((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) console.log(err.message);
      else {
        const lines = data.split("\n").length;
        const words = data.split(/\s+/).filter(Boolean).length;
        console.log(`There are ${words} words in the file\n`);
      }
    });
  });

program.parse(process.argv); //Always at the last
