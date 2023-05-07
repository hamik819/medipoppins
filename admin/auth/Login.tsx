import { Navigate } from 'react-router';
import QRCode from 'react-qr-code';
import useQRCodeGenerate from '@/hooks/admin/QRCode-generate';
import { useEffect } from 'react';
import useAuth from '@/hooks/admin/useAuth';
import userAPI from '@/api/user';
import { useMutation } from '@tanstack/react-query';
import styled from '@mui/material/styles/styled';
import { Link } from 'react-router-dom';

const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
const QRBox = styled('div')`
  width: 630px;
  border-radius: 12px;
  box-shadow: 0 15px 36px 0 rgba(213, 212, 222, 0.4);
  background-color: #fff;
  overflow: hidden;
  .head {
    background-color: #f8f8f8;
    padding: 110px 43px 38px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 38px;
      left: 38px;
      width: 56px;
      height: 56px;
      background: url('/assets/image/icon_check.png') no-repeat center/100% auto;
    }
  }
  .title {
    font-size: 26px;
    line-height: 1.2;
    letter-spacing: -0.78px;
    color: #22262c;
    margin: 0 0 12px;
    span {
      font-weight: bold;
    }
  }
  .desc {
    font-size: 15px;
    line-height: 1.5;
    letter-spacing: -0.45px;
    color: #6b717a;
    margin: 0;
    span {
      position: relative;
      padding-left: 26px;
      &:before {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 17px;
        height: 17px;
        background: url('/assets/image/icon_menu.png') no-repeat center/100%
          auto;
      }
    }
  }
  .content {
    background-color: #fff;
    padding: 76px 10px 52px;
  }
  .code_wrap {
    width: 224px;
    margin: 0 auto;
    border: 1px solid #dadce0;
    border-radius: 12px;
    padding: 20px;
    position: relative;
  }
  .code {
    height: auto;
    max-width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  .time {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: -0.54px;
    color: #6b717a;
    margin: 0;
    span {
      font-weight: bold;
      color: #31c9c9;
    }
  }
  button {
    font-size: 0;
    width: 24px;
    height: 24px;
    background: url('/assets/image/icon_reset.png') no-repeat center/100% auto;
    position: absolute;
    bottom: 20px;
    right: 20px;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  .btn_back {
    margin-top: 76px;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: -0.48px;
    color: #6b717a;
    text-decoration: underline;
    text-align: center;
    display: block;
  }
`;

const Login = () => {
  const { onLogin, isAuth } = useAuth();
  const secretKey = 'medipoppins';
  const {
    isStale,
    setIsStale,
    onChangeStale,
    isExpire,
    onChangeExpire,
    expireTime,
    onStartTimer,
    uniqueKey,
    onRefresh,
  } = useQRCodeGenerate();

  // QR 코드 등록
  const { mutate: regist, isLoading: registIsLoading } = useMutation(
    userAPI.regist,
  );

  const onRegistCode = () => {
    regist(
      {
        code: uniqueKey,
      },
      {
        onSuccess: () => {
          setIsStale(true);
        },
        onError: () => window.location.reload(),
      },
    );
  };

  // QR 인증
  const { mutate: check, isLoading: checkIsLoading } = useMutation(
    userAPI.check,
  );

  const onCheckCode = () => {
    check(
      {
        code: uniqueKey,
      },
      {
        onSuccess: data => {
          if (
            data.message === '로그인에 성공하였습니다.' &&
            data.data.token.accessToken !== undefined &&
            data.data.token.refreshToken !== undefined
          ) {
            setIsStale(false);
            onChangeExpire(true);
            localStorage.setItem('accessToken', data.data.token.accessToken);
            localStorage.setItem('refreshToken', data.data.token.refreshToken);
            onLogin();
          }
        },
        onError: () => {
          alert('문제가 발생했습니다. QR 인증을 다시해주세요');
          window.location.reload();
        },
      },
    );
  };

  // QR코드가 사용가능하지 않다면, QR코드를 등록한다.
  useEffect(() => {
    if (!isStale) {
      onRegistCode();
    }
  }, [isStale]);

  // QR코드가 사용 가능한 상태이면 QR인증을 시도한다.
  useEffect(() => {
    if (isStale && !isExpire) {
      const interval = setInterval(onCheckCode, 3000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isStale, isExpire]);

  // 카운트 다운
  useEffect(() => {
    if (isStale && expireTime) {
      const interval = setInterval(onStartTimer, 1000);
      return () => clearInterval(interval);
    }
    if (!expireTime) {
      return alert('다시 시도 해주세요');
    }
    return undefined;
  }, [isStale, expireTime]);

  const min = Math.floor(expireTime / 60)
    .toString()
    .padStart(2, '0');
  const sec = Math.floor(expireTime % 60)
    .toString()
    .padStart(2, '0');
  // const sec = expireTime % 60 === 0 ? '00' : expireTime % 60;

  if (isAuth) return <Navigate to="/admin" replace />;

  // if (registIsLoading) {
  //   return <div>키생성중^.^</div>;
  // }

  return (
    <Container>
      <QRBox>
        <div className="head">
          <p className="title">
            <span>메디포핀스 관리자 앱</span>에서
            <br />
            QR코드를 스캔하여 관리자 <span>인증</span>이 가능합니다.
          </p>
          <p className="desc">
            메디포핀스 관리자 앱 &#62; 우측상단 <span>아이콘</span>을 눌러
            QR코드를 스캔하세요.
          </p>
        </div>
        <div className="content">
          <div className="code_wrap">
            <QRCode
              size={256}
              value={secretKey + uniqueKey}
              viewBox="0 0 256 256"
              className="code"
            />
            <p className="time">
              유효시간{' '}
              <span>
                {min} : {sec}
              </span>
            </p>
            <button type="button" onClick={onRefresh}>
              다시 시도
            </button>
          </div>
          <Link to="/" className="btn_back">
            이전으로 돌아가기
          </Link>
          {process.env.NODE_ENV === 'development' && <div>{uniqueKey}</div>}
        </div>
      </QRBox>
    </Container>
  );
};

export default Login;
