const fs = require('fs');
const childProcess = require('child_process');
const { Command } = require('commander');
const { sdkForProject, sdkForConsole } = require('../sdks')
const { parse, actionRunner, parseInteger, parseBool, commandDescriptions, success } = require('../parser')
const { localConfig, globalConfig } = require("../config");

const avatars = new Command("avatars").description(commandDescriptions['avatars'])

const avatarsGetBrowser = async ({ code, width, height, quality, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} code */
    /* @param {number} width */
    /* @param {number} height */
    /* @param {number} quality */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/avatars/browsers/{code}'.replace('{code}', code);
    let payload = {};

    /** Query Params */
    if (typeof width !== 'undefined') {
        payload['width'] = width;
    }
    if (typeof height !== 'undefined') {
        payload['height'] = height;
    }
    if (typeof quality !== 'undefined') {
        payload['quality'] = quality;
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

const avatarsGetCreditCard = async ({ code, width, height, quality, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} code */
    /* @param {number} width */
    /* @param {number} height */
    /* @param {number} quality */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/avatars/credit-cards/{code}'.replace('{code}', code);
    let payload = {};

    /** Query Params */
    if (typeof width !== 'undefined') {
        payload['width'] = width;
    }
    if (typeof height !== 'undefined') {
        payload['height'] = height;
    }
    if (typeof quality !== 'undefined') {
        payload['quality'] = quality;
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

const avatarsGetFavicon = async ({ url, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} url */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/avatars/favicon';
    let payload = {};

    /** Query Params */
    if (typeof url !== 'undefined') {
        payload['url'] = url;
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

const avatarsGetFlag = async ({ code, width, height, quality, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} code */
    /* @param {number} width */
    /* @param {number} height */
    /* @param {number} quality */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/avatars/flags/{code}'.replace('{code}', code);
    let payload = {};

    /** Query Params */
    if (typeof width !== 'undefined') {
        payload['width'] = width;
    }
    if (typeof height !== 'undefined') {
        payload['height'] = height;
    }
    if (typeof quality !== 'undefined') {
        payload['quality'] = quality;
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

const avatarsGetImage = async ({ url, width, height, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} url */
    /* @param {number} width */
    /* @param {number} height */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/avatars/image';
    let payload = {};

    /** Query Params */
    if (typeof url !== 'undefined') {
        payload['url'] = url;
    }
    if (typeof width !== 'undefined') {
        payload['width'] = width;
    }
    if (typeof height !== 'undefined') {
        payload['height'] = height;
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

const avatarsGetInitials = async ({ name, width, height, color, background, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} name */
    /* @param {number} width */
    /* @param {number} height */
    /* @param {string} color */
    /* @param {string} background */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/avatars/initials';
    let payload = {};

    /** Query Params */
    if (typeof name !== 'undefined') {
        payload['name'] = name;
    }
    if (typeof width !== 'undefined') {
        payload['width'] = width;
    }
    if (typeof height !== 'undefined') {
        payload['height'] = height;
    }
    if (typeof color !== 'undefined') {
        payload['color'] = color;
    }
    if (typeof background !== 'undefined') {
        payload['background'] = background;
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

const avatarsGetQR = async ({ text, size, margin, download, parseOutput = true, sdk = undefined, json }) => {
    /* @param {string} text */
    /* @param {number} size */
    /* @param {number} margin */
    /* @param {boolean} download */

    let client = !sdk ? await sdkForProject() : sdk;
    let path = '/avatars/qr';
    let payload = {};

    /** Query Params */
    if (typeof text !== 'undefined') {
        payload['text'] = text;
    }
    if (typeof size !== 'undefined') {
        payload['size'] = size;
    }
    if (typeof margin !== 'undefined') {
        payload['margin'] = margin;
    }
    if (typeof download !== 'undefined') {
        payload['download'] = download;
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


avatars
    .command(`getBrowser`)
    .description(`You can use this endpoint to show different browser icons to your users. The code argument receives the browser code as it appears in your user /account/sessions endpoint. Use width, height and quality arguments to change the output settings.`)
    .requiredOption(`--code <code>`, `Browser Code.`)
    .option(`--width <width>`, `Image width. Pass an integer between 0 to 2000. Defaults to 100.`, parseInteger)
    .option(`--height <height>`, `Image height. Pass an integer between 0 to 2000. Defaults to 100.`, parseInteger)
    .option(`--quality <quality>`, `Image quality. Pass an integer between 0 to 100. Defaults to 100.`, parseInteger)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(avatarsGetBrowser))

avatars
    .command(`getCreditCard`)
    .description(`The credit card endpoint will return you the icon of the credit card provider you need. Use width, height and quality arguments to change the output settings.`)
    .requiredOption(`--code <code>`, `Credit Card Code. Possible values: amex, argencard, cabal, censosud, diners, discover, elo, hipercard, jcb, mastercard, naranja, targeta-shopping, union-china-pay, visa, mir, maestro.`)
    .option(`--width <width>`, `Image width. Pass an integer between 0 to 2000. Defaults to 100.`, parseInteger)
    .option(`--height <height>`, `Image height. Pass an integer between 0 to 2000. Defaults to 100.`, parseInteger)
    .option(`--quality <quality>`, `Image quality. Pass an integer between 0 to 100. Defaults to 100.`, parseInteger)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(avatarsGetCreditCard))

avatars
    .command(`getFavicon`)
    .description(`Use this endpoint to fetch the favorite icon (AKA favicon) of any remote website URL. `)
    .requiredOption(`--url <url>`, `Website URL which you want to fetch the favicon from.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(avatarsGetFavicon))

avatars
    .command(`getFlag`)
    .description(`You can use this endpoint to show different country flags icons to your users. The code argument receives the 2 letter country code. Use width, height and quality arguments to change the output settings.`)
    .requiredOption(`--code <code>`, `Country Code. ISO Alpha-2 country code format.`)
    .option(`--width <width>`, `Image width. Pass an integer between 0 to 2000. Defaults to 100.`, parseInteger)
    .option(`--height <height>`, `Image height. Pass an integer between 0 to 2000. Defaults to 100.`, parseInteger)
    .option(`--quality <quality>`, `Image quality. Pass an integer between 0 to 100. Defaults to 100.`, parseInteger)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(avatarsGetFlag))

avatars
    .command(`getImage`)
    .description(`Use this endpoint to fetch a remote image URL and crop it to any image size you want. This endpoint is very useful if you need to crop and display remote images in your app or in case you want to make sure a 3rd party image is properly served using a TLS protocol.`)
    .requiredOption(`--url <url>`, `Image URL which you want to crop.`)
    .option(`--width <width>`, `Resize preview image width, Pass an integer between 0 to 2000.`, parseInteger)
    .option(`--height <height>`, `Resize preview image height, Pass an integer between 0 to 2000.`, parseInteger)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(avatarsGetImage))

avatars
    .command(`getInitials`)
    .description(`Use this endpoint to show your user initials avatar icon on your website or app. By default, this route will try to print your logged-in user name or email initials. You can also overwrite the user name if you pass the 'name' parameter. If no name is given and no user is logged, an empty avatar will be returned.  You can use the color and background params to change the avatar colors. By default, a random theme will be selected. The random theme will persist for the user's initials when reloading the same theme will always return for the same initials.`)
    .option(`--name <name>`, `Full Name. When empty, current user name or email will be used. Max length: 128 chars.`)
    .option(`--width <width>`, `Image width. Pass an integer between 0 to 2000. Defaults to 100.`, parseInteger)
    .option(`--height <height>`, `Image height. Pass an integer between 0 to 2000. Defaults to 100.`, parseInteger)
    .option(`--color <color>`, `Changes text color. By default a random color will be picked and stay will persistent to the given name.`)
    .option(`--background <background>`, `Changes background color. By default a random color will be picked and stay will persistent to the given name.`)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(avatarsGetInitials))

avatars
    .command(`getQR`)
    .description(`Converts a given plain text to a QR code image. You can use the query parameters to change the size and style of the resulting image.`)
    .requiredOption(`--text <text>`, `Plain text to be converted to QR code image.`)
    .option(`--size <size>`, `QR code size. Pass an integer between 0 to 1000. Defaults to 400.`, parseInteger)
    .option(`--margin <margin>`, `Margin from edge. Pass an integer between 0 to 10. Defaults to 1.`, parseInteger)
    .option(`--download <download>`, `Return resulting image with 'Content-Disposition: attachment ' headers for the browser to start downloading it. Pass 0 for no header, or 1 for otherwise. Default value is set to 0.`, parseBool)
    .option(`--json`, `Output in JSON format`)
    .action(actionRunner(avatarsGetQR))


module.exports = {
    avatars,
    avatarsGetBrowser,
    avatarsGetCreditCard,
    avatarsGetFavicon,
    avatarsGetFlag,
    avatarsGetImage,
    avatarsGetInitials,
    avatarsGetQR
};