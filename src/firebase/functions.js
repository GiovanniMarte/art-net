import firebase from './firebase';
import { auth, firestore, storage } from './firebase';
import { v4 as uuidv4 } from 'uuid';

export const registerUser = async (displayName, email, password) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  await user.updateProfile({ displayName });
  await createUserDocument(user, displayName);
};

export const createUserDocument = async (user, displayName) => {
  const userRef = firestore.doc(`/users/${user.uid}`);

  const { email } = user;
  const createdAt = new Date();
  const bio =
    'Bienvenido a mi galería. Si te gustan mis obras puedes seguirme y votar por las que más te gusten!';

  try {
    await userRef.set({
      displayName,
      email,
      bio,
      createdAt,
      profileImage: '',
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

export const updateFollow = async (followerId, followedId) => {
  try {
    const response = await firestore.collection(`/users/${followedId}/followers`).get();

    const following = response.docs.find(snapshot => snapshot.data().id === followerId);

    if (following) {
      following.ref.delete();
      return;
    }

    await firestore.collection(`/users/${followedId}/followers`).add({ id: followerId });
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

export const deleteComment = async (artworkId, commentId) => {
  try {
    await firestore.doc(`/artworks/${artworkId}/comments/${commentId}`).delete();
  } catch (error) {
    console.error(error);
  }
};

export const increaseViewCounter = async artworkId => {
  try {
    await firestore
      .collection('artworks')
      .doc(artworkId)
      .update('views', firebase.firestore.FieldValue.increment(1));
  } catch (error) {
    console.error(error.message);
  }
};

export const increaseCommunityArtworksCounter = async communities => {
  try {
    const response = await firestore
      .collection('communities')
      .where(firebase.firestore.FieldPath.documentId(), 'in', communities)
      .get();

    const batch = firestore.batch();

    response.forEach(snapshot =>
      batch.update(snapshot.ref, 'artworkCount', firebase.firestore.FieldValue.increment(1))
    );

    batch.commit();
  } catch (error) {
    console.error(error.message);
  }
};

export const removeProfileImage = async userId => {
  const imageRef = storage.ref(`profileImages/${userId}`);
  try {
    await imageRef.delete();

    const batch = firestore.batch();

    const userRef = firestore.doc(`/users/${userId}`);

    batch.update(userRef, 'profileImage', '');

    await updateUserDataInArtworks(batch, userId, 'author.profileImage', '');

    batch.commit();
  } catch (error) {
    console.error(error);
  }
};

export const updateProfileImage = async (userId, image) => {
  const imageRef = storage.ref(`profileImages/${userId}`);
  try {
    await imageRef.put(image);

    const imageUrl = await imageRef.getDownloadURL();

    const batch = firestore.batch();

    const userRef = firestore.doc(`/users/${userId}`);

    batch.update(userRef, 'profileImage', imageUrl);

    await updateUserDataInArtworks(batch, userId, 'author.profileImage', imageUrl);

    batch.commit();
  } catch (error) {
    console.error(error);
  }
};

export const updateUserData = async (userId, settings) => {
  const userRef = firestore.doc(`/users/${userId}`);
  try {
    const batch = firestore.batch();

    if (settings.displayName) {
      batch.update(userRef, 'displayName', settings.displayName);
      await updateUserDataInArtworks(batch, userId, 'author.displayName', settings.displayName);
    }

    if (settings.bio) {
      batch.update(userRef, 'bio', settings.bio);
    }

    batch.commit();
  } catch (error) {
    console.error(error);
  }
};

const updateUserDataInArtworks = async (batch, userId, field, data) => {
  const artworksRef = await firestore.collection('artworks').where('author.id', '==', userId).get();

  artworksRef.forEach(artworkSnap => {
    batch.update(artworkSnap.ref, field, data);
  });

  const commentsRef = await firestore
    .collectionGroup('comments')
    .where('author.id', '==', userId)
    .get();

  commentsRef.forEach(commentSnap => {
    batch.update(commentSnap.ref, field, data);
  });
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
