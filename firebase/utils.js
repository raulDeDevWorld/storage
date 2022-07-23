import { app } from './config'
import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut  } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getData } from './database'

const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const imagesRef = ref(storage, 'images');
// const db = getDatabase(app);

function onAuth(setUserProfile, setUserData) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserProfile(user)
      getData(setUserData)
    } else {
      setUserProfile(user)
      getData(setUserData)
    }
  });
}

// ---------------------------Login, Sign Up and Sign In------------------------------------

function signUpWithEmail (email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
function signInWithEmail (email, password) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

function withGoogle () {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

function handleSignOut () {
  signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}

//--------------------------- Firebase Storage ---------------------------
function uploadIMG (file, setUserImage, setUserSuccess) {
  uploadBytes(imagesRef, file).then((snapshot) => {
    downloadIMG(setUserImage)
    setUserSuccess(true)
  }).catch(e=> setUserSuccess('error'));
}


function downloadIMG (setUserImage) {
  getDownloadURL(imagesRef)
  .then((url) => {
    setUserImage(url)
  })
  .catch((error) => {

  });
}
//--------------------------- Firebase database ---------------------------

export { onAuth, signUpWithEmail, signInWithEmail, withGoogle, handleSignOut, uploadIMG, downloadIMG }
