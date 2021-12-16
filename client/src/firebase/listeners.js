import store from '../redux/store';
import { firestore, auth } from './firebase';
import { createUserDocument } from './firebase';
import { setArtworks } from '../redux/artworks/artworksActions';
import { setScores } from '../redux/scores/scoresActions';
import { setCommunities } from '../redux/communities/communitiesActions';
import { setArtworkDetail } from '../redux/artwork-detail/artworkDetailActions';
import { setArtworkDetailComments } from '../redux/artwork-detail/artworkDetailActions';
import { setCurrentUser } from '../redux/user/userActions';

export const listenCurrentUser = () => {
  return auth.onAuthStateChanged(async user => {
    if (user) {
      const userRef = await createUserDocument(user);
      userRef.onSnapshot(snapshot => {
        store.dispatch(setCurrentUser({ ...snapshot.data(), id: snapshot.id }));
      });
    } else {
      store.dispatch(setCurrentUser(user));
    }
  });
};

export const listenUser = userId => {
  return firestore.doc(`/users/${userId}`).onSnapshot(snapshot => {
    const newArtwork = { ...snapshot.data(), id: snapshot.id };
    store.dispatch(setArtworkDetail(newArtwork));
  });
};

export const listenArtworks = () => {
  return firestore.collection('artworks').onSnapshot(snapshot => {
    const data = [];
    snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
    store.dispatch(setArtworks(data));
  });
};

export const listenArtwork = artworkId => {
  return firestore.doc(`/artworks/${artworkId}`).onSnapshot(snapshot => {
    const newArtwork = { ...snapshot.data(), id: snapshot.id };
    store.dispatch(setArtworkDetail(newArtwork));
  });
};

export const listenScore = () => {
  return firestore.collection('scores').onSnapshot(snapshot => {
    const data = [];
    snapshot.forEach(doc => data.push({ ...doc.data() }));
    store.dispatch(setScores(data));
  });
};

export const listenCommunities = () => {
  return firestore.collection('communities').onSnapshot(snapshot => {
    const data = [];
    snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
    store.dispatch(setCommunities(data));
  });
};

export const listenComments = artworkId => {
  return firestore
    .collection(`/artworks/${artworkId}/comments`)
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      const data = [];
      snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
      store.dispatch(setArtworkDetailComments(data));
    });
};
