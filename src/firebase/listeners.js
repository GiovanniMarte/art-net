import store from '../redux/store';
import { firestore, auth } from './firebase';
import { createUserDocument } from './firebase';
import { setArtworks, setUserArtworks } from '../redux/artworks/artworksActions';
import { setScores } from '../redux/scores/scoresActions';
import { setCommunities } from '../redux/communities/communitiesActions';
import {
  setArtworkDetail,
  setArtworkDetailScores,
} from '../redux/artwork-detail/artworkDetailActions';
import { setArtworkDetailComments } from '../redux/artwork-detail/artworkDetailActions';
import { setCurrentUser } from '../redux/user/userActions';
import { setGalleryUser, setGalleryUserFollowers } from '../redux/galleryUser/galleryUserActions';

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

export const listenGalleryUser = userId => {
  return firestore.doc(`/users/${userId}`).onSnapshot(snapshot => {
    if (!snapshot.exists) return;
    const user = { ...snapshot.data(), id: snapshot.id };
    store.dispatch(setGalleryUser(user));
  });
};

export const listenArtworks = () => {
  return firestore.collection('artworks').onSnapshot(snapshot => {
    const data = [];
    snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
    store.dispatch(setArtworks(data));
  });
};

export const listenUserArtworks = userId => {
  return firestore
    .collection('artworks')
    .where('author.id', '==', userId)
    .onSnapshot(snapshot => {
      const data = [];
      snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
      store.dispatch(setUserArtworks(data));
    });
};

export const listenArtwork = artworkId => {
  return firestore.doc(`/artworks/${artworkId}`).onSnapshot(snapshot => {
    if (!snapshot.exists) return;
    const newArtwork = { ...snapshot.data(), id: snapshot.id };
    store.dispatch(setArtworkDetail(newArtwork));
  });
};

export const listenScores = () => {
  return firestore.collection('scores').onSnapshot(snapshot => {
    const data = [];
    snapshot.forEach(doc => data.push({ ...doc.data() }));
    store.dispatch(setScores(data));
  });
};

export const listenScoresByIds = artworkIds => {
  return firestore
    .collection('scores')
    .where('artworkId', 'in', artworkIds)
    .onSnapshot(snapshot => {
      const data = [];
      snapshot.forEach(doc => data.push({ ...doc.data() }));
      store.dispatch(setScores(data));
    });
};

export const listenScoresById = artworkId => {
  return firestore
    .collection('scores')
    .where('artworkId', '==', artworkId)
    .onSnapshot(snapshot => {
      const data = [];
      snapshot.forEach(doc => data.push({ ...doc.data() }));
      store.dispatch(setArtworkDetailScores(data));
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

export const listenFollowersById = id => {
  return firestore.collection(`users/${id}/followers`).onSnapshot(snapshot => {
    const data = [];
    snapshot.forEach(doc => data.push({ ...doc.data() }));
    store.dispatch(setGalleryUserFollowers(data));
  });
};
