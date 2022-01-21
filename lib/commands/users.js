const fs = require('fs');
const childProcess = require('child_process');
const { Command } = require('commander');
const { sdkForProject, sdkForConsole } = require('../sdks')
const { parse, actionRunner, parseInteger, parseBool, commandDescriptions, success } = require('../parser')
const { localConfig, globalConfig } = require("../config");

const users = new Command("users").description(commandDescriptions['users'])

const usersList = async ({ search, limit, offset, cursor, cursorDirection, orderType, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} search */
    /* @param {number} limit */
    /* @param {number} offset */
    /* @param {string} cursor */
    /* @param {string} cursorDirection */
    /* @param {string} orderType */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users';
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

const usersCreate = async ({ userId, email, password, name, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */
    /* @param {string} email */
    /* @param {string} password */
    /* @param {string} name */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users';
    let payload = {};
    
    /** Body Params */
    if (typeof userId !== 'undefined') {
        payload['userId'] = userId;
    }

    if (typeof email !== 'undefined') {
        payload['email'] = email;
    }

    if (typeof password !== 'undefined') {
        payload['password'] = password;
    }

    if (typeof name !== 'undefined') {
        payload['name'] = name;
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

const usersGetUsage = async ({ range, provider, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} range */
    /* @param {string} provider */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/usage';
    let payload = {};

    /** Query Params */
    if (typeof range !== 'undefined') {
        payload['range'] = range;
    }
    if (typeof provider !== 'undefined') {
        payload['provider'] = provider;
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

const usersGet = async ({ userId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}'.replace('{userId}', userId);
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

const usersDelete = async ({ userId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}'.replace('{userId}', userId);
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

const usersUpdateEmail = async ({ userId, email, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */
    /* @param {string} email */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}/email'.replace('{userId}', userId);
    let payload = {};
    
    /** Body Params */
    if (typeof email !== 'undefined') {
        payload['email'] = email;
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

const usersGetLogs = async ({ userId, limit, offset, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */
    /* @param {number} limit */
    /* @param {number} offset */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}/logs'.replace('{userId}', userId);
    let payload = {};

    /** Query Params */
    if (typeof limit !== 'undefined') {
        payload['limit'] = limit;
    }
    if (typeof offset !== 'undefined') {
        payload['offset'] = offset;
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

const usersUpdateName = async ({ userId, name, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */
    /* @param {string} name */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}/name'.replace('{userId}', userId);
    let payload = {};
    
    /** Body Params */
    if (typeof name !== 'undefined') {
        payload['name'] = name;
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

const usersUpdatePassword = async ({ userId, password, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */
    /* @param {string} password */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}/password'.replace('{userId}', userId);
    let payload = {};
    
    /** Body Params */
    if (typeof password !== 'undefined') {
        payload['password'] = password;
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

const usersGetPrefs = async ({ userId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}/prefs'.replace('{userId}', userId);
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

const usersUpdatePrefs = async ({ userId, prefs, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */
    /* @param {object} prefs */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}/prefs'.replace('{userId}', userId);
    let payload = {};
    
    /** Body Params */
    if (typeof prefs !== 'undefined') {
        payload['prefs'] = prefs;
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

const usersGetSessions = async ({ userId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}/sessions'.replace('{userId}', userId);
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

const usersDeleteSessions = async ({ userId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}/sessions'.replace('{userId}', userId);
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

const usersDeleteSession = async ({ userId, sessionId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */
    /* @param {string} sessionId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}/sessions/{sessionId}'.replace('{userId}', userId).replace('{sessionId}', sessionId);
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

const usersUpdateStatus = async ({ userId, status, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */
    /* @param {boolean} status */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}/status'.replace('{userId}', userId);
    let payload = {};
    
    /** Body Params */
    if (typeof status !== 'undefined') {
        payload['status'] = status;
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

const usersUpdateVerification = async ({ userId, emailVerification, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} userId */
    /* @param {boolean} emailVerification */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/users/{userId}/verification'.replace('{userId}', userId);
    let payload = {};
    
    /** Body Params */
    if (typeof emailVerification !== 'undefined') {
        payload['emailVerification'] = emailVerification;
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


users
    .command(`list`)
    .description(`Get a list of all the project's users. You can use the query params to filter your results.`)
    .option(`--search <search>`, `Search term to filter your list results. Max length: 256 chars.`)
    .option(`--limit <limit>`, `Maximum number of users to return in response. By default will return maximum 25 results. Maximum of 100 results allowed per request.`, parseInteger)
    .option(`--offset <offset>`, `Offset value. The default value is 0. Use this param to manage pagination. [learn more about pagination](https://appwrite.io/docs/pagination)`, parseInteger)
    .option(`--cursor <cursor>`, `ID of the user used as the starting point for the query, excluding the user itself. Should be used for efficient pagination when working with large sets of data. [learn more about pagination](https://appwrite.io/docs/pagination)`)
    .option(`--cursorDirection <cursorDirection>`, `Direction of the cursor.`)
    .option(`--orderType <orderType>`, `Order result by ASC or DESC order.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersList))

users
    .command(`create`)
    .description(`Create a new user.`)
    .requiredOption(`--userId <userId>`, `User ID. Choose your own unique ID or pass the string "unique()" to auto generate it. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.`)
    .requiredOption(`--email <email>`, `User email.`)
    .requiredOption(`--password <password>`, `User password. Must be at least 8 chars.`)
    .option(`--name <name>`, `User name. Max length: 128 chars.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersCreate))

users
    .command(`getUsage`)
    .description(``)
    .option(`--range <range>`, `Date range.`)
    .option(`--provider <provider>`, `Provider Name.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersGetUsage))

users
    .command(`get`)
    .description(`Get a user by its unique ID.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersGet))

users
    .command(`delete`)
    .description(`Delete a user by its unique ID.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersDelete))

users
    .command(`updateEmail`)
    .description(`Update the user email by its unique ID.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .requiredOption(`--email <email>`, `User email.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersUpdateEmail))

users
    .command(`getLogs`)
    .description(`Get the user activity logs list by its unique ID.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .option(`--limit <limit>`, `Maximum number of logs to return in response. By default will return maximum 25 results. Maximum of 100 results allowed per request.`, parseInteger)
    .option(`--offset <offset>`, `Offset value. The default value is 0. Use this value to manage pagination. [learn more about pagination](https://appwrite.io/docs/pagination)`, parseInteger)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersGetLogs))

users
    .command(`updateName`)
    .description(`Update the user name by its unique ID.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .requiredOption(`--name <name>`, `User name. Max length: 128 chars.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersUpdateName))

users
    .command(`updatePassword`)
    .description(`Update the user password by its unique ID.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .requiredOption(`--password <password>`, `New user password. Must be at least 8 chars.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersUpdatePassword))

users
    .command(`getPrefs`)
    .description(`Get the user preferences by its unique ID.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersGetPrefs))

users
    .command(`updatePrefs`)
    .description(`Update the user preferences by its unique ID. The object you pass is stored as is, and replaces any previous value. The maximum allowed prefs size is 64kB and throws error if exceeded.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .requiredOption(`--prefs <prefs>`, `Prefs key-value JSON object.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersUpdatePrefs))

users
    .command(`getSessions`)
    .description(`Get the user sessions list by its unique ID.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersGetSessions))

users
    .command(`deleteSessions`)
    .description(`Delete all user's sessions by using the user's unique ID.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersDeleteSessions))

users
    .command(`deleteSession`)
    .description(`Delete a user sessions by its unique ID.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .requiredOption(`--sessionId <sessionId>`, `Session ID.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersDeleteSession))

users
    .command(`updateStatus`)
    .description(`Update the user status by its unique ID.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .requiredOption(`--status <status>`, `User Status. To activate the user pass 'true' and to block the user pass 'false'.`, parseBool)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersUpdateStatus))

users
    .command(`updateVerification`)
    .description(`Update the user email verification status by its unique ID.`)
    .requiredOption(`--userId <userId>`, `User ID.`)
    .requiredOption(`--emailVerification <emailVerification>`, `User email verification status.`, parseBool)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(usersUpdateVerification))


module.exports = {
    users,
    usersList,
    usersCreate,
    usersGetUsage,
    usersGet,
    usersDelete,
    usersUpdateEmail,
    usersGetLogs,
    usersUpdateName,
    usersUpdatePassword,
    usersGetPrefs,
    usersUpdatePrefs,
    usersGetSessions,
    usersDeleteSessions,
    usersDeleteSession,
    usersUpdateStatus,
    usersUpdateVerification
};