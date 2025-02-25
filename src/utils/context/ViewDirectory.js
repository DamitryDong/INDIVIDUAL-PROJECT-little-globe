import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import Loading from './Loading';
import SignIn from '@/components/SignIn';
import MyNavbar from '@/Componenets/NavBar';

function ViewDirectorBasedOnUserAuthStatus({ children }) {
  const { user, userLoading } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        <MyNavbar /> {/* NavBar only visible if user is logged in and is in every view */}
        {children}
      </>
    );
  }

  return <SignIn />;
}

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  children: PropTypes.node.isRequired,
};
