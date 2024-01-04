import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';
import { AuthApi } from 'src/api';
import { useUserStore } from 'src/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { run, isLoading, setUser } = useUserStore(state => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (!run) {
      AuthApi.autoLogin()
        .then(res => {
          const user = res.data.user;
          setUser({ ...user, isLoading: false });
        })
        .catch(err => {
          console.log(err.response.data);
          localStorage.removeItem('token');
          navigate('/login');
        });
    }
  }, [run]);

  if (isLoading) {
    return <div className='loading-icon__container'>
      <FadeLoader />
    </div>;
  } else {
    return (
      <>
        {children}
        <Outlet />
      </>
    );
  }
}
