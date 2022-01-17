# Appwrite NAME SDK

![License](https://img.shields.io/github/license/repoowner/reponame.svg?style=flat-square)
![Version](https://img.shields.io/badge/api%20version-0.12.1-blue.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/com/appwrite/sdk-generator?style=flat-square)](https://travis-ci.com/appwrite/sdk-generator)
[![Twitter Account](https://img.shields.io/twitter/follow/appwrite_io?color=00acee&label=twitter&style=flat-square)](https://twitter.com/appwrite_io)
[![Discord](https://img.shields.io/discord/564160730845151244?label=discord&style=flat-square)](https://appwrite.io/discord)

**WORK IN PROGRESS - NOT READY FOR USAGE**

Repo description goes here

![Appwrite](https://appwrite.io/v1/images/console.png)

## Installation

The Appwrite CLI is a Node based command line tool to help you interact with the Appwrite API. The CLI is distributed both as an [`npm package`](https://www.npmjs.com/package/appwrite-cli) as well as [pre built binaries](https://github.com/christyjacob4/appwrite-node-cli/releases/latest) for specific operating systems and architectures.

### Install using NPM
---

If you have `npm` installed, it's as easy as running

```sh
$ npm install -g appwrite-cli
```

Once the installation is complete, you can verify the install using

```sh
$ appwrite -v
0.0.11
```

### Install prebuilt binaries
---

If you do not have `npm` installed, you can always install the prebuilt binaries for your architecture and OS using our convenient installation scripts.

### Linux / MacOS 
```bash
$ wget -q https://appwrite.io/cli/install.sh  -O - | /bin/bash
```

### Windows
```powershell
$ iwr -useb https://appwrite.io/cli/install.ps1 | iex
```

Once the installation completes, you can verify your install using
```
$ appwrite -v
0.0.11
```

## Getting Started 

Before you can use the CLI, you need to login to your Appwrite account. 

```sh
$ appwrite login

? Enter your email test@test.com
? Enter your password ********
✓ Success 
```
This will also prompt you to enter your appwrite endpoint ( default: http://localhost/v1 ) 

* ### Initialising your project
Once logged in, the CLI needs to be initialised before you can use it with your Appwrite project. You can do this with the `appwrite init project` command. 

```sh
$ appwrite init project
```

The following prompt will guide you through the setup process. The `init` command also creates an `appwrite.json` file representing your Appwrite project.

The `appwrite.json` file does a lot of things. 
* Provides context to the CLI
* Keeps track of all your cloud functions
* Keeps track of all your project's collections
* Helps you deploy your Appwrite project to production and more..

You can also fetch all the collections in your current project using
```sh
appwrite init collection
```

The CLI also comes with a convenient `--all` flag to perform both these steps at once using

```sh
appwrite init --all
```

* ### Creating and deploying cloud functions

The CLI makes it extremely easy to create and deploy Appwrite's cloud functions. Initialise your new function using

```
$ appwrite init function
? What would you like to name your function? My Awesome Function
? What runtime would you like to use? Node.js (node-15.5)
✓ Success 
```

This will create a new function `My Awesome Function` in your current Appwrite project and also create a template function for you to get started.

```sh
$ tree My\ Awesome\ Function 

My Awesome Function
├── README.md
├── index.js
├── package-lock.json
└── package.json

0 directories, 4 files
```

You can now deploy this function using 

```sh
$ appwrite deploy function

? Which functions would you like to deploy? My Awesome Function (61d1a4c81dfcd95bc834)
ℹ Info Deploying function My Awesome Function ( 61d1a4c81dfcd95bc834 )
? Enter the entrypoint command node index.js
✓ Success Deployed My Awesome Function ( 61d1a4c81dfcd95bc834 )
```

Your function is now ready to be executed on your Appwrite server!

* ### Deploying Collections

Similarly, you can deploy all your collections to your Appwrite server using 

```sh
appwrite deploy collections
```

The `deploy` command also comes with a convenient `--all` flag to deploy all your functions and collections at once.

```sh
appwrite deploy --all
``` 

> ### Note
> By default, requests to domains with self signed SSL certificates (or no certificates) are disabled. If you trust the domain, you can bypass the certificate validation using
```sh
$ appwrite client --selfSigned true
```

## Usage 

The Appwrite CLI follows the following general syntax.
```sh
$ appwrite [COMMAND] --[OPTIONS]
```

A few sample commands to get you started 

```sh
$ appwrite users create --userId "unique()" --email hello@appwrite.io --password very_strong_password
$ appwrite users list 
```

To create a document you can use the following command 
```sh
$ appwrite database createDocument --collectionId <ID> --documentId 'unique()' --data '{ "Name": "Iron Man" }' --read role:all team:abc
```

### Some Gotchas
- `data` must be a valid JSON string where each key and value are enclosed in double quotes `"` like the example above.
- Some arguments like the `read` and `write` permissions are expected to be arrays. In the Appwrite CLI, array values are passed in using space as a separator like in the example above.


To get information about the different services available, you can use 
```sh
$ appwrite -h
```

To get information about a particular service and the commands available in a service you can use 
```sh
$ appwrite users // or
$ apwrite users --help // or
$ appwrite users help // or
$ appwrite accounts
```

To get information about a particular command and the parameters it accepts, you can use

```sh
$ appwrite users list --help
$ appwrite account get --help 
```

## License

Please see the [BSD-3-Clause license](https://raw.githubusercontent.com/appwrite/appwrite/master/LICENSE) file for more information.