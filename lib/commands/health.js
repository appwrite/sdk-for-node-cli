const fs = require('fs');
const childProcess = require('child_process');
const { Command } = require('commander');
const { sdkForProject, sdkForConsole } = require('../sdks')
const { parse, actionRunner, parseInteger, parseBool, commandDescriptions, success } = require('../parser')
const { localConfig, globalConfig } = require("../config");

const health = new Command("health").description(commandDescriptions['health'])

const healthGet = async ({ parseOutput = true, sdk = undefined, json }) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/health';
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

const healthGetAntivirus = async ({ parseOutput = true, sdk = undefined, json }) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/health/anti-virus';
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

const healthGetCache = async ({ parseOutput = true, sdk = undefined, json }) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/health/cache';
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

const healthGetDB = async ({ parseOutput = true, sdk = undefined, json }) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/health/db';
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

const healthGetQueueCertificates = async ({ parseOutput = true, sdk = undefined, json }) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/health/queue/certificates';
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

const healthGetQueueFunctions = async ({ parseOutput = true, sdk = undefined, json }) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/health/queue/functions';
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

const healthGetQueueLogs = async ({ parseOutput = true, sdk = undefined, json }) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/health/queue/logs';
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

const healthGetQueueUsage = async ({ parseOutput = true, sdk = undefined, json }) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/health/queue/usage';
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

const healthGetQueueWebhooks = async ({ parseOutput = true, sdk = undefined, json }) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/health/queue/webhooks';
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

const healthGetStorageLocal = async ({ parseOutput = true, sdk = undefined, json }) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/health/storage/local';
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

const healthGetTime = async ({ parseOutput = true, sdk = undefined, json }) => {

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/health/time';
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


health
    .command(`get`)
    .description(`Check the Appwrite HTTP server is up and responsive.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(healthGet))

health
    .command(`getAntivirus`)
    .description(`Check the Appwrite Antivirus server is up and connection is successful.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(healthGetAntivirus))

health
    .command(`getCache`)
    .description(`Check the Appwrite in-memory cache server is up and connection is successful.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(healthGetCache))

health
    .command(`getDB`)
    .description(`Check the Appwrite database server is up and connection is successful.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(healthGetDB))

health
    .command(`getQueueCertificates`)
    .description(`Get the number of certificates that are waiting to be issued against [Letsencrypt](https://letsencrypt.org/) in the Appwrite internal queue server.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(healthGetQueueCertificates))

health
    .command(`getQueueFunctions`)
    .description(``)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(healthGetQueueFunctions))

health
    .command(`getQueueLogs`)
    .description(`Get the number of logs that are waiting to be processed in the Appwrite internal queue server.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(healthGetQueueLogs))

health
    .command(`getQueueUsage`)
    .description(`Get the number of usage stats that are waiting to be processed in the Appwrite internal queue server.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(healthGetQueueUsage))

health
    .command(`getQueueWebhooks`)
    .description(`Get the number of webhooks that are waiting to be processed in the Appwrite internal queue server.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(healthGetQueueWebhooks))

health
    .command(`getStorageLocal`)
    .description(`Check the Appwrite local storage device is up and connection is successful.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(healthGetStorageLocal))

health
    .command(`getTime`)
    .description(`Check the Appwrite server time is synced with Google remote NTP server. We use this technology to smoothly handle leap seconds with no disruptive events. The [Network Time Protocol](https://en.wikipedia.org/wiki/Network_Time_Protocol) (NTP) is used by hundreds of millions of computers and devices to synchronize their clocks over the Internet. If your computer sets its own clock, it likely uses NTP.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(healthGetTime))


module.exports = {
    health,
    healthGet,
    healthGetAntivirus,
    healthGetCache,
    healthGetDB,
    healthGetQueueCertificates,
    healthGetQueueFunctions,
    healthGetQueueLogs,
    healthGetQueueUsage,
    healthGetQueueWebhooks,
    healthGetStorageLocal,
    healthGetTime
};