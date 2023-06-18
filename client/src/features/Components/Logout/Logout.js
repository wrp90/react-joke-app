import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoggedIn, setUserId } from '../../../app/slices/userSlice';
import { resetJokeSlice, setCurrentJoke } from '../../../app/slices/jokeSlice';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetStore = useCallback(() => {
    dispatch(setIsLoggedIn(false));
    dispatch(setUserId(null));
    dispatch(resetJokeSlice());
    dispatch(setCurrentJoke(''));
  },[dispatch]);

  useEffect(() => {
    resetStore();
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate, resetStore]);
}

export default Logout;