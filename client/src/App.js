import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { auth, createUserDocument } from './firebase/firebase';
import { setCurrentUser } from './redux/user/userActions';

function App() {
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserDocument(user);
        userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUser({ id: snapshot.id, ...snapshot.data() }));
        });
      } else {
        dispatch(setCurrentUser(user));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route
          exact
          path="/signin"
          render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
        />
        <Route exact path="/signup">
          {currentUser ? <Redirect to="/" /> : <SignUp />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
