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

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserDocument = async (user, additionalData = {}) => {
  const userRef = firestore.doc(`/users/${user.uid}`);
  const userSnapshot = await userRef.get();

  if (userSnapshot.exists) return userRef;

  const { displayName, email, uid } = user;
  const createdAt = new Date();

  try {
    await userRef.set({
      id: uid,
      profileImage: '',
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

export const createArtworkDocument = async (artwork, author) => {
  const newArtwork = {
    ...artwork,
    author,
    createdAt: new Date(),
    isPushed: false,
    score: 0,
    views: 0,
  };
  try {
    await firestore.collection('artworks').add(newArtwork);
  } catch (error) {
    console.error(error.message);
  }
  return artwork;
};

// const addCommunity = async () => {
//   const newCommunity = {
//     name: 'Manga',
//     description: 'Muestra tus obras relacionadas con el manga/anime.',
//     banner: '',
//     artworks: 0,
//     followers: 0,
//   };
//   try {
//     await firestore.collection('communities').add(newCommunity);
//     console.log('Comunidad creada!');
//   } catch (error) {
//     console.error(error.message);
//   }
// };
