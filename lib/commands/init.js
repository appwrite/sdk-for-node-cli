const fs = require("fs");
const path = require("path");
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

  if(!answers.runtime.entrypoint) {
    log(`Entrypoint for this runtime not found. You will be asked to configure entrypoint when you first deploy the function.`);
  }

  let response = await functionsCreate({
    functionId: 'unique()',
    name: answers.name,
    runtime: answers.runtime.id,
    parseOutput: false
  })

  let initFirstCommand = `
    cd '${answers.name}' && \
    git init && \
    git remote add -f origin https://github.com/appwrite/functions-starter && \
    git config core.sparseCheckout true`;

  let initSecondCommand = `
    cd '${answers.name}' && \
    git pull origin dev && \
    git checkout dev`;

  // Convert commands from unix based ones to windows based ones
  if (process.platform == 'win32') {
    initFirstCommand = initFirstCommand.replace(/'/g, '"').replace(/\\/g, '').replace(/\n/g, '').replace(/  +/g, ' ');
    initFirstCommand = 'cmd /c "' + initFirstCommand + '"';
    initSecondCommand = initSecondCommand.replace(/'/g, '"').replace(/\\/g, '').replace(/\n/g, '').replace(/  +/g, ' ');
    initSecondCommand = 'cmd /c "' + initSecondCommand + '"';
  }

  fs.mkdirSync(answers.name, { recursive: true });
  fs.chmodSync(answers.name, 0o777);

  // Execute the child process but do not print any std output
  childProcess.execSync(initFirstCommand, { stdio: 'pipe' });

  fs.writeFileSync(`${answers.name}/.git/info/sparse-checkout`, answers.runtime.id);

  childProcess.execSync(initSecondCommand, { stdio: 'pipe' });

  fs.rmSync(`${answers.name}/.git`, { recursive: true, force: true });
  
  // Copy files
  function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to, { recursive: true });
    }

    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

  copyFolderSync(`./${answers.name}/${answers.runtime.id}`, `./${answers.name}/`);
  fs.rmSync(`./${answers.name}/${answers.runtime.id}`, { recursive: true, force: true });

  const readmePath = path.join(process.cwd(), answers.name, 'README.md');
  const readmeFile = fs.readFileSync(readmePath).toString();
  const newReadmeFile = readmeFile.split('\n');
  newReadmeFile[0] = `# ${answers.name}`;
  newReadmeFile.splice(1, 2);
  fs.writeFileSync(readmePath, newReadmeFile.join('\n'));

  let data = {
    $id: response['$id'],
    name: response['name'],
    runtime: response['runtime'],
    path: answers.name,
    entrypoint: answers.runtime.entrypoint || ''
  };

  localConfig.addFunction(data);
  success();
}

const initCollection = async () => {
  // TODO: Pagination?
  let response = await databaseListCollections({
    limit: 100,
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
