import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Communities from './pages/Communities';
import ArtworkDetail from './pages/ArtworkDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Upload from './pages/Upload';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { listenUser } from './firebase/listeners';
import { useSelector } from 'react-redux';
import Gallery from './pages/Gallery';
import Settings from './pages/Settings';

function App() {
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    const unsubscribe = listenUser();
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header />
      <Box flex={1} margin={18}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/communities" component={Communities} />
          <Route exact path="/artwork/:artworkId" component={ArtworkDetail} />
          <Route exact path="/gallery/:userId" component={Gallery} />
          <PrivateRoute
            exact
            isAuthenticated={currentUser ? true : false}
            path="/settings/:userId"
            component={<Settings />}
          />
          <PrivateRoute
            exact
            isAuthenticated={currentUser ? true : false}
            path="/upload"
            component={<Upload />}
          />
          <Route
            exact
            path="/signin"
            render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
          />
          <Route exact path="/signup">
            {currentUser ? <Redirect to="/" /> : <SignUp />}
          </Route>
        </Switch>
      </Box>
      <Footer />
    </Router>
  );
}

export default App;
