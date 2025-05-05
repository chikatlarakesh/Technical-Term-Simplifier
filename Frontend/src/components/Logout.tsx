import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Logout = () => {
  const handleLogout = () => {
    signOut(auth);
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
