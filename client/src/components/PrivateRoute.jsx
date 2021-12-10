import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ children, isAuthenticated }) => {
  return <Route render={() => (isAuthenticated ? children : <Redirect to="/signin" />)} />;
};

export default PrivateRoute;
