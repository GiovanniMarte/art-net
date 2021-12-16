import store from '../redux/store';
import { firestore } from './firebase';
import { setArtworks } from '../redux/artworks/artworksActions';
import { setScores } from '../redux/scores/scoresActions';
import { setCommunities } from '../redux/communities/communitiesActions';
import { setArtworkDetail } from '../redux/artwork-detail/artworkDetailActions';
import { setArtworkDetailComments } from '../redux/artwork-detail/artworkDetailActions';

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
  return firestore.collection(`/artworks/${artworkId}/comments`).onSnapshot(snapshot => {
    const data = [];
    snapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
    store.dispatch(setArtworkDetailComments(data));
  });
};
