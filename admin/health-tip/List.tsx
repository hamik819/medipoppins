import {
  Button,
  Grid,
  Stack,
  styled,
  Pagination,
  CircularProgress,
  Box,
  LinearProgress,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinkButton from '@/component/common/LinkButton';
import React, { ChangeEvent, useEffect } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useHealthTipList } from '@/hooks/useHealthTip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { healthTipAPI } from '@/api';
import { Navigate } from 'react-router';

// 스타일
const TableStyle = styled(TableCell)`
  font-size: 16px;
  a {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const ImageBox = styled('div')`
  overflow: hidden;
  max-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 31px;
  margin: 0 auto;
  img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 16 / 6;
    border-radius: 12px;
  }
`;

const HealthList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const queryClient = useQueryClient();

  // 페이지네이션
  const onChangePage = (e: ChangeEvent<unknown>, value: number) => {
    searchParams.set('page', value.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!page) {
      searchParams.set('page', '1');
      searchParams.set('limit', '10');
      setSearchParams(searchParams, { replace: true });
    }
  }, [location]);

  // react query //
  // 글 조회(get)
  const { data, isLoading, isError } = useHealthTipList({
    page: Number(page),
    limit: Number(limit),
    type: 1,
  });
  // 글 삭제(delete)
  const {
    mutate: itemDelete,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
  } = useMutation(healthTipAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error: unknown) => {
      if ((error as any)?.response?.data?.status === 401) {
        alert('만료된 토큰입니다. 다시 로그인 해주세요.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.replace('/');
      } else {
        alert(
          `code : ${(error as any)?.response?.data?.status}, ${
            (error as any)?.response?.data?.message
          }
          `,
        );
      }
    },
  });
  // react query end //
  const isNoData = !data?.notice.length;

  // 삭제하기
  const onDelete = (id: string) => {
    if (window.confirm('삭제 하시겠습니까?')) {
      itemDelete(id);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '600px',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <h2>건강꿀팁</h2>
      <Grid container sx={{ mb: 2, justifyContent: 'flex-end', gap: 1 }}>
        <LinkButton to="create">글쓰기</LinkButton>
      </Grid>
      <div>
        <TableContainer component={Paper}>
          {deleteIsLoading && <LinearProgress />}
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead style={{ height: 50 }}>
              <TableRow>
                <TableCell style={{ width: '50%', fontSize: '16px' }}>
                  제목
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: '30%', fontSize: '16px' }}>
                  썸네일
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: '10%', fontSize: '16px' }}>
                  작성일
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: '10%', fontSize: '16px' }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.notice.map(row => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    padding: 10,
                  }}>
                  <TableStyle component="td" scope="row">
                    <Link to={row.id.toString()}>{row.title}</Link>
                  </TableStyle>
                  <TableCell align="center">
                    <ImageBox>
                      {row.thumbnail === '' ? (
                        <p>썸네일 이미지 없음</p>
                      ) : (
                        <img src={row.thumbnail} alt="" />
                      )}
                    </ImageBox>
                  </TableCell>
                  <TableCell align="center">
                    {row.createdAt.substring(0, 10)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => onDelete(row.id.toString())}>
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {isNoData && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{
                      padding: '60px 0',
                      fontSize: '20px',
                    }}>
                    자료가 없습니다
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {isNoData ? null : (
          <Stack spacing={2} mt={4} alignItems="center">
            <Pagination
              color="primary"
              count={data.meta.totalPage}
              page={data.meta.nowPage}
              onChange={onChangePage}
              variant="outlined"
            />
          </Stack>
        )}
      </div>
    </>
  );
};

export default HealthList;
