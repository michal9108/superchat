<h1> FULL-STACK CHAT APP with React + Firebase</h1>




Secure, flexible scales infinitely in the cloud, unfortunately security rules are not active.    

Security logic  - to minimize bad behavior

Cloud functions for Firebase Serverless - Bad World filter - 

Authentification of users through Firebase - User Auth - Sign in with Google Account

Realtime Data Streams and Firestore using React 

### Single room Chat Room, user must log in with google account, each message is a document in firestore database - contains the userId, timestamp and the text/message


We make te Querry to the database with the most recent messages.

REALTIME SYNC Whenever the data changes on the Backend the react app will update with the the most recent messages on FE

### 1. Creating initial React App through npx create-react-app Superchat

### 2. Extra dependencies to install: 
1. `firebase` 
2. `react-firebase-hooks`

### 3. App.js file -  Delete the boilerplate code

### 4. Create project at firebase database

### 5. FIREBASE 

        1.At Firebase choose Authentication and Enable Google Sign-In method

        2.Add a new Web App to the project.

        // If the user will Sign-In - Show the Chat room otherwise App has to show the button to Sign-In with Google.
        // Knowing if the user is Logged-IN - with useState hook - function Sign-In and Sing Out


### 6.In Firestore Database - Cloud Firestore -  Data - Start a `New collection` called  `messages`, if user add message it will create document in the collection with the `timestamp` and the `user-Id`.
  
        We make a reference called `firestore.collection`

        //it respond to many updates, it will be shown in React UI

### 7. When we display chat messages ,we want to distinguish between messages that are send and messages that are going to be received. To achieve that we compare the `user-id` in firestore document to the `currently-logged-in` user, if the are equal we now that currentuser sent the message - Conditional. Now we than can apply different styling whether or not the message was sent or received.

### 8. Principles in UI for the user to send the message 

### !!!  Only avalaible on Firebase Blaze plan `Pay as you go` -  which I don't have activated. I am gonna use it in future. !!!// 

### 10. Security - In Firebase for the SECURITY RULES we can write .js like syntax that woud be otherwise needed to implement on Back-end server. We can modify our rules on Firebase console.

1st match the path to the messages collection in the database.



        USER MUST BE SIGNED-IN
        When user wants to read the document we want to make sure that he/she is Logged-In into their account.
        LOGIC - if request.auth.uid != null;


        When the user is signed-in we want to make sure that they can only create the documents with they're userId and they are not banned for whatever reason.  

        LOGIC -  function canCreateMessage() {

                //making sure they are Logged-In
                `let isSignedIn` = request.auth.uid != null; 

                //making sure that the request.auth.uid is matching the user-id (request.resource.data.uid) on the document they are trying to create

                `let isOwner` = request.auth.uid == request.resource.data.uid; 

                //Banned collection for Bad - Bad - Evil Users - if your userId is in it you cant write to the database
                `let isNotBanned`


        BE Code to filter out "bad words" and ban users that violate the community guidelines

              - Set-up serverless backend server  by running `firebase init` function from CL
              - That creates a node project & functions dir, cd into it & install the bad words package
              - Export cloud function, that runs every time the doc is created in the messages collection,
                that will give us access to the message text we can check for profanity.
                If there is profanity   it will clean the text and banned user for life :( 

        Deploy by command:   `Firebase deploy --only functions`  

 

