# FULL-STACK CHAT APP with ReactJS + Firebase + Firestore

<img src="https://github.com/michal9108/superchat/blob/3172b235af368d2748f7a01f39c65b3f1fa63481/Superchat.jpg" width="100%" height="100%"/> 

Single room Chat Room, user must be logged-in with google account, each message is a document in firestore database - contains the userId, timestamp and the text/message.

Secure, flexible scales infinitely in the cloud - Blaze (Pay-as-you-go) plan is neccesary to complete the deployment on Firebase.  

Authentification of users through Firebase - User Auth - Sign in with Google Account.

Realtime Data Streams and Firestore using React. 

We make te Querry to the database with the most recent messages.

REALTIME SYNC Whenever the data changes on the Backend the react app will update with the the most recent messages on FE.


## Requirements

Before using this project, you will need to have installed [Node.js](https://nodejs.org/en/), npm and [git](https://git-scm.com/) or [yarn](https://yarnpkg.com/). 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage and dependencies

```
$ git clone https://github.com/michal9108/superchat.git
$ cd superchat.git
$ npm install firebase react-firebase-hooks or yarn install firebase react-firebase-hooks
$ yarn run dev
```

The application will be listening on port 3000. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Build Setup

```
# install dependencies
$ npm install firebase react-firebase-hooks or yarn install firebase react-firebase-hooks

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch/deploy on Firebase server
$ firebase login
$ yarn run build
$ firebase init

Choose `build` as a public dir
```

## Firebase
 
1.Create project at Firebase database

2.At Firebase choose `Authentication` and Enable `Google Sign-In method`.

3.Add a new `Web App` to the project.

If the user will Sign-In - It will show the Chatroom otherwise App will show the button to Sign-In with Google.
Knowing if the user is Logged-In - with useState hook - function Sign-In and Sing Out

## Firestore 

In Firestore Database > Cloud Firestore > Data > Start a `New collection` called  `messages`.
If user add message, it will create document in the collection with the `timestamp` and the `user-Id`.
  
We make a reference called `firestore.collection`

It responds to many updates, it will be shown in React UI

When the chat messages are displayed, we want to distinguish between messages that are send and messages that are going to be received. To achieve that we compare the `user-id` in firestore document to the `currently-logged-in` user, if the are equal we now that `currentuser` sent the message - Conditional.

Applying different styling whether or not the message were sent or received.


## !!! Only avalaible on Firebase [Blaze plan - Pay as you go](https://firebase.google.com/pricing) - Unavalaible for this project !!!

## Security 

In the Firebase for the SECURITY RULES is written .js like syntax that woud be otherwise needed to implement on Back-end server. We can modify our rules on Firebase console.

Matching the path to the messages collection in the database.

USER MUST BE SIGNED-IN
When user wants to read the document we want to make sure that he/she is Logged-In into their account.
        
`allow read, write: if request.auth.uid != null;`

When the user is signed-in we want to make sure that they can only create the documents with they're `userId` and they are not banned for whatever reason - function `canCreateMessage()` 

Making sure they are Logged-In:
`let isSignedIn = request.auth.uid != null;` 

Making sure that the `request.auth.uid` is matching the `user-id (request.resource.data.uid)` on the document they are trying to create
`let isOwner = request.auth.uid == request.resource.data.uid;` 

Banned collection for bad, bad & evil Users - if your `userId` is in it you can't write to the database:
`let isNotBanned`
                
BE Code to filter out "bad words" and ban users that violate the community guidelines:

- Set-up serverless backend server  by running `firebase init` function from CL
- That creates a node project & functions dir, cd into it & install the bad words package
- Export cloud function, that runs every time the doc is created in the messages collection,
  that will give us access to the message text we can check for profanity.
  If there is profanity it will clean the text and banned user for life :( 
   
## Deployment       
```
 $`Firebase deploy --only functions`  
```
For detailed explanation on how things work, check out the [react.js](https://reactjs.org/) and [Firebase](https://firebase.google.com/docs?authuser=0&hl=en) documentation.
 
