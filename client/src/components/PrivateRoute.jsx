import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ children, isAuthenticated, ...restProps }) => {
  return (
    <Route {...restProps} render={() => (isAuthenticated ? children : <Redirect to="/signin" />)} />
  );
};

export default PrivateRoute;
