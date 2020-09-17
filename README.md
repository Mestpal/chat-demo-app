# chat-demo-app

## Project description

It is a Vanilla JS SPA, to test if it is possible to do in pure JS some functions that we are used to use via frameworks.

## Getting started

First, you will need to have installed [node](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) in your machine. You can check if you have them installed, via these terminal command:

```bash
 // If you have them it will return their version
 node -v
 npm --v
```

After this clone the repo in your machine and navigate to that folder. In this folder you need to install all the dependencies this repo needs, for that use the following command:

```bash
 npm install
```
After this repo will be ready to run.

## Launch the app

To run the app in dev mode you just need to run the following command:

```bash
 npm run dev
```

This command will launch the app in your http://localhost:8080/ and you will be able to see what the app does

## Check the tests

To see the results of the test done for this app, execute the following in your terminal:

```bash
 npm run test
```

## Build the app

If you need a deliverable to load it in a production environment you can do it with this command:

```bash
 npm run build
```
The files needed for this will be available in the ***/dist*** folder that this command creates in the folder where you cloned the repo.

## Functions available in chat-demo-app

### Launch app
- The apps opens in the profile page

### Profile page
- When you click in the "add as friend" button the background of the page and the button changes. Click again and it will return to the original
- Click in the profile image to go Chat page
- The friend status when you click the "add as friend" button is not losed when you navigate in the app or reload the page

### Chat page

- When you enter the chat page "your friend" will send you a random message
- You can send your friend all the messages you want :)
- Click in the return button on in the image of your friend will send you to the profile page.
- The chat conversation is maintained even if you navigate or reload the app

## Things to do when I have more time
- Improve the styles and designs of the app
- Make more unit test in jest
- Do e2e test with [cypress](https://www.cypress.io/)
- Refactor the code to improve the quality of the code
- Try to clean the localStorage when the chat app tab is closed