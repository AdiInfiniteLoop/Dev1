#!/usr/bin/env node
import { program } from "commander";
import { appendFile, readFile, writeFile } from "fs";

function deleteTodo(itemToDelete) {
  readFile("todo", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    let todos = data.split("\n");
    todos = todos.filter((item) => item.trim() !== itemToDelete);
    writeFile("todo", todos.join("\n"), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log(`Deleted todo: ${itemToDelete}`);
      }
    });
  });
}

program.name("todo-cli").description("CLI to CRUD Todos").version("0.8.0");

program.command("add <todo>").action((todo) => {
  const data = `${todo}\n`;
  appendFile("todo", data, (err) => {
    if (err) console.log(err.message);
    else {
      console.log("Added to todo");
    }
  });
});

program.command("delete <todo>").action((todo) => {
  deleteTodo(todo);
});

program.command("update <todo1> <todo2>").action((todo1, todo2) => {
  readFile("todo", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    let todos = data.split("\n");
    todos = todos.map((item) => (item.trim() === todo1 ? todo2 : item));
    writeFile("todo", todos.join("\n"), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log(`Updated todo: ${todo1} to ${todo2}`);
      }
    });
  });
});

program.parse(process.argv);
