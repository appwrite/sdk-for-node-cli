const fs = require("fs");
const childProcess = require('child_process');
const { Command } = require("commander");
const inquirer = require("inquirer");
const { teamsCreate } = require("./teams");
const { projectsCreate } = require("./projects");
const { functionsCreate } = require("./functions");
const { databaseListCollections } = require("./database");
const { sdkForConsole } = require("../sdks");
const { localConfig } = require("../config");
const { questionsInitProject, questionsInitFunction } = require("../questions");
const { success, log, actionRunner, commandDescriptions } = require("../parser");

const init = new Command("init")
  .description(commandDescriptions['init'])
  .option("--all", "Flag to initialize projects and collection")
  .action(actionRunner(async ({ all }, command) => {
    if (all == undefined) {
      command.help()
    }

    await initProject();
    await initCollection()
  }));

const initProject = async () => {
  let response = {}
  let answers = await inquirer.prompt(questionsInitProject)
  if (!answers.project) process.exit(1)

  let sdk = await sdkForConsole();
  if (answers.start == "new") {
    response = await teamsCreate({
      teamId: 'unique()',
      name: answers.project,
      sdk,
      parseOutput: false
    })

    let teamId = response['$id'];
    response = await projectsCreate({
      projectId: 'unique()',
      name: answers.project,
      teamId,
      parseOutput: false
    })

    localConfig.setProject(response['$id'], response.name);
  } else {
    localConfig.setProject(answers.project.id, answers.project.name);
  }
  success();
}

const initFunction = async () => {
  let answers = await inquirer.prompt(questionsInitFunction)

  if (fs.existsSync(answers.name)) {
    throw new Error(`( ${answers.name} ) already exists in the current directory. Please choose another name.`);
  }

  let response = await functionsCreate({
    functionId: 'unique()',
    name: answers.name,
    runtime: answers.runtime,
    parseOutput: false,
    vars: {}
  })

  let command = `
    mkdir -m 777 -p '${answers.name}' && \
    cd '${answers.name}' && \
    git init && \
    git remote add -f origin https://github.com/appwrite/functions-starter && \
    git config core.sparseCheckout true && \
    echo '${answers.runtime}' >> .git/info/sparse-checkout && \ 
    git pull origin main && \
    rm -rf .git && \
    mv ${answers.runtime}/* . && \
    rm -rf ${answers.runtime}`;

  // Execute the child process but do not print any std output
  childProcess.execSync(command, { stdio: 'pipe' });

  let data = {
    $id: response['$id'],
    name: response['name'],
    runtime: response['runtime'],
    path: answers.name,
    entrypoint: '',
    vars: {}
  };

  localConfig.addFunction(data);
  success();
}

const initCollection = async () => {
  let response = await databaseListCollections({
    parseOutput: false
  })

  let collections = response.collections;
  log(`Found ${collections.length} collections`);

  collections.forEach(async collection => {
    log(`Fetching ${collection.name} ...`);
    localConfig.addCollection(collection);
  });

  success();
}

init
  .command("project")
  .description("Initialise your Appwrite project")
  .action(actionRunner(initProject));

init
  .command("function")
  .description("Initialise your Appwrite cloud function")
  .action(actionRunner(initFunction))

init
  .command("collection")
  .description("Initialise your Appwrite collections")
  .action(actionRunner(initCollection))

module.exports = {
  init,
};
