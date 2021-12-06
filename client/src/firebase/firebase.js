import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCHQQ7nQRW6Cse-UOvf9H90EiDKXOfqoEQ',
  authDomain: 'art-net.firebaseapp.com',
  projectId: 'art-net',
  storageBucket: 'art-net.appspot.com',
  messagingSenderId: '233034492415',
  appId: '1:233034492415:web:f97816982021f9d1811fca',
  measurementId: 'G-KFK1H9SRD2',
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserDocument = async (user, additionalData = {}) => {
  const userRef = firestore.doc(`/users/${user.uid}`);
  const userSnapshot = await userRef.get();

  if (userSnapshot.exists) return userRef;

  const { displayName, email } = user;
  const createdAt = new Date();

  try {
    await userRef.set({
      displayName,
      email,
      createdAt,
      ...additionalData,
    });
  } catch (err) {
    console.error(err.message);
  }

  return userRef;
};
