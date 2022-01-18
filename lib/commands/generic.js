const { Command } = require("commander");
const inquirer = require("inquirer");
const { globalConfig, localConfig } = require("../config");
const { actionRunner, success, commandDescriptions, log, parse } = require("../parser");
const { sdkForConsole } = require("../sdks");
const { questionsLogin } = require("../questions");
const { accountCreateSession, accountDeleteSession } = require("./account");

const login = new Command("login")
    .description(commandDescriptions['login'])
    .action(actionRunner(async () => {
        const answers = await inquirer.prompt(questionsLogin)

        let client = await sdkForConsole(false);

        await accountCreateSession({
            email: answers.email,
            password: answers.password,
            parseOutput: false,
            sdk: client
        })

        success()
    }));

const logout = new Command("logout")
    .description(commandDescriptions['logout'])
    .action(actionRunner(async () => {
        let client = await sdkForConsole();

        await accountDeleteSession({
            sessionId: 'current',
            parseOutput: false,
            sdk: client
        })

        globalConfig.setCookie("");
        success()
    }));

const client = new Command("client")
    .description(commandDescriptions['client'])
    .option("--selfSigned <value>", "Configure the CLI to use a self-signed certificate ( true or false )")
    .option("--endpoint <endpoint>", "Set your Apwrite server endpoint")
    .option("--projectId <projectId>", "Set your Apwrite project ID")
    .option("--key <key>", "Set your Apwrite server's API key")
    .option("--debug", "Print CLI debug information")
    .option("--reset", "Reset the CLI configuration")
    .action(actionRunner(async ({ selfSigned, endpoint, projectId, key, debug, reset }, command) => {
        if (selfSigned == undefined && endpoint == undefined && projectId == undefined && key == undefined && debug == undefined && reset == undefined) {
            command.help()
        }

        if (debug) {
            let config = {
                endpoint: globalConfig.getEndpoint(),
                key: globalConfig.getKey(),
                cookie: globalConfig.getCookie(),
                selfSigned: globalConfig.getSelfSigned(),
                project: localConfig.getProject()
            }
            parse(config)
        }

        if (endpoint) {
            try {
                let url = new URL(endpoint);
                if (url.protocol === "http:" || url.protocol === "https:") {
                    globalConfig.setEndpoint(endpoint);
                } else {
                    throw new Error();
                }
            } catch (_) {
                throw new Error("Invalid endpoint");
            }
        }

        globalConfig.setKey(key)

        if (projectId) {
            localConfig.setProject(projectId, '');
        }

        if (selfSigned) {
            if (selfSigned === "true" || selfSigned === "false") {
                globalConfig.setSelfSigned(selfSigned);
            } else {
                throw new Error("Self signed must be true or false");
            }
        }

        if (reset) {
            globalConfig.setEndpoint("");
            globalConfig.setKey("");
            globalConfig.setCookie("");
            globalConfig.setSelfSigned("");
            localConfig.setProject("", "");
        }

        success()
    }));


module.exports = {
    login,
    logout,
    client
};