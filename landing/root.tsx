import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/css';
import '@/theme/landing/landing.css';
import { styled } from '@mui/material';
import MouseScollImg from '@/assets/icon/mouse_scroll.png';
import ArrowDown from '@/assets/icon/arrow_down.png';
import GoogleStore from '@/assets/icon/google_store_logo.png';
import AppStore from '@/assets/icon/apple_logo.png';
import BG01 from '@/assets/images/landing_section1.png';
import SectionItem1 from '@/assets/images/section1_mockup.png';
import Expert from '@/assets/images/section2_1.png';
import Parents from '@/assets/images/section2_2.png';
import BG04 from '@/assets/images/section4_1.png';
import Activity from '@/assets/images/section5_activity.png';
import Heart from '@/assets/images/section2_love.png';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { defaultAPI } from '@/api/config';
import { keyframes } from '@emotion/react';

const LandingRoot = () => {
  const [image, setImage] = useState('1');
  const [clicked, setClicked] = useState(false);
  const [activeList, setActiveList] = useState<boolean[]>([
    true,
    false,
    false,
    false,
  ]);
  const [count, setCount] = useState(1);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClicked(true);
    const { name } = e.currentTarget;
    setActiveList(prevActiveList => {
      const newActiveList = [...prevActiveList];
      const indexOfTrue = newActiveList.indexOf(true);
      newActiveList[indexOfTrue] = false;
      newActiveList[Number(name)] = true;
      return newActiveList;
    });
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (!clicked) {
      intervalId = setInterval(() => {
        setActiveList(prevActiveList => {
          const newActiveList = [...prevActiveList]; // 이전 상태값을 shallow copy
          const indexOfTrue = newActiveList.indexOf(true);
          newActiveList[indexOfTrue] = false;
          newActiveList[(indexOfTrue + 1) % newActiveList.length] = true; // 다음 인덱스에 true 값을 할당
          return newActiveList;
        });
      }, 4000);
    }
    return () => clearInterval(intervalId);
  }, [clicked]);

  // 협력기관 타입
  type Sponsor = {
    data: {
      sponsor: [
        {
          id: number;
          name: string;
          image: string;
        },
      ];
    };
  };
  // 협력기관 data get
  const { data, isLoading, isError } = useQuery(
    ['sponsor'],
    () => defaultAPI.get('sponsors'),
    {
      onSuccess: (data: Sponsor) => {
        setCount(data.data.sponsor.length);
      },
    },
  );

  const notYet = (e: any) => {
    e.preventDefault();
    alert('준비중 입니다.');
  };

  return (
    <>
      <Header>
        <div className="header_wrap">
          <Link to="/" className="logo">
            MEDI POPPINS
          </Link>
          <Link to="/admin" className="admin">
            관리자
          </Link>
        </div>
      </Header>
      <Container>
        <SwiperContainer
          modules={[Mousewheel, Navigation, Pagination]}
          mousewheel
          slidesPerView="auto"
          pagination={{ clickable: true }}
          direction="vertical"
          // navigation
          // scrollbar={{ draggable: true }}
          // onSwiper={swiper => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
        >
          <SlideItem className="section1">
            <Contents>
              <div className="left">
                <div className="title_area">
                  <span className="aggro-light">한부모 가정을 위한</span>
                  <h1>
                    비영리 <br />
                    디지털 헬스케어
                  </h1>
                  <strong className="aggro-medium">MEDI POPPINS</strong>
                </div>
                <div className="download_area">
                  <a href="구글" target="_blank" onClick={notYet}>
                    <img src={GoogleStore} alt="" />
                    <div>
                      <p>Google Play</p>
                      <span>다운로드 하기</span>
                    </div>
                  </a>
                  <a href="애플" target="_blank" onClick={notYet}>
                    <img src={AppStore} alt="" />
                    <div>
                      <p>App Store</p>
                      <span>다운로드 하기</span>
                    </div>
                  </a>
                </div>
                <div className="text_area">
                  <strong className="font-bold">메디포핀스는</strong>
                  <p className="font-thin">
                    한부모 가정의 보호자와 아이들의 건강관리를 위해
                    <br />
                    <strong className="font-bold">한부모 가정</strong>과{' '}
                    <strong className="font-bold">보건의료 전문가</strong>를
                    이어주는
                    <br /> 비영리 디지털 헬스케어 서비스 입니다.
                  </p>
                </div>
              </div>
              <div className="right">
                <img src={SectionItem1} alt="" />
              </div>
              <div className="scroll">
                <img src={MouseScollImg} alt="" />
                <p className="font-thin">SCROLL</p>
                <img src={ArrowDown} alt="" />
              </div>
            </Contents>
          </SlideItem>
          <SlideItem className="section2">
            <Contents>
              <div className="contents_wrap">
                <div className="image">
                  <div className="image_left">
                    <img src={Expert} alt="" />
                    <p>
                      <strong>보건의료 전문가</strong> (의사, 약사, 간호사)
                    </p>
                  </div>
                  <div className="image_center">
                    <img src={Heart} alt="" />
                  </div>
                  <div className="image_right">
                    <img src={Parents} alt="" />
                    <p>
                      우리 아이 건강에 대한
                      <br />
                      전문가 조언을 필요로 하는 <strong>한부모 가정</strong>
                    </p>
                  </div>
                </div>
                <div className="text">
                  <p className="desc1">
                    메디포핀스는
                    <strong> 한부모 가정의 보호자와 아이들</strong>의 건강
                    관리를 위해
                    <br />
                    <strong>현직 보건의료 전문가</strong>분들이 만들어 가는{' '}
                    <strong>서비스</strong> 입니다.
                  </p>
                  <p className="desc2">
                    <strong>한부모 가정의 보호자</strong>라면 간단한 회원 가입을
                    통해 <strong>메디포핀스의 모든 서비스를 무료로 사용</strong>
                    하실 수 있습니다.
                  </p>
                </div>
              </div>
            </Contents>
          </SlideItem>
          <SlideItem className="section3">
            <Contents>
              <div className="contents_wrap">
                <ul className="list">
                  <li className={activeList[0] ? 'is-selected' : ''}>
                    <button
                      type="button"
                      className="btn_process"
                      name="0"
                      onClick={onClick}>
                      1
                    </button>
                    <div>
                      <p className="title">실시간 전문가 상담</p>
                      <p className="desc">
                        메디포핀스를 통해 언제 어디서든 전문가(의사, 약사,
                        간호사)의 상담을 받으실 수 있어요.
                      </p>
                    </div>
                  </li>
                  <li className={activeList[1] ? 'is-selected' : ''}>
                    <button
                      type="button"
                      className="btn_process"
                      name="1"
                      onClick={onClick}>
                      2
                    </button>
                    <div>
                      <p className="title">건강 관리 필수 정보</p>
                      <p className="desc">
                        한 부모 가정 아이들의 건강 관리에 도움이 되는 필수 건강
                        정보를 알려드려요
                      </p>
                    </div>
                  </li>
                  <li className={activeList[2] ? 'is-selected' : ''}>
                    <button
                      type="button"
                      className="btn_process"
                      name="2"
                      onClick={onClick}>
                      3
                    </button>
                    <div>
                      <p className="title">건강 취약 계층 지원 정보</p>
                      <p className="desc">
                        정부, 지자체, 비영리 단체, 일반 회사가 제공하는 취약
                        계층 지원 정보를 빠르게 제공해 드려요.
                      </p>
                    </div>
                  </li>
                  <li className={activeList[3] ? 'is-selected' : ''}>
                    <button
                      type="button"
                      className="btn_process"
                      name="3"
                      onClick={onClick}>
                      4
                    </button>
                    <div>
                      <p className="title">건강 기록 관리</p>
                      <p className="desc">
                        메디포핀스를 이용하면 우리아이 건강 기록을 쉽게 관리할
                        수 있어요.
                      </p>
                    </div>
                  </li>
                </ul>
                {/* <div className="image" /> */}
              </div>
            </Contents>
          </SlideItem>
          <SlideItem className="section4">
            <img src={BG04} alt="" />
            <div className="text">
              <p className="title">
                온라인
                <br />
                의료 봉사 플랫폼 : <br />
                <strong>메디포핀스</strong>
              </p>
              <div className="desc">
                <p>
                  메디포핀스는 온라인 의료 봉사 플랫폼입니다.
                  <br />
                  의사, 약사, 간호사 여러분,{' '}
                  <strong>메디포핀스 Crew 가 되어</strong>
                  <br />
                  <strong>혁신적인 재능기부</strong>를 경험해 보세요.
                </p>
                <p>
                  온라인으로 진행되는 간단한 <strong>재능기부를 통해</strong>{' '}
                  나의 전문 지식이
                  <br />
                  건강 취약 계층의 건강 향상에 쓰이는 <strong>멋진 보람</strong>
                  을 느끼실 수 있습니다.
                </p>
                <p>
                  메디포핀스 Crew 가 되어{' '}
                  <strong>전문가적 가치와 사회적 가치를</strong>
                  <br />
                  <strong>동시에 추구하는 멋진 사람</strong>들을 만나보세요.
                </p>
              </div>
            </div>
          </SlideItem>
          <SlideItem className="section5">
            <Contents>
              <div className="contents_wrap">
                <div className="left">
                  <p className="title">
                    메디포핀스
                    <br />
                    <span>Crew 가입 절차</span>
                  </p>
                  <div className="process">
                    <p>가입신청 (아래 Form)</p>
                    <p>운영진 전화 면담</p>
                    <p>메디포핀스 전문가 계정 부여</p>
                    <p>활동시작</p>
                    <a
                      href="가입 신청서 작성"
                      className="btn_join"
                      onClick={notYet}>
                      가입 신청서 작성하기
                    </a>
                  </div>
                </div>
                <div className="right">
                  <p className="title">
                    메디포핀스
                    <br />
                    <span>Crew 활동 방식</span>
                  </p>
                  <img src={Activity} alt="각 전문가 크루가 그룹을 이룬다" />
                  <div className="desc">
                    <p>
                      메디포핀스는 각 <strong>전문가 Crew</strong> 들의 협업을
                      통해 운영됩니다.
                    </p>
                    <p>
                      신규 Crew 들은 각각의 Group 으로 배정되어 기존 Crew 들의
                      <br />
                      도움을 받아 Group으로 봉사활동을 시작하게 됩니다.
                    </p>
                    <p>
                      모든 봉사 활동은 <strong>온라인(전문가앱)</strong>으로
                      진행되며,
                      <br />
                      개인적인 일정에 따라 참여 여부를 쉽게 조절할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </Contents>
          </SlideItem>
          <SlideItem className="section6" count={count}>
            {count && (
              <div className="banner">
                <p>협력기관</p>
                <ul>
                  {data?.data.sponsor.map(item => (
                    <li key={item.id}>
                      <div className="image">
                        <img src={item.image} alt="" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="footer">
              <p className="company font-bold">(주)메디앤쉐어</p>
              <ul className="info">
                <li>
                  <span>주소</span>
                  <p>서울 영등포구 국제금융로 6길 33, 919호</p>
                </li>
                <li>
                  <span>이메일</span>
                  <p>medipoppins@mediandshare.com</p>
                </li>
                <li>
                  <span>대표</span>
                  <p>고미혜</p>
                </li>
                <li>
                  <span>사업자 등록 번호</span>
                  <p>676-86-01168</p>
                </li>
              </ul>
              <div className="copyright">
                MEDI POPPINS Copyright © MEDI POPPINS Corp. All Rights Reserved.
              </div>
            </div>
          </SlideItem>
        </SwiperContainer>
      </Container>
    </>
  );
};

const scrollIcon = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
`;
const Header = styled('header')`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 130px;
  .header_wrap {
    width: 1300px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: block;
    width: 132px;
    height: 54px;
    background: url('/assets/images/logo.png') no-repeat center/100% auto;
    font-size: 0;
  }
  .admin {
    display: block;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.3;
    letter-spacing: -0.48px;
    color: #fff;
    padding-left: 30px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 18px;
      height: 18px;
      background: url('/assets/images/icon_admin.png') no-repeat center/100%
        auto;
    }
  }
`;

const Container = styled('div')`
  width: 100%;
  height: 100vh;
  .swiper-pagination {
    margin-right: 200px;
  }
  .swiper-pagination-bullet {
    background-color: rgba(255, 255, 255, 0.3);
    opacity: 1;
    margin: 14px 0 !important;
    width: 10px;
    height: 10px;
  }
  .swiper-pagination-bullet-active {
    background-color: rgba(255, 255, 255, 1);
  }
  ul,
  li {
    list-style: none;
  }
`;

const SwiperContainer = styled(Swiper)`
  height: 100%;
`;

const SlideItem = styled(SwiperSlide)<{ count?: number }>`
  height: 100vh;

  &.section1 {
    background-color: #7465f1;
    background-image: url(${BG01});
    background-size: cover;
    color: #fff;
    position: relative;

    .scroll {
      position: absolute;
      bottom: 70px;
      left: 50%;
      transform: translateX(-50%);
      display: inline-flex;
      align-items: center;
      flex-direction: column;
      gap: 12px;
      p {
        letter-spacing: 2px;
      }
      animation: ${scrollIcon} 0.5s infinite ease alternate;
    }

    .title_area {
      margin-bottom: 78px;
      span {
        font-size: 24px;
      }
      h1 {
        font-size: 64px;
        margin-top: 18px;
        margin-bottom: 12px;
      }
      strong {
        font-size: 39px;
        color: #80edda;
      }
    }

    .download_area {
      display: flex;
      gap: 22px;
      a {
        color: #fff;
        display: flex;
        align-items: center;
        gap: 5px;
        padding-left: 20px;
        border: 1px solid #ddd;
        border-radius: 50px;
        width: 209px;
        height: 60px;
        flex-grow: 0;
        background-color: rgba(255, 255, 255, 0.06);
        transition: background-color ease 0.2s;
        &:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        p {
          font-size: 18px;
        }
        span {
          font-size: 11px;
        }
      }
    }

    .text_area {
      margin-top: 69px;
      > strong {
        font-size: 22px;
      }
      p {
        margin-top: 16px;
        line-height: 27px;
      }
    }

    .right {
      align-self: flex-end;
      img {
        margin-bottom: -4px;
      }
    }
  }

  &.section2 {
    background-color: #fff;
    .contents_wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .image {
      display: flex;
      justify-content: center;
      align-items: end;
      div {
        p {
          font-size: 20px;
          letter-spacing: -0.66px;
          text-align: center;
        }
      }
      &_left {
        img {
          width: 437px;
          height: 372px;
        }
        p {
          margin-top: 30px;
        }
      }
      &_center {
        margin-bottom: 170px;
        padding-left: 30px;
        img {
          width: 171px;
          height: 120px;
        }
      }
      &_right {
        img {
          width: 475px;
          height: 448px;
        }
      }
    }
    .text {
      margin-top: 90px;
      text-align: center;
      .desc1 {
        font-size: 30px;
        color: #000;
        font-weight: 300;
        letter-spacing: -1.02px;
        line-height: 1.4;
        margin-bottom: 20px;
        font-family: 'SBAggroL', sans-serif;
        strong {
          font-family: 'SBAggroM', sans-serif;
        }
      }
      .desc2 {
        font-size: 20px;
        color: #8a939e;
        letter-spacing: -0.66px;
      }
    }
  }

  &.section3 {
    background: url('/assets/images/section3_bg.png') #f7f6fe no-repeat
      center/cover;
    .list {
      button {
        width: 43px;
        height: 43px;
        border-radius: 30px;
        border: solid 1px rgba(116, 101, 241, 0.3);
        background-color: #f7f6fe;
        color: #7465f1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 72px;
        cursor: pointer;
      }
      li {
        display: flex;
        margin-bottom: 76px;
        position: relative;
        /* 선 */
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 550px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% auto;
          opacity: 0;
          transition: 0.5s;
        }
        &:nth-of-type(1) {
          button {
            position: relative;
            &:after {
              content: '';
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              background-color: rgba(116, 101, 241, 0.3);
              width: 1px;
              height: 583px;
              z-index: -1;
            }
          }
          &:after {
            top: 0;
            background-image: url('/assets/images/section3_1.png');
            width: 533px;
            height: 883px;
          }
        }
        &:nth-of-type(2)::after {
          top: -180px;
          background-image: url('/assets/images/section3_2.png');
          width: 588px;
          height: 900px;
        }
        &:nth-of-type(3)::after {
          top: -360px;
          background-image: url('/assets/images/section3_3.png');
          width: 588px;
          height: 900px;
        }
        &:nth-of-type(4)::after {
          top: -540px;
          background-image: url('/assets/images/section3_4.png');
          width: 588px;
          height: 900px;
        }
      }
      .title {
        font-family: 'SBAggroM', sans-serif;
        font-size: 20px;
        line-height: 1.4;
        letter-spacing: -0.6px;
        margin-bottom: 9px;
      }
      .desc {
        width: 215px;
        font-size: 15px;
        line-height: 1.5;
        letter-spacing: -0.45px;
        color: #6b717a;
        word-break: keep-all;
      }
      .is-selected {
        &:after {
          opacity: 1;
        }
        button {
          color: #fff;
          border: none;
          background-color: #7465f1;
        }
        .title {
          position: relative;
          padding-left: 26px;
          &:before {
            content: '';
            position: absolute;
            width: 23px;
            height: 30px;
            top: 10px;
            left: 0;
            transform: translateY(-50%);
            background: url('/assets/images/icon_finger.png') no-repeat
              center/100% auto;
          }
        }
        div {
          position: relative;
          &:before {
            content: '';
            position: absolute;
            top: -35px;
            left: -65px;
            width: 343px;
            height: 194px;
            background: url('/assets/images/bubble.png') no-repeat center/100%
              auto;
            z-index: -1;
          }
        }
      }
    }
    .image {
    }
  }

  &.section4 {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    img {
      position: absolute;
      left: 23px;
      bottom: 0;
    }
    .text {
      z-index: 1;
      position: relative;
      left: 55%;
    }
    .title {
      font-family: 'SBAggroL', sans-serif;
      font-size: 52px;
      line-height: 1.3;
      margin-bottom: 36px;
      strong {
        font-family: 'SBAggroM', sans-serif;
      }
    }
    .desc {
      font-size: 20px;
      line-height: 1.5;
      letter-spacing: -0.6px;
      p {
        margin-top: 30px;
      }
    }
  }

  &.section5 {
    position: relative;
    background: url('/assets/images/section5_bg.png') no-repeat center/cover;
    .contents_wrap {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .left {
      margin-right: 300px;
    }
    .right {
      .title {
        padding-left: 20px;
      }
      img {
        margin-bottom: 100px;
      }
    }
    .title {
      font-family: 'SBAggroL', sans-serif;
      color: #fff;
      font-size: 34px;
      margin-bottom: 40px;
      span {
        font-family: 'SBAggroM', sans-serif;
        font-size: 42px;
      }
    }
    .process {
      p {
        width: 338px;
        height: 70px;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        color: #fff;
        line-height: 70px;
        letter-spacing: -0.66px;
        background-color: rgba(217, 217, 217, 0.1);
        border-radius: 20px;
        margin-bottom: 30px;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          bottom: -22px;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          height: 12px;
          background: url('/assets/images/icon_next.png') no-repeat center/100%
            auto;
        }
        &:last-of-type {
          margin-bottom: 60px;
          &:after {
            content: none;
          }
        }
      }
      .btn_join {
        width: 338px;
        height: 72px;
        border-radius: 20px;
        background-color: #31c9c9;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-weight: bold;
        line-height: 1.5;
        letter-spacing: -0.66px;
        position: relative;
        padding-right: 10px;
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          right: 50px;
          transform: translateY(-50%);
          width: 26px;
          height: 20px;
          background: url('/assets/images/icon_btn_join.png') no-repeat
            center/100% auto;
        }
      }
    }
    .desc {
      padding-left: 20px;
      p {
        font-size: 20px;
        line-height: 1.5;
        letter-spacing: -0.6px;
        color: #fff;
        margin-bottom: 30px;
        font-family: 'Pretendard-Thin', sans-serif;
        &:last-of-type {
          margin-bottom: 0;
        }
        strong {
          font-family: 'Pretendard-Bold', sans-serif;
        }
      }
    }
  }

  &.section6 {
    background-color: #fff;
    .banner {
      padding: 85px 0 55px;
      /* 4개 일 때 : , 4 ~ 8 일 때:  */
      height: ${props => ((props.count as number) <= 4 ? '400px' : '500px')};
      background: url('/assets/images/section6_bg.png') no-repeat center/cover;
      p {
        text-align: center;
        font-family: 'SBAggroM', sans-serif;
        font-size: 32px;
        margin-bottom: 70px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        max-width: 1190px;
        margin: 0 auto;
        padding: 0;
      }
      li {
        margin-bottom: 40px;
        &:nth-of-type(4n) {
          .image {
            margin-right: 0;
          }
        }
      }
      .image {
        width: 253.1px;
        height: 86.2px;
        border-radius: 59px;
        background-color: #fff;
        overflow: hidden;
        margin-right: 58.2px;
      }
      img {
        width: 100%;
        margin: 0 auto;
        object-fit: cover;
        aspect-ratio: 16 / 6;
      }
    }
    .footer {
      width: 1190px;
      margin: 0 auto;
      padding: 34px 0 30px;
      .company {
        color: #636972;
        line-height: 1.5;
        letter-spacing: -0.6px;
        margin-bottom: 12px;
      }
      .info {
        display: flex;
        flex-wrap: wrap;
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: -0.48px;
        width: 600px;
        margin-bottom: 53px;
        padding: 0;
        li {
          display: flex;
          align-items: center;
          &:nth-of-type(2n-1) {
            margin-right: 20px;
            position: relative;
            &:after {
              content: '';
              position: absolute;
              top: 50%;
              right: -10px;
              transform: translateY(-50%);
              width: 1px;
              height: 16px;
              background-color: #454545;
            }
          }
        }
        span {
          color: #777b81;
          margin-right: 10px;
        }
        p {
          color: #454545;
        }
      }
      .copyright {
        font-size: 15px;
        line-height: 1.5;
        letter-spacing: -0.45px;
        color: #aaa;
      }
    }
  }

  &:last-child {
    /* footer height: 230 */
    height: ${props =>
      // eslint-disable-next-line no-nested-ternary
      (props.count as number) === 0
        ? '230px'
        : (props.count as number) <= 4
        ? '630px'
        : '730px'};
  }
`;

const Contents = styled('div')`
  height: 100%;
  width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export default LandingRoot;
