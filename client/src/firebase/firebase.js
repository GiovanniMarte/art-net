import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { v4 as uuidv4 } from 'uuid';

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

// Funciones de firebase

export const createUserDocument = async (user, additionalData = {}) => {
  const userRef = firestore.doc(`/users/${user.uid}`);
  const userSnap = await userRef.get();

  if (userSnap.exists) return userRef;

  const { displayName, email } = user;
  const createdAt = new Date();

  try {
    await userRef.set({
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

export const createArtworkDocument = async (artwork, user) => {
  const newArtwork = {
    ...artwork,
    author: {
      id: user.id,
      displayName: user.displayName,
      profileImage: user.profileImage,
    },
    createdAt: new Date(),
    isPushed: false,
    score: 0,
    views: 0,
  };
  try {
    const artworkRef = await firestore.collection('artworks').add(newArtwork);
    return artworkRef;
  } catch (error) {
    console.error(error.message);
  }
  return artwork;
};

export const uploadImage = async (route, image, name = uuidv4()) => {
  const imageRef = storage.ref(`${route}/${name}`);
  try {
    await imageRef.put(image);
    return await imageRef.getDownloadURL();
  } catch (error) {
    console.error(error.message);
  }
};

export const updateScore = async (artworkId, userId, value) => {
  try {
    const response = await firestore
      .collection('scores')
      .where('userId', '==', userId)
      .where('artworkId', '==', artworkId)
      .get();

    if (value === 0) {
      response.docs[0].ref.delete();
      return;
    }

    if (response.empty) {
      await firestore.collection('scores').add({ artworkId, userId, value });
      return;
    }

    const scoreId = response.docs[0].id;

    await firestore.collection('scores').doc(scoreId).update({ value });
  } catch (error) {
    console.error(error.message);
  }
};

export const createCommentDoc = async (artworkId, user, body) => {
  const newComment = {
    author: {
      id: user.id,
      displayName: user.displayName,
      profileImage: user.profileImage,
    },
    body,
    createdAt: new Date(),
  };
  try {
    await firestore.collection(`/artworks/${artworkId}/comments`).add(newComment);
  } catch (error) {
    console.error(error.message);
  }
};

export const increaseViewCounter = async artworkId => {
  try {
    firestore
      .collection('artworks')
      .doc(artworkId)
      .update('views', firebase.firestore.FieldValue.increment(1));
  } catch (error) {
    console.error(error.message);
  }
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
