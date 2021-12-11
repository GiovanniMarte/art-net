import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Upload from './pages/Upload';
import PrivateRoute from './components/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { auth, createUserDocument } from './firebase/firebase';
import { setCurrentUser } from './redux/user/userActions';
import { Box } from '@chakra-ui/react';

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
      <Box margin={18}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <PrivateRoute isAuthenticated={currentUser ? true : false} path="/upload">
            <Upload />
          </PrivateRoute>
          <Route
            exact
            path="/signin"
            render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
          />
          <Route exact path="/signup">
            {currentUser ? <Redirect to="/" /> : <SignUp />}
          </Route>
          <Redirect to="/" />
        </Switch>
      </Box>
    </Router>
  );
}

export default App;
