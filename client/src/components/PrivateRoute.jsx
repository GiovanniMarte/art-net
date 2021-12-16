import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ component, isAuthenticated, ...restProps }) => {
  return (
    <Route
      {...restProps}
      render={() => (isAuthenticated ? component : <Redirect to="/signin" />)}
    />
  );
};

export default PrivateRoute;
