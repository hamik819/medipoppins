import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '@/hooks/admin/useAuth';
import { BigCircleProgress } from '@/component/common/progress';

const Logout = () => {
  const { onLogout, isAuth } = useAuth();
  const navigate = useNavigate();
  // console.log(isAuth);

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
    if (isAuth) {
      onLogout();
    }
  }, [isAuth]);

  return (
    <div>
      {isAuth.toString()}
      <BigCircleProgress />
    </div>
  );
};

export default Logout;
