const fs = require('fs');
const _path = require('path');
const childProcess = require('child_process');
const { Command } = require('commander');
const { sdkForProject, sdkForConsole } = require('../sdks')
const { parse, actionRunner, commandDescriptions, success } = require('../parser')
const { localConfig, globalConfig } = require("../config");

const functions = new Command("functions").description(commandDescriptions['functions'])

const functionsList = async ({ search, limit, offset, cursor, cursorDirection, orderType, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} search */
    /* @param {number} limit */
    /* @param {number} offset */
    /* @param {string} cursor */
    /* @param {string} cursorDirection */
    /* @param {string} orderType */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions';
    let payload = {};

    /** Query Params */
    if (typeof search !== 'undefined') {
        payload['search'] = search;
    }
    if (typeof limit !== 'undefined') {
        payload['limit'] = limit;
    }
    if (typeof offset !== 'undefined') {
        payload['offset'] = offset;
    }
    if (typeof cursor !== 'undefined') {
        payload['cursor'] = cursor;
    }
    if (typeof cursorDirection !== 'undefined') {
        payload['cursorDirection'] = cursorDirection;
    }
    if (typeof orderType !== 'undefined') {
        payload['orderType'] = orderType;
    }
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsCreate = async ({ functionId, name, execute, runtime, vars, events, schedule, timeout, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */
    /* @param {string} name */
    /* @param {string[]} execute */
    /* @param {string} runtime */
    /* @param {object} vars */
    /* @param {string[]} events */
    /* @param {string} schedule */
    /* @param {number} timeout */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions';
    let payload = {};
    
    /** Body Params */
    if (typeof functionId !== 'undefined') {
        payload['functionId'] = functionId;
    }

    if (typeof name !== 'undefined') {
        payload['name'] = name;
    }

    if (typeof execute !== 'undefined') {
        payload['execute'] = execute;
    }

    if (typeof runtime !== 'undefined') {
        payload['runtime'] = runtime;
    }

    if (typeof vars !== 'undefined') {
        payload['vars'] = vars;
    }

    if (typeof events !== 'undefined') {
        payload['events'] = events;
    }

    if (typeof schedule !== 'undefined') {
        payload['schedule'] = schedule;
    }

    if (typeof timeout !== 'undefined') {
        payload['timeout'] = timeout;
    }

    const response = await client.call('post', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsListRuntimes = async ({ parseOutput = true, sdk = undefined, json }) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/runtimes';
    let payload = {};
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsGet = async ({ functionId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/{functionId}'.replace('{functionId}', functionId);
    let payload = {};
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsUpdate = async ({ functionId, name, execute, vars, events, schedule, timeout, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */
    /* @param {string} name */
    /* @param {string[]} execute */
    /* @param {object} vars */
    /* @param {string[]} events */
    /* @param {string} schedule */
    /* @param {number} timeout */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/{functionId}'.replace('{functionId}', functionId);
    let payload = {};
    
    /** Body Params */
    if (typeof name !== 'undefined') {
        payload['name'] = name;
    }

    if (typeof execute !== 'undefined') {
        payload['execute'] = execute;
    }

    if (typeof vars !== 'undefined') {
        payload['vars'] = vars;
    }

    if (typeof events !== 'undefined') {
        payload['events'] = events;
    }

    if (typeof schedule !== 'undefined') {
        payload['schedule'] = schedule;
    }

    if (typeof timeout !== 'undefined') {
        payload['timeout'] = timeout;
    }

    const response = await client.call('put', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsDelete = async ({ functionId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/{functionId}'.replace('{functionId}', functionId);
    let payload = {};
    const response = await client.call('delete', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsListExecutions = async ({ functionId, limit, offset, search, cursor, cursorDirection, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */
    /* @param {number} limit */
    /* @param {number} offset */
    /* @param {string} search */
    /* @param {string} cursor */
    /* @param {string} cursorDirection */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/{functionId}/executions'.replace('{functionId}', functionId);
    let payload = {};

    /** Query Params */
    if (typeof limit !== 'undefined') {
        payload['limit'] = limit;
    }
    if (typeof offset !== 'undefined') {
        payload['offset'] = offset;
    }
    if (typeof search !== 'undefined') {
        payload['search'] = search;
    }
    if (typeof cursor !== 'undefined') {
        payload['cursor'] = cursor;
    }
    if (typeof cursorDirection !== 'undefined') {
        payload['cursorDirection'] = cursorDirection;
    }
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsCreateExecution = async ({ functionId, data, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */
    /* @param {string} data */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/{functionId}/executions'.replace('{functionId}', functionId);
    let payload = {};
    
    /** Body Params */
    if (typeof data !== 'undefined') {
        payload['data'] = data;
    }

    const response = await client.call('post', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsGetExecution = async ({ functionId, executionId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */
    /* @param {string} executionId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/{functionId}/executions/{executionId}'.replace('{functionId}', functionId).replace('{executionId}', executionId);
    let payload = {};
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsUpdateTag = async ({ functionId, tag, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */
    /* @param {string} tag */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/{functionId}/tag'.replace('{functionId}', functionId);
    let payload = {};
    
    /** Body Params */
    if (typeof tag !== 'undefined') {
        payload['tag'] = tag;
    }

    const response = await client.call('patch', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsListTags = async ({ functionId, search, limit, offset, cursor, cursorDirection, orderType, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */
    /* @param {string} search */
    /* @param {number} limit */
    /* @param {number} offset */
    /* @param {string} cursor */
    /* @param {string} cursorDirection */
    /* @param {string} orderType */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/{functionId}/tags'.replace('{functionId}', functionId);
    let payload = {};

    /** Query Params */
    if (typeof search !== 'undefined') {
        payload['search'] = search;
    }
    if (typeof limit !== 'undefined') {
        payload['limit'] = limit;
    }
    if (typeof offset !== 'undefined') {
        payload['offset'] = offset;
    }
    if (typeof cursor !== 'undefined') {
        payload['cursor'] = cursor;
    }
    if (typeof cursorDirection !== 'undefined') {
        payload['cursorDirection'] = cursorDirection;
    }
    if (typeof orderType !== 'undefined') {
        payload['orderType'] = orderType;
    }
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsCreateTag = async ({ functionId, command, code, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */
    /* @param {string} command */
    /* @param {File} code */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/{functionId}/tags'.replace('{functionId}', functionId);
    let payload = {};
    
    /** Body Params */
    if (typeof command !== 'undefined') {
        payload['command'] = command;
    }

    let folderPath = fs.realpathSync(code);
    if (!fs.lstatSync(folderPath).isDirectory())
        throw new Error('The path is not a directory.');
    let folderName = _path.basename(folderPath);
    childProcess.execSync(`tar --cd '${_path.dirname(folderPath)}' -zcvf code.tar.gz '${folderName}'`, { stdio: 'pipe' });
    let archivePath = fs.realpathSync('code.tar.gz')
    if (typeof archivePath !== 'undefined') {
        payload['code'] = fs.createReadStream(archivePath);
    }

    const response = await client.call('post', path, {
        'content-type': 'multipart/form-data',
    }, payload);

    fs.unlinkSync(archivePath);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsGetTag = async ({ functionId, tagId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */
    /* @param {string} tagId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/{functionId}/tags/{tagId}'.replace('{functionId}', functionId).replace('{tagId}', tagId);
    let payload = {};
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsDeleteTag = async ({ functionId, tagId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */
    /* @param {string} tagId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/{functionId}/tags/{tagId}'.replace('{functionId}', functionId).replace('{tagId}', tagId);
    let payload = {};
    const response = await client.call('delete', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const functionsGetUsage = async ({ functionId, range, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} functionId */
    /* @param {string} range */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/functions/{functionId}/usage'.replace('{functionId}', functionId);
    let payload = {};

    /** Query Params */
    if (typeof range !== 'undefined') {
        payload['range'] = range;
    }
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}


functions
    .command("list")
    .description(`Get a list of all the project's functions. You can use the query params to filter your results.`)
    .option("--search <search>", "Search term to filter your list results. Max length: 256 chars.")
    .option("--limit <limit>", "Maximum number of functions to return in response. By default will return maximum 25 results. Maximum of 100 results allowed per request.")
    .option("--offset <offset>", "Offset value. The default value is 0. Use this value to manage pagination. [learn more about pagination](https://appwrite.io/docs/pagination)")
    .option("--cursor <cursor>", "ID of the function used as the starting point for the query, excluding the function itself. Should be used for efficient pagination when working with large sets of data. [learn more about pagination](https://appwrite.io/docs/pagination)")
    .option("--cursorDirection <cursorDirection>", "Direction of the cursor.")
    .option("--orderType <orderType>", "Order result by ASC or DESC order.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsList))

functions
    .command("create")
    .description(`Create a new function. You can pass a list of [permissions](/docs/permissions) to allow different project users or team with access to execute the function using the client API.`)
    .requiredOption("--functionId <functionId>", "Function ID. Choose your own unique ID or pass the string `unique()` to auto generate it. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.")
    .requiredOption("--name <name>", "Function name. Max length: 128 chars.")
    .requiredOption("--execute <execute...>", "An array of strings with execution permissions. By default no user is granted with any execute permissions. [learn more about permissions](https://appwrite.io/docs/permissions) and get a full list of available permissions.")
    .requiredOption("--runtime <runtime>", "Execution runtime.")
    .option("--vars <vars>", "Key-value JSON object that will be passed to the function as environment variables.")
    .option("--events <events...>", "Events list.")
    .option("--schedule <schedule>", "Schedule CRON syntax.")
    .option("--timeout <timeout>", "Function maximum execution time in seconds.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsCreate))

functions
    .command("listRuntimes")
    .description(`Get a list of all runtimes that are currently active in your project.`)
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsListRuntimes))

functions
    .command("get")
    .description(`Get a function by its unique ID.`)
    .requiredOption("--functionId <functionId>", "Function ID.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsGet))

functions
    .command("update")
    .description(`Update function by its unique ID.`)
    .requiredOption("--functionId <functionId>", "Function ID.")
    .requiredOption("--name <name>", "Function name. Max length: 128 chars.")
    .requiredOption("--execute <execute...>", "An array of strings with execution permissions. By default no user is granted with any execute permissions. [learn more about permissions](https://appwrite.io/docs/permissions) and get a full list of available permissions.")
    .option("--vars <vars>", "Key-value JSON object that will be passed to the function as environment variables.")
    .option("--events <events...>", "Events list.")
    .option("--schedule <schedule>", "Schedule CRON syntax.")
    .option("--timeout <timeout>", "Maximum execution time in seconds.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsUpdate))

functions
    .command("delete")
    .description(`Delete a function by its unique ID.`)
    .requiredOption("--functionId <functionId>", "Function ID.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsDelete))

functions
    .command("listExecutions")
    .description(`Get a list of all the current user function execution logs. You can use the query params to filter your results. On admin mode, this endpoint will return a list of all of the project's executions. [Learn more about different API modes](/docs/admin).`)
    .requiredOption("--functionId <functionId>", "Function ID.")
    .option("--limit <limit>", "Maximum number of executions to return in response. By default will return maximum 25 results. Maximum of 100 results allowed per request.")
    .option("--offset <offset>", "Offset value. The default value is 0. Use this value to manage pagination. [learn more about pagination](https://appwrite.io/docs/pagination)")
    .option("--search <search>", "Search term to filter your list results. Max length: 256 chars.")
    .option("--cursor <cursor>", "ID of the execution used as the starting point for the query, excluding the execution itself. Should be used for efficient pagination when working with large sets of data. [learn more about pagination](https://appwrite.io/docs/pagination)")
    .option("--cursorDirection <cursorDirection>", "Direction of the cursor.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsListExecutions))

functions
    .command("createExecution")
    .description(`Trigger a function execution. The returned object will return you the current execution status. You can ping the 'Get Execution' endpoint to get updates on the current execution status. Once this endpoint is called, your function execution process will start asynchronously.`)
    .requiredOption("--functionId <functionId>", "Function ID.")
    .option("--data <data>", "String of custom data to send to function.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsCreateExecution))

functions
    .command("getExecution")
    .description(`Get a function execution log by its unique ID.`)
    .requiredOption("--functionId <functionId>", "Function ID.")
    .requiredOption("--executionId <executionId>", "Execution ID.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsGetExecution))

functions
    .command("updateTag")
    .description(`Update the function code tag ID using the unique function ID. Use this endpoint to switch the code tag that should be executed by the execution endpoint.`)
    .requiredOption("--functionId <functionId>", "Function ID.")
    .requiredOption("--tag <tag>", "Tag ID.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsUpdateTag))

functions
    .command("listTags")
    .description(`Get a list of all the project's code tags. You can use the query params to filter your results.`)
    .requiredOption("--functionId <functionId>", "Function ID.")
    .option("--search <search>", "Search term to filter your list results. Max length: 256 chars.")
    .option("--limit <limit>", "Maximum number of tags to return in response. By default will return maximum 25 results. Maximum of 100 results allowed per request.")
    .option("--offset <offset>", "Offset value. The default value is 0. Use this value to manage pagination. [learn more about pagination](https://appwrite.io/docs/pagination)")
    .option("--cursor <cursor>", "ID of the tag used as the starting point for the query, excluding the tag itself. Should be used for efficient pagination when working with large sets of data. [learn more about pagination](https://appwrite.io/docs/pagination)")
    .option("--cursorDirection <cursorDirection>", "Direction of the cursor.")
    .option("--orderType <orderType>", "Order result by ASC or DESC order.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsListTags))

functions
    .command("createTag")
    .description(`Create a new function code tag. Use this endpoint to upload a new version of your code function. To execute your newly uploaded code, you'll need to update the function's tag to use your new tag UID.  This endpoint accepts a tar.gz file compressed with your code. Make sure to include any dependencies your code has within the compressed file. You can learn more about code packaging in the [Appwrite Cloud Functions tutorial](/docs/functions).  Use the "command" param to set the entry point used to execute your code.`)
    .requiredOption("--functionId <functionId>", "Function ID.")
    .requiredOption("--command <command>", "Code execution command.")
    .requiredOption("--code <code>", "Gzip file with your code package. When used with the Appwrite CLI, pass the path to your code directory, and the CLI will automatically package your code. Use a path that is within the current directory.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsCreateTag))

functions
    .command("getTag")
    .description(`Get a code tag by its unique ID.`)
    .requiredOption("--functionId <functionId>", "Function ID.")
    .requiredOption("--tagId <tagId>", "Tag ID.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsGetTag))

functions
    .command("deleteTag")
    .description(`Delete a code tag by its unique ID.`)
    .requiredOption("--functionId <functionId>", "Function ID.")
    .requiredOption("--tagId <tagId>", "Tag ID.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsDeleteTag))

functions
    .command("getUsage")
    .description(``)
    .requiredOption("--functionId <functionId>", "Function ID.")
    .option("--range <range>", "Date range.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(functionsGetUsage))


module.exports = {
    functions,
    functionsList,
    functionsCreate,
    functionsListRuntimes,
    functionsGet,
    functionsUpdate,
    functionsDelete,
    functionsListExecutions,
    functionsCreateExecution,
    functionsGetExecution,
    functionsUpdateTag,
    functionsListTags,
    functionsCreateTag,
    functionsGetTag,
    functionsDeleteTag,
    functionsGetUsage
};