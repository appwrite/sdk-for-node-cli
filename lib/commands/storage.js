const fs = require('fs');
const _path = require('path');
const childProcess = require('child_process');
const { Command } = require('commander');
const { sdkForProject, sdkForConsole } = require('../sdks')
const { parse, actionRunner, parseInteger, parseBool, commandDescriptions, success } = require('../parser')
const { localConfig, globalConfig } = require("../config");

const storage = new Command("storage").description(commandDescriptions['storage'])

const storageListFiles = async ({ search, limit, offset, cursor, cursorDirection, orderType, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} search */
    /* @param {number} limit */
    /* @param {number} offset */
    /* @param {string} cursor */
    /* @param {string} cursorDirection */
    /* @param {string} orderType */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/storage/files';
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

const storageCreateFile = async ({ fileId, file, read, write, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} fileId */
    /* @param {File} file */
    /* @param {string[]} read */
    /* @param {string[]} write */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/storage/files';
    let payload = {};
    
    /** Body Params */
    if (typeof fileId !== 'undefined') {
        payload['fileId'] = fileId;
    }

    let filePath = fs.realpathSync(file);
    if (typeof filePath !== 'undefined') {
        payload['file'] = fs.createReadStream(filePath);
    }

    if (typeof read !== 'undefined') {
        payload['read'] = read;
    }

    if (typeof write !== 'undefined') {
        payload['write'] = write;
    }

    const response = await client.call('post', path, {
        'content-type': 'multipart/form-data',
    }, payload);
    
    if (parseOutput) {
        parse(response, json)
        success()
    }
    return response;
}

const storageGetFile = async ({ fileId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} fileId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/storage/files/{fileId}'.replace('{fileId}', fileId);
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

const storageUpdateFile = async ({ fileId, read, write, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} fileId */
    /* @param {string[]} read */
    /* @param {string[]} write */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/storage/files/{fileId}'.replace('{fileId}', fileId);
    let payload = {};
    
    /** Body Params */
    if (typeof read !== 'undefined') {
        payload['read'] = read;
    }

    if (typeof write !== 'undefined') {
        payload['write'] = write;
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

const storageDeleteFile = async ({ fileId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} fileId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/storage/files/{fileId}'.replace('{fileId}', fileId);
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

const storageGetFileDownload = async ({ fileId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} fileId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/storage/files/{fileId}/download'.replace('{fileId}', fileId);
    let payload = {};
    payload['project'] = localConfig.getProject().projectId
    payload['key'] = globalConfig.getKey();
    const queryParams = new URLSearchParams(payload);
    path = `${globalConfig.getEndpoint()}${path}?${queryParams.toString()}`;
    if (parseOutput) { 
        parse(path, json)
        success()
    }
}

const storageGetFilePreview = async ({ fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} fileId */
    /* @param {number} width */
    /* @param {number} height */
    /* @param {string} gravity */
    /* @param {number} quality */
    /* @param {number} borderWidth */
    /* @param {string} borderColor */
    /* @param {number} borderRadius */
    /* @param {number} opacity */
    /* @param {number} rotation */
    /* @param {string} background */
    /* @param {string} output */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/storage/files/{fileId}/preview'.replace('{fileId}', fileId);
    let payload = {};

    /** Query Params */
    if (typeof width !== 'undefined') {
        payload['width'] = width;
    }
    if (typeof height !== 'undefined') {
        payload['height'] = height;
    }
    if (typeof gravity !== 'undefined') {
        payload['gravity'] = gravity;
    }
    if (typeof quality !== 'undefined') {
        payload['quality'] = quality;
    }
    if (typeof borderWidth !== 'undefined') {
        payload['borderWidth'] = borderWidth;
    }
    if (typeof borderColor !== 'undefined') {
        payload['borderColor'] = borderColor;
    }
    if (typeof borderRadius !== 'undefined') {
        payload['borderRadius'] = borderRadius;
    }
    if (typeof opacity !== 'undefined') {
        payload['opacity'] = opacity;
    }
    if (typeof rotation !== 'undefined') {
        payload['rotation'] = rotation;
    }
    if (typeof background !== 'undefined') {
        payload['background'] = background;
    }
    if (typeof output !== 'undefined') {
        payload['output'] = output;
    }
    payload['project'] = localConfig.getProject().projectId
    payload['key'] = globalConfig.getKey();
    const queryParams = new URLSearchParams(payload);
    path = `${globalConfig.getEndpoint()}${path}?${queryParams.toString()}`;
    if (parseOutput) { 
        parse(path, json)
        success()
    }
}

const storageGetFileView = async ({ fileId, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} fileId */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/storage/files/{fileId}/view'.replace('{fileId}', fileId);
    let payload = {};
    payload['project'] = localConfig.getProject().projectId
    payload['key'] = globalConfig.getKey();
    const queryParams = new URLSearchParams(payload);
    path = `${globalConfig.getEndpoint()}${path}?${queryParams.toString()}`;
    if (parseOutput) { 
        parse(path, json)
        success()
    }
}

const storageGetUsage = async ({ range, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} range */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/storage/usage';
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

const storageGetBucketUsage = async ({ bucketId, range, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} bucketId */
    /* @param {string} range */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/storage/{bucketId}/usage'.replace('{bucketId}', bucketId);
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


storage
    .command("listFiles")
    .description(`Get a list of all the user files. You can use the query params to filter your results. On admin mode, this endpoint will return a list of all of the project's files. [Learn more about different API modes](/docs/admin).`)
    .option("--search <search>", "Search term to filter your list results. Max length: 256 chars.")
    .option("--limit <limit>", "Maximum number of files to return in response. By default will return maximum 25 results. Maximum of 100 results allowed per request.", parseInteger)
    .option("--offset <offset>", "Offset value. The default value is 0. Use this param to manage pagination. [learn more about pagination](https://appwrite.io/docs/pagination)", parseInteger)
    .option("--cursor <cursor>", "ID of the file used as the starting point for the query, excluding the file itself. Should be used for efficient pagination when working with large sets of data. [learn more about pagination](https://appwrite.io/docs/pagination)")
    .option("--cursorDirection <cursorDirection>", "Direction of the cursor.")
    .option("--orderType <orderType>", "Order result by ASC or DESC order.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(storageListFiles))

storage
    .command("createFile")
    .description(`Create a new file. The user who creates the file will automatically be assigned to read and write access unless he has passed custom values for read and write arguments.`)
    .requiredOption("--fileId <fileId>", "File ID. Choose your own unique ID or pass the string `unique()` to auto generate it. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.")
    .requiredOption("--file <file>", "Binary file.")
    .option("--read <read...>", "An array of strings with read permissions. By default only the current user is granted with read permissions. [learn more about permissions](https://appwrite.io/docs/permissions) and get a full list of available permissions.")
    .option("--write <write...>", "An array of strings with write permissions. By default only the current user is granted with write permissions. [learn more about permissions](https://appwrite.io/docs/permissions) and get a full list of available permissions.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(storageCreateFile))

storage
    .command("getFile")
    .description(`Get a file by its unique ID. This endpoint response returns a JSON object with the file metadata.`)
    .requiredOption("--fileId <fileId>", "File ID.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(storageGetFile))

storage
    .command("updateFile")
    .description(`Update a file by its unique ID. Only users with write permissions have access to update this resource.`)
    .requiredOption("--fileId <fileId>", "File ID.")
    .requiredOption("--read <read...>", "An array of strings with read permissions. By default no user is granted with any read permissions. [learn more about permissions](https://appwrite.io/docs/permissions) and get a full list of available permissions.")
    .requiredOption("--write <write...>", "An array of strings with write permissions. By default no user is granted with any write permissions. [learn more about permissions](https://appwrite.io/docs/permissions) and get a full list of available permissions.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(storageUpdateFile))

storage
    .command("deleteFile")
    .description(`Delete a file by its unique ID. Only users with write permissions have access to delete this resource.`)
    .requiredOption("--fileId <fileId>", "File ID.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(storageDeleteFile))

storage
    .command("getFileDownload")
    .description(`Get a file content by its unique ID. The endpoint response return with a 'Content-Disposition: attachment' header that tells the browser to start downloading the file to user downloads directory.`)
    .requiredOption("--fileId <fileId>", "File ID.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(storageGetFileDownload))

storage
    .command("getFilePreview")
    .description(`Get a file preview image. Currently, this method supports preview for image files (jpg, png, and gif), other supported formats, like pdf, docs, slides, and spreadsheets, will return the file icon image. You can also pass query string arguments for cutting and resizing your preview image.`)
    .requiredOption("--fileId <fileId>", "File ID.")
    .option("--width <width>", "Resize preview image width, Pass an integer between 0 to 4000.", parseInteger)
    .option("--height <height>", "Resize preview image height, Pass an integer between 0 to 4000.", parseInteger)
    .option("--gravity <gravity>", "Image crop gravity. Can be one of center,top-left,top,top-right,left,right,bottom-left,bottom,bottom-right")
    .option("--quality <quality>", "Preview image quality. Pass an integer between 0 to 100. Defaults to 100.", parseInteger)
    .option("--borderWidth <borderWidth>", "Preview image border in pixels. Pass an integer between 0 to 100. Defaults to 0.", parseInteger)
    .option("--borderColor <borderColor>", "Preview image border color. Use a valid HEX color, no # is needed for prefix.")
    .option("--borderRadius <borderRadius>", "Preview image border radius in pixels. Pass an integer between 0 to 4000.", parseInteger)
    .option("--opacity <opacity>", "Preview image opacity. Only works with images having an alpha channel (like png). Pass a number between 0 to 1.", parseInteger)
    .option("--rotation <rotation>", "Preview image rotation in degrees. Pass an integer between -360 and 360.", parseInteger)
    .option("--background <background>", "Preview image background color. Only works with transparent images (png). Use a valid HEX color, no # is needed for prefix.")
    .option("--output <output>", "Output format type (jpeg, jpg, png, gif and webp).")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(storageGetFilePreview))

storage
    .command("getFileView")
    .description(`Get a file content by its unique ID. This endpoint is similar to the download method but returns with no  'Content-Disposition: attachment' header.`)
    .requiredOption("--fileId <fileId>", "File ID.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(storageGetFileView))

storage
    .command("getUsage")
    .description(``)
    .option("--range <range>", "Date range.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(storageGetUsage))

storage
    .command("getBucketUsage")
    .description(``)
    .requiredOption("--bucketId <bucketId>", "Bucket ID.")
    .option("--range <range>", "Date range.")
    .option('--json', 'Output in JSON format')
    .action(actionRunner(storageGetBucketUsage))


module.exports = {
    storage,
    storageListFiles,
    storageCreateFile,
    storageGetFile,
    storageUpdateFile,
    storageDeleteFile,
    storageGetFileDownload,
    storageGetFilePreview,
    storageGetFileView,
    storageGetUsage,
    storageGetBucketUsage
};