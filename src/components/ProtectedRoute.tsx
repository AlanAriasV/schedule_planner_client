import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { autoLogin } from 'src/api';
import useUserStore from 'src/store/useUserStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { run, isLoading, setUser } = useUserStore(state => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (!run) {
      autoLogin()
        .then(res => {
          console.log(res.data);
          const { iat, exp, ...user } = res.data;
          setUser(user);
        })
        .catch(err => {
          console.log(err.response.data);
          localStorage.removeItem('token');
          navigate('/login');
        });
    }
  }, [run]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {children}
        <Outlet />
      </>
    );
  }
}
