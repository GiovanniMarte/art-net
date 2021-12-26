import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

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

export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
