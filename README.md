# Loopback/React boilerplate
A Loopback/React.js boilerplate to help you get started with your project.

Note: **This repository is going through heavy development currently and should not be used in production unless you know what you are doing**
##Features
* The client has both admin and client ends
* The Admin part has user mangament done including: users managment, roles management, role mapping
* Multilingual interface using 'react-intl' package
* Notifications using 'react-notification-system' package
* Plus other stuff

## Installation
First clone the repository

`git clone https://github.com/shalkam/lb-react.git`

Then change directory and install loopback dependencies:

`cd lb-react && npm install`

and change directory to client and install client dependencies:

`cd client && npm install`

##Running the project for developing
To do so use this command when you are in the project root folder

`npm run dev`

This command runs both the loopback package using nodemon and the client package using webpack

Note: you will need to reload the page manually when you make a change in the client side

##Building the project
To do so use this command when you are in the project root folder

`npm run build-client`

This will build the client side javascript for production

##Contributing
Feel free to submit a new issue [here](https://github.com/shalkam/lb-react/issues)

or create a new  PR [here](https://github.com/shalkam/lb-react/pulls)
