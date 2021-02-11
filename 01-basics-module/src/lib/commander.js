import commander from "commander";
const { Command } = commander;
const program = new Command();

program
  .version("0.0.1")
  .option("-l, --list", "Get contacts")
  .option("-g, --get <id>", "Get contact")
  .option("-d, --delete <id>", "Delete input folder")
  .option("-a, --add", "Add contact")
  .option("-n, --name <Name>", "new user name")
  .option("-m, --email <Email>", "new user name")
  .option("-p, --phone <Phone>", "new user name");

export default program;
