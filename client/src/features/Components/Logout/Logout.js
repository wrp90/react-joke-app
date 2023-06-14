import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoggedIn, setUserId } from '../../../app/slices/userSlice';
import { setCurrentJoke, setFavoriteJoke } from '../../../app/slices/jokeSlice';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetStore = () => {
    dispatch(setIsLoggedIn(false));
    dispatch(setUserId(null));
    dispatch(setFavoriteJoke([]));
    dispatch(setCurrentJoke(''));
  }

  useEffect(() => {
    resetStore();
    localStorage.removeItem('token');
    navigate('/login');
  }, []);
}

export default Logout;