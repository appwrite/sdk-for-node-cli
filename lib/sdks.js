const inquirer = require("inquirer");
const Client = require("./client");
const { globalConfig, localConfig } = require("./config");

const questionGetEndpoint = [
  {
    type: "input",
    name: "endpoint",
    message: "Enter the endpoint of your Appwrite server",
    default: "http://localhost/v1"
  }
]

const sdkForConsole = async (requiresAuth = true) => {
  let client = new Client();
  let endpoint = globalConfig.getEndpoint();
  let cookie = globalConfig.getCookie()
  let selfSigned = globalConfig.getSelfSigned()

  if (!endpoint) {
    const answers = await inquirer.prompt(questionGetEndpoint)
    endpoint = answers.endpoint;
    globalConfig.setEndpoint(endpoint);
  }

  if (requiresAuth && cookie === "") {
    throw new Error("Session not found. Please run `appwrite login` to create a session");
  }

  client
    .setEndpoint(endpoint)
    .setCookie(cookie)
    .setProject("console")
    .setSelfSigned(selfSigned)
    .setLocale("en-US");

  return client;
};

const sdkForProject = async () => {
  let client = new Client();
  let endpoint = globalConfig.getEndpoint();
  let project = localConfig.getProject().projectId ? localConfig.getProject().projectId : globalConfig.getProject();
  let key = globalConfig.getKey();
  let cookie = globalConfig.getCookie()
  let selfSigned = globalConfig.getSelfSigned()

  if (!endpoint) {
    const answers = await inquirer.prompt(questionGetEndpoint)
    endpoint = answers.endpoint;
    globalConfig.setEndpoint(endpoint);
  }

  if (!project) {
    throw new Error("Project is not set. Please run `appwrite init project` to initialize the current directory with an Appwrite project.");
  }

  client
    .setEndpoint(endpoint)
    .setProject(project)
    .setSelfSigned(selfSigned)
    .setLocale("en-US");

  if (key) {
    return client
      .setKey(key)
      .setMode("default");
  }

  if (cookie) {
    return client
      .setCookie(cookie)
      .setMode("admin");
  }

  throw new Error("Session not found. Please run `appwrite login` to create a session.");
};

module.exports = {
  sdkForConsole,
  sdkForProject,
};
