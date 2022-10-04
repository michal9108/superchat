import React, { useRef, useState } from 'react';
import './App.css';

// import Firebase SDK//

import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';  

// import Firebase hooks to make it easier to work with firebase and react//

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//call to identify the project itself

firebase.initializeApp({
  apiKey: "AIzaSyAJicE8HSH0xWMjqQFhpmkOYfeQQQa7vJg",
  authDomain: "superchat-1f00b.firebaseapp.com",
  projectId: "superchat-1f00b",
  storageBucket: "superchat-1f00b.appspot.com",
  messagingSenderId: "477909908530",
  appId: "1:477909908530:web:bc12be0fc13b0710af102b"
})

//Reference to the auth and  firebase SDK as a Global variables

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

//if user is Logged-in it returns it an object that has user-id, address and other info
//Signed In - User is an Object, 
//Signed Out - User is null

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>❤️❤️❤️ SUPERCHAT</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />} 
      </section>

    </div>
  );
}

//How do we Sign-In? 
//In our Sign-In component we return a button, that listens to the click event and runs function called `signInWithGoogle`,
//then we instantiate provider called GoogleAuthProvider, 
//then we will passed it to sig-in with popup method which will trigger popup-window, when user clicks on the button
function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Přihlášení pomocí účtu Google</button>
      <p> Nedodržování pravidel skupiny se trestá zablokováním účtu s okamžitou platností. </p>
    </>
  )

}

// checks if we have the currentuser - if yes it will returns the button that triggers Sign-Out method
function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Odhlášení</button>
  )
}


function ChatRoom() {
  const dummy = useRef();

  //Reference the firestore collection - collection of documents from Firestore
  const messagesRef = firestore.collection('messages');

  //Make a query from subset of documents - query documents in a collection
  const query = messagesRef.orderBy('createdAt').limit(200);

  //listen to the data with the hook , listen to updates to the data in realtime with the useCollectionData hook,
  // It returns an array of objects in which each object is a chat message from he database
  //anytime it changes - react will re-render with the latest data.
  const [messages] = useCollectionData(query, { idField: 'id' });


  //Statefull value called formValue - through useState hook and it will starts with an empty string.

  const [formValue, setFormValue] = useState('');

  //we define async function in our component, that takes the event as its argument 
  //normally when the form is submitted it will refresh the page but we can call e.preventDefault() to stop that from happening
  // then we will grab the userid(uid) from currentUser

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;


      //create new document in firestore
      // Call await messagesRef.add which will write new document in the database,
      //it takes .js object as its argument with the values that you want to write in the database
      //text - that will be our formValue, "createAt" that's it's  timestamp on server and uid - userId
      //that will resolve when the document is created and we can reset our formValue to an empty string 

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  //LOOP OVER EACH DOCUMENT - template we can map over the messages and for each message we will use dedicated chat message component that has a key prop with the message-id(msg-id) and pass the document data as a message prop (msg)
  
  //Principle in UI for the user to send the message - form 



//BIND THE STATE TO THE FORM INPUT - Statefull value called formValue - bind "input value" to the formValue state (input value={formValue} onChange)
//Whenever the user types text in to the form, it triggers the change event, we listen to the onChange event, then we will take the value of a onChange and set it as a form value state
// submit the value of text and write it to the database

//WRITE VALUE TO THE FIRESTORE - when the user clicks the button or submits the form 
//we can listen to the onSubmit event on the form itself and trigger the event handler called "sendMessage"


//we define it as a async function in our component, that takes the event as its argument 


//AUTOMATIC SCROLLING
// reference span element with the ref prop and connect to our code with the useRef() hook, callback to "scrollIntoView" in  the sendMessage function whenever user send the message  

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>



    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Napiš něco hezké..." />

      <button type="submit" disabled={!formValue}>📨💕</button>

    </form>
  </>)
}


// define the message child component, showing the actual text by accessing it from the props.message

function ChatMessage(props) {

  const { text, uid, photoURL } = props.message;


//We compare the user-id in firestore document to the currently-logged-in user,
// if they are both equal we now that currentUser sent the message - Conditional.
// We than can apply different styling whether or not the message was sent or received.
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}


export default App;
