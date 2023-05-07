import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  Pagination,
  CircularProgress,
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supportProjectAPI } from '@/api';
import { useSupportProjectList } from '@/hooks/useSupportProject';
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

const SupportList = () => {
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
  // 조회
  const { isLoading, isError, data, isFetching } = useSupportProjectList({
    page: Number(page),
    limit: Number(limit),
    type: 2,
  });
  // 삭제
  const {
    mutate: itemDelete,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
  } = useMutation(supportProjectAPI.delete, {
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

  // 삭제
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

  if (deleteIsError) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      <h2>지원사업</h2>
      <Grid container sx={{ mb: 2, justifyContent: 'flex-end', gap: 1 }}>
        <LinkButton to="create">글쓰기</LinkButton>
      </Grid>
      <div>
        <TableContainer component={Paper}>
          {deleteIsLoading && <LinearProgress />}
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead style={{ height: 50 }}>
              <TableRow>
                <TableCell style={{ width: '40%', fontSize: '16px' }}>
                  제목
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: '20%', fontSize: '16px' }}>
                  기간
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: '20%', fontSize: '16px' }}>
                  운영기관
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: '10%', fontSize: '16px' }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.notice.map(row => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      padding: 10,
                    }}>
                    <TableStyle component="th" scope="row">
                      <Link to={row.id.toString()}>{row.title}</Link>
                    </TableStyle>
                    <TableCell align="center">
                      {row.recruitmentType === 1
                        ? '상시'
                        : `${row.recruitmentDateStart} ~ ${row.recruitmentDateEnd}` &&
                          `${row.recruitmentDateStart?.substring(
                            0,
                            16,
                          )} ~ ${row.recruitmentDateEnd?.substring(0, 16)}`}
                    </TableCell>
                    <TableCell align="center">
                      {row.recruitmentAgency}
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
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} mt={4} alignItems="center">
          <Pagination
            color="primary"
            count={data.meta.totalPage}
            page={data.meta.nowPage}
            onChange={onChangePage}
            variant="outlined"
          />
        </Stack>
      </div>
    </>
  );
};

export default SupportList;
