import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';

const publicPaths = ['/login', '/'];

export default function AuthRedirector() {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isPublic = publicPaths.includes(location.pathname);

    // If the user is logged out and on a private page, redirect them to login.
    if (!isAuthed && !isPublic) {
      navigate('/login');
    }
  }, [isAuthed, location.pathname, navigate]);

  return null; // This component does not render anything.
}
