const fs = require('fs');
const _path = require('path');
const childProcess = require('child_process');
const { Command } = require('commander');
const { sdkForProject, sdkForConsole } = require('../sdks')
const { parse, actionRunner, commandDescriptions, success } = require('../parser')
const { localConfig, globalConfig } = require("../config");

const account = new Command("account").description(commandDescriptions['account'])

const accountGet = async ({ parseOutput = true, sdk = undefined}) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account';
    let payload = {};
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountCreate = async ({ userId, email, password, name, parseOutput = true, sdk = undefined}) => {
    /* @param {string} userId */
    /* @param {string} email */
    /* @param {string} password */
    /* @param {string} name */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account';
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
        parse(response)
        success()
    }
    return response;
}

const accountDelete = async ({ parseOutput = true, sdk = undefined}) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account';
    let payload = {};
    const response = await client.call('delete', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountUpdateEmail = async ({ email, password, parseOutput = true, sdk = undefined}) => {
    /* @param {string} email */
    /* @param {string} password */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/email';
    let payload = {};
    
    /** Body Params */
    if (typeof email !== 'undefined') {
        payload['email'] = email;
    }

    if (typeof password !== 'undefined') {
        payload['password'] = password;
    }

    const response = await client.call('patch', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountCreateJWT = async ({ parseOutput = true, sdk = undefined}) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/jwt';
    let payload = {};
    const response = await client.call('post', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountGetLogs = async ({ limit, offset, parseOutput = true, sdk = undefined}) => {
    /* @param {number} limit */
    /* @param {number} offset */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/logs';
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
        parse(response)
        success()
    }
    return response;
}

const accountUpdateName = async ({ name, parseOutput = true, sdk = undefined}) => {
    /* @param {string} name */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/name';
    let payload = {};
    
    /** Body Params */
    if (typeof name !== 'undefined') {
        payload['name'] = name;
    }

    const response = await client.call('patch', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountUpdatePassword = async ({ password, oldPassword, parseOutput = true, sdk = undefined}) => {
    /* @param {string} password */
    /* @param {string} oldPassword */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/password';
    let payload = {};
    
    /** Body Params */
    if (typeof password !== 'undefined') {
        payload['password'] = password;
    }

    if (typeof oldPassword !== 'undefined') {
        payload['oldPassword'] = oldPassword;
    }

    const response = await client.call('patch', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountGetPrefs = async ({ parseOutput = true, sdk = undefined}) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/prefs';
    let payload = {};
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountUpdatePrefs = async ({ prefs, parseOutput = true, sdk = undefined}) => {
    /* @param {object} prefs */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/prefs';
    let payload = {};
    
    /** Body Params */
    if (typeof prefs !== 'undefined') {
        payload['prefs'] = prefs;
    }

    const response = await client.call('patch', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountCreateRecovery = async ({ email, url, parseOutput = true, sdk = undefined}) => {
    /* @param {string} email */
    /* @param {string} url */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/recovery';
    let payload = {};
    
    /** Body Params */
    if (typeof email !== 'undefined') {
        payload['email'] = email;
    }

    if (typeof url !== 'undefined') {
        payload['url'] = url;
    }

    const response = await client.call('post', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountUpdateRecovery = async ({ userId, secret, password, passwordAgain, parseOutput = true, sdk = undefined}) => {
    /* @param {string} userId */
    /* @param {string} secret */
    /* @param {string} password */
    /* @param {string} passwordAgain */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/recovery';
    let payload = {};
    
    /** Body Params */
    if (typeof userId !== 'undefined') {
        payload['userId'] = userId;
    }

    if (typeof secret !== 'undefined') {
        payload['secret'] = secret;
    }

    if (typeof password !== 'undefined') {
        payload['password'] = password;
    }

    if (typeof passwordAgain !== 'undefined') {
        payload['passwordAgain'] = passwordAgain;
    }

    const response = await client.call('put', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountGetSessions = async ({ parseOutput = true, sdk = undefined}) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/sessions';
    let payload = {};
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountCreateSession = async ({ email, password, parseOutput = true, sdk = undefined}) => {
    /* @param {string} email */
    /* @param {string} password */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/sessions';
    let payload = {};
    
    /** Body Params */
    if (typeof email !== 'undefined') {
        payload['email'] = email;
    }

    if (typeof password !== 'undefined') {
        payload['password'] = password;
    }

    const response = await client.call('post', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountDeleteSessions = async ({ parseOutput = true, sdk = undefined}) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/sessions';
    let payload = {};
    const response = await client.call('delete', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountCreateAnonymousSession = async ({ parseOutput = true, sdk = undefined}) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/sessions/anonymous';
    let payload = {};
    const response = await client.call('post', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountCreateMagicURLSession = async ({ userId, email, url, parseOutput = true, sdk = undefined}) => {
    /* @param {string} userId */
    /* @param {string} email */
    /* @param {string} url */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/sessions/magic-url';
    let payload = {};
    
    /** Body Params */
    if (typeof userId !== 'undefined') {
        payload['userId'] = userId;
    }

    if (typeof email !== 'undefined') {
        payload['email'] = email;
    }

    if (typeof url !== 'undefined') {
        payload['url'] = url;
    }

    const response = await client.call('post', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountUpdateMagicURLSession = async ({ userId, secret, parseOutput = true, sdk = undefined}) => {
    /* @param {string} userId */
    /* @param {string} secret */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/sessions/magic-url';
    let payload = {};
    
    /** Body Params */
    if (typeof userId !== 'undefined') {
        payload['userId'] = userId;
    }

    if (typeof secret !== 'undefined') {
        payload['secret'] = secret;
    }

    const response = await client.call('put', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountCreateOAuth2Session = async ({ provider, success, failure, scopes, parseOutput = true, sdk = undefined}) => {
    /* @param {string} provider */
    /* @param {string} success */
    /* @param {string} failure */
    /* @param {string[]} scopes */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/sessions/oauth2/{provider}'.replace('{provider}', provider);
    let payload = {};

    /** Query Params */
    if (typeof success !== 'undefined') {
        payload['success'] = success;
    }
    if (typeof failure !== 'undefined') {
        payload['failure'] = failure;
    }
    if (typeof scopes !== 'undefined') {
        payload['scopes'] = scopes;
    }
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountGetSession = async ({ sessionId, parseOutput = true, sdk = undefined}) => {
    /* @param {string} sessionId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/sessions/{sessionId}'.replace('{sessionId}', sessionId);
    let payload = {};
    const response = await client.call('get', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountDeleteSession = async ({ sessionId, parseOutput = true, sdk = undefined}) => {
    /* @param {string} sessionId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/sessions/{sessionId}'.replace('{sessionId}', sessionId);
    let payload = {};
    const response = await client.call('delete', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountCreateVerification = async ({ url, parseOutput = true, sdk = undefined}) => {
    /* @param {string} url */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/verification';
    let payload = {};
    
    /** Body Params */
    if (typeof url !== 'undefined') {
        payload['url'] = url;
    }

    const response = await client.call('post', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}

const accountUpdateVerification = async ({ userId, secret, parseOutput = true, sdk = undefined}) => {
    /* @param {string} userId */
    /* @param {string} secret */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/account/verification';
    let payload = {};
    
    /** Body Params */
    if (typeof userId !== 'undefined') {
        payload['userId'] = userId;
    }

    if (typeof secret !== 'undefined') {
        payload['secret'] = secret;
    }

    const response = await client.call('put', path, {
        'content-type': 'application/json',
    }, payload);
    
    if (parseOutput) {
        parse(response)
        success()
    }
    return response;
}


account
    .command("get")
    .description(`Get currently logged in user data as JSON object.`)
    .action(actionRunner(accountGet))

account
    .command("create")
    .description(`Use this endpoint to allow a new user to register a new account in your project. After the user registration completes successfully, you can use the [/account/verfication](/docs/client/account#accountCreateVerification) route to start verifying the user email address. To allow the new user to login to their new account, you need to create a new [account session](/docs/client/account#accountCreateSession).`)
    .requiredOption("--userId <userId>", "Unique Id. Choose your own unique ID or pass the string `unique()` to auto generate it. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.")
    .requiredOption("--email <email>", "User email.")
    .requiredOption("--password <password>", "User password. Must be at least 8 chars.")
    .option("--name <name>", "User name. Max length: 128 chars.")
    .action(actionRunner(accountCreate))

account
    .command("delete")
    .description(`Delete a currently logged in user account. Behind the scene, the user record is not deleted but permanently blocked from any access. This is done to avoid deleted accounts being overtaken by new users with the same email address. Any user-related resources like documents or storage files should be deleted separately.`)
    .action(actionRunner(accountDelete))

account
    .command("updateEmail")
    .description(`Update currently logged in user account email address. After changing user address, the user confirmation status will get reset. A new confirmation email is not sent automatically however you can use the send confirmation email endpoint again to send the confirmation email. For security measures, user password is required to complete this request. This endpoint can also be used to convert an anonymous account to a normal one, by passing an email address and a new password. `)
    .requiredOption("--email <email>", "User email.")
    .requiredOption("--password <password>", "User password. Must be at least 8 chars.")
    .action(actionRunner(accountUpdateEmail))

account
    .command("createJWT")
    .description(`Use this endpoint to create a JSON Web Token. You can use the resulting JWT to authenticate on behalf of the current user when working with the Appwrite server-side API and SDKs. The JWT secret is valid for 15 minutes from its creation and will be invalid if the user will logout in that time frame.`)
    .action(actionRunner(accountCreateJWT))

account
    .command("getLogs")
    .description(`Get currently logged in user list of latest security activity logs. Each log returns user IP address, location and date and time of log.`)
    .option("--limit <limit>", "Maximum number of logs to return in response. By default will return maximum 25 results. Maximum of 100 results allowed per request.")
    .option("--offset <offset>", "Offset value. The default value is 0. Use this value to manage pagination. [learn more about pagination](https://appwrite.io/docs/pagination)")
    .action(actionRunner(accountGetLogs))

account
    .command("updateName")
    .description(`Update currently logged in user account name.`)
    .requiredOption("--name <name>", "User name. Max length: 128 chars.")
    .action(actionRunner(accountUpdateName))

account
    .command("updatePassword")
    .description(`Update currently logged in user password. For validation, user is required to pass in the new password, and the old password. For users created with OAuth and Team Invites, oldPassword is optional.`)
    .requiredOption("--password <password>", "New user password. Must be at least 8 chars.")
    .option("--oldPassword <oldPassword>", "Current user password. Must be at least 8 chars.")
    .action(actionRunner(accountUpdatePassword))

account
    .command("getPrefs")
    .description(`Get currently logged in user preferences as a key-value object.`)
    .action(actionRunner(accountGetPrefs))

account
    .command("updatePrefs")
    .description(`Update currently logged in user account preferences. The object you pass is stored as is, and replaces any previous value. The maximum allowed prefs size is 64kB and throws error if exceeded.`)
    .requiredOption("--prefs <prefs>", "Prefs key-value JSON object.")
    .action(actionRunner(accountUpdatePrefs))

account
    .command("createRecovery")
    .description(`Sends the user an email with a temporary secret key for password reset. When the user clicks the confirmation link he is redirected back to your app password reset URL with the secret key and email address values attached to the URL query string. Use the query string params to submit a request to the [PUT /account/recovery](/docs/client/account#accountUpdateRecovery) endpoint to complete the process. The verification link sent to the user's email address is valid for 1 hour.`)
    .requiredOption("--email <email>", "User email.")
    .requiredOption("--url <url>", "URL to redirect the user back to your app from the recovery email. Only URLs from hostnames in your project platform list are allowed. This requirement helps to prevent an [open redirect](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html) attack against your project API.")
    .action(actionRunner(accountCreateRecovery))

account
    .command("updateRecovery")
    .description(`Use this endpoint to complete the user account password reset. Both the **userId** and **secret** arguments will be passed as query parameters to the redirect URL you have provided when sending your request to the [POST /account/recovery](/docs/client/account#accountCreateRecovery) endpoint.  Please note that in order to avoid a [Redirect Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md) the only valid redirect URLs are the ones from domains you have set when adding your platforms in the console interface.`)
    .requiredOption("--userId <userId>", "User ID.")
    .requiredOption("--secret <secret>", "Valid reset token.")
    .requiredOption("--password <password>", "New user password. Must be at least 8 chars.")
    .requiredOption("--passwordAgain <passwordAgain>", "Repeat new user password. Must be at least 8 chars.")
    .action(actionRunner(accountUpdateRecovery))

account
    .command("getSessions")
    .description(`Get currently logged in user list of active sessions across different devices.`)
    .action(actionRunner(accountGetSessions))

account
    .command("createSession")
    .description(`Allow the user to login into their account by providing a valid email and password combination. This route will create a new session for the user.`)
    .requiredOption("--email <email>", "User email.")
    .requiredOption("--password <password>", "User password. Must be at least 8 chars.")
    .action(actionRunner(accountCreateSession))

account
    .command("deleteSessions")
    .description(`Delete all sessions from the user account and remove any sessions cookies from the end client.`)
    .action(actionRunner(accountDeleteSessions))

account
    .command("createAnonymousSession")
    .description(`Use this endpoint to allow a new user to register an anonymous account in your project. This route will also create a new session for the user. To allow the new user to convert an anonymous account to a normal account, you need to update its [email and password](/docs/client/account#accountUpdateEmail) or create an [OAuth2 session](/docs/client/account#accountCreateOAuth2Session).`)
    .action(actionRunner(accountCreateAnonymousSession))

account
    .command("createMagicURLSession")
    .description(`Sends the user an email with a secret key for creating a session. When the user clicks the link in the email, the user is redirected back to the URL you provided with the secret key and userId values attached to the URL query string. Use the query string parameters to submit a request to the [PUT /account/sessions/magic-url](/docs/client/account#accountUpdateMagicURLSession) endpoint to complete the login process. The link sent to the user's email address is valid for 1 hour. If you are on a mobile device you can leave the URL parameter empty, so that the login completion will be handled by your Appwrite instance by default.`)
    .requiredOption("--userId <userId>", "Unique Id. Choose your own unique ID or pass the string `unique()` to auto generate it. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.")
    .requiredOption("--email <email>", "User email.")
    .option("--url <url>", "URL to redirect the user back to your app from the magic URL login. Only URLs from hostnames in your project platform list are allowed. This requirement helps to prevent an [open redirect](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html) attack against your project API.")
    .action(actionRunner(accountCreateMagicURLSession))

account
    .command("updateMagicURLSession")
    .description(`Use this endpoint to complete creating the session with the Magic URL. Both the **userId** and **secret** arguments will be passed as query parameters to the redirect URL you have provided when sending your request to the [POST /account/sessions/magic-url](/docs/client/account#accountCreateMagicURLSession) endpoint.  Please note that in order to avoid a [Redirect Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md) the only valid redirect URLs are the ones from domains you have set when adding your platforms in the console interface.`)
    .requiredOption("--userId <userId>", "User ID.")
    .requiredOption("--secret <secret>", "Valid verification token.")
    .action(actionRunner(accountUpdateMagicURLSession))

account
    .command("createOAuth2Session")
    .description(`Allow the user to login to their account using the OAuth2 provider of their choice. Each OAuth2 provider should be enabled from the Appwrite console first. Use the success and failure arguments to provide a redirect URL's back to your app when login is completed.  If there is already an active session, the new session will be attached to the logged-in account. If there are no active sessions, the server will attempt to look for a user with the same email address as the email received from the OAuth2 provider and attach the new session to the existing user. If no matching user is found - the server will create a new user.. `)
    .requiredOption("--provider <provider>", "OAuth2 Provider. Currently, supported providers are: amazon, apple, bitbucket, bitly, box, discord, dropbox, facebook, github, gitlab, google, linkedin, microsoft, paypal, paypalSandbox, salesforce, slack, spotify, tradeshift, tradeshiftBox, twitch, vk, yahoo, yammer, yandex, wordpress.")
    .option("--success <success>", "URL to redirect back to your app after a successful login attempt.  Only URLs from hostnames in your project platform list are allowed. This requirement helps to prevent an [open redirect](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html) attack against your project API.")
    .option("--failure <failure>", "URL to redirect back to your app after a failed login attempt.  Only URLs from hostnames in your project platform list are allowed. This requirement helps to prevent an [open redirect](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html) attack against your project API.")
    .option("--scopes <scopes...>", "A list of custom OAuth2 scopes. Check each provider internal docs for a list of supported scopes.")
    .action(actionRunner(accountCreateOAuth2Session))

account
    .command("getSession")
    .description(`Use this endpoint to get a logged in user's session using a Session ID. Inputting 'current' will return the current session being used.`)
    .requiredOption("--sessionId <sessionId>", "Session ID. Use the string 'current' to get the current device session.")
    .action(actionRunner(accountGetSession))

account
    .command("deleteSession")
    .description(`Use this endpoint to log out the currently logged in user from all their account sessions across all of their different devices. When using the option id argument, only the session unique ID provider will be deleted.`)
    .requiredOption("--sessionId <sessionId>", "Session ID. Use the string 'current' to delete the current device session.")
    .action(actionRunner(accountDeleteSession))

account
    .command("createVerification")
    .description(`Use this endpoint to send a verification message to your user email address to confirm they are the valid owners of that address. Both the **userId** and **secret** arguments will be passed as query parameters to the URL you have provided to be attached to the verification email. The provided URL should redirect the user back to your app and allow you to complete the verification process by verifying both the **userId** and **secret** parameters. Learn more about how to [complete the verification process](/docs/client/account#accountUpdateVerification). The verification link sent to the user's email address is valid for 7 days.  Please note that in order to avoid a [Redirect Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md), the only valid redirect URLs are the ones from domains you have set when adding your platforms in the console interface. `)
    .requiredOption("--url <url>", "URL to redirect the user back to your app from the verification email. Only URLs from hostnames in your project platform list are allowed. This requirement helps to prevent an [open redirect](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html) attack against your project API.")
    .action(actionRunner(accountCreateVerification))

account
    .command("updateVerification")
    .description(`Use this endpoint to complete the user email verification process. Use both the **userId** and **secret** parameters that were attached to your app URL to verify the user email ownership. If confirmed this route will return a 200 status code.`)
    .requiredOption("--userId <userId>", "User ID.")
    .requiredOption("--secret <secret>", "Valid verification token.")
    .action(actionRunner(accountUpdateVerification))


module.exports = {
    account,
    accountGet,
    accountCreate,
    accountDelete,
    accountUpdateEmail,
    accountCreateJWT,
    accountGetLogs,
    accountUpdateName,
    accountUpdatePassword,
    accountGetPrefs,
    accountUpdatePrefs,
    accountCreateRecovery,
    accountUpdateRecovery,
    accountGetSessions,
    accountCreateSession,
    accountDeleteSessions,
    accountCreateAnonymousSession,
    accountCreateMagicURLSession,
    accountUpdateMagicURLSession,
    accountCreateOAuth2Session,
    accountGetSession,
    accountDeleteSession,
    accountCreateVerification,
    accountUpdateVerification
};