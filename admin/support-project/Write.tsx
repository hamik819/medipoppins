import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  styled,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { editorFormat, editorModule } from '@/constant/admin/editor';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { supportProjectAPI } from '@/api';
import { DataRouterStateContext } from 'react-router/dist/lib/context';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { isLinkValid } from '@/utils/vaildate';
import { Navigate } from 'react-router';

// styled-component
const Btn = styled(Button)`
  width: 150px;
  height: 50px;
`;

const SupportWrite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const modules = useMemo(() => {
    return editorModule;
  }, []);
  const [title, setTitle] = useState('');
  const [agency, setAgency] = useState('');
  const [link, setLink] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('1');
  const [start, setStart] = React.useState<Dayjs | null>(dayjs());
  const [end, setEnd] = React.useState<Dayjs | null>(dayjs());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value);
  };
  const onCancel = useCallback(() => {
    navigate(-1);
  }, []);
  const onChangeContent = (value: string) => {
    setContent(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === '2' && !start?.isValid()) {
      alert('기간을 입력해 주세요.');
    } else if (type === '2' && !end?.isValid()) {
      alert('기간을 입력해 주세요.');
    } else if (type === '2' && end?.isBefore(start)) {
      alert('기간을 확인해 주세요.');
    } else if (link.trim().length > 0 && !isLinkValid(link)) {
      alert('관련 링크는 http:// 혹은 https://로 시작해야합니다.');
    } else if (content === '<p><br></p>' || content.length === 0) {
      alert('내용을 입력해 주세요.');
    } else {
      onCreate();
    }
  };
  const {
    mutate: create,
    isLoading: createIsLoading,
    isError,
  } = useMutation(supportProjectAPI.post);

  const onCreate = () => {
    if (type === '2') {
      // 기간 모집일 때,
      create(
        {
          title,
          link,
          content,
          type: 2,
          recruitmentType: 2,
          recruitmentAgency: agency,
          recruitmentDateStart: start,
          recruitmentDateEnd: end,
        },
        {
          onSuccess: () => {
            alert('글이 작성되었습니다.');
            onCancel();
          },
          onError: (error: unknown) => {
            if ((error as any)?.response?.data?.status === 401) {
              alert('만료된 토큰입니다. 다시 로그인 해주세요.');
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              window.location.reload();
            } else {
              alert(
                `code : ${(error as any)?.response?.data?.status}, ${
                  (error as any)?.response?.data?.message
                }
                `,
              );
            }
          },
        },
      );
    } else {
      // 상시 모집일 때,
      create(
        {
          title,
          link,
          content,
          type: 2,
          recruitmentType: 1,
          recruitmentAgency: agency,
        },
        {
          onSuccess: () => {
            alert('글이 작성되었습니다.');
            onCancel();
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
        },
      );
    }
  };
  if (createIsLoading) {
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

  return (
    <Box sx={{ width: '1400px', margin: '0 auto' }}>
      <form onSubmit={onSubmit}>
        <Stack sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 1, color: 'rgb(49,201,201)' }}>
            제목
          </Typography>
          <TextField
            placeholder="제목을 입력하세요."
            size="medium"
            sx={{ width: '100%', backgroundColor: 'white' }}
            autoComplete="off"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            inputProps={{ maxLength: 50 }}
            required
          />
        </Stack>
        <Stack sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 1, color: 'rgb(49,201,201)' }}>
            기간
          </Typography>
          <RadioGroup
            aria-labelledby="demo-demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            row
            value={type}
            onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="상시" />
            <FormControlLabel value="2" control={<Radio />} label="기간" />
          </RadioGroup>
          {type === '2' && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div style={{ marginTop: 10 }}>
                <DateTimePicker
                  label="시작일"
                  sx={{ mr: '10px', backgroundColor: 'white' }}
                  value={start}
                  onChange={setStart}
                  format="YYYY/MM/DD hh:mm A"
                />
                <DateTimePicker
                  label="종료일"
                  sx={{ backgroundColor: 'white' }}
                  value={end}
                  onChange={setEnd}
                  minDateTime={dayjs(start)}
                  format="YYYY/MM/DD hh:mm A"
                />
              </div>
            </LocalizationProvider>
          )}
        </Stack>
        <Stack sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 1, color: 'rgb(49,201,201)' }}>
            모집 기관
          </Typography>
          <TextField
            placeholder="모집 기관을 입력하세요."
            size="medium"
            sx={{ width: '100%', backgroundColor: 'white' }}
            autoComplete="off"
            name="id"
            value={agency}
            onChange={e => setAgency(e.target.value)}
            inputProps={{ maxLength: 10 }}
            required
          />
        </Stack>
        <Stack sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 1, color: 'rgb(49,201,201)' }}>
            관련 링크
          </Typography>
          <TextField
            placeholder="관련 링크를 입력하세요."
            size="medium"
            sx={{ width: '100%', backgroundColor: 'white' }}
            autoComplete="off"
            name="body"
            value={link}
            onChange={e => setLink(e.target.value)}
          />
        </Stack>
        <Typography variant="h4" sx={{ mb: 1, color: 'rgb(49,201,201)' }}>
          내용
        </Typography>
        <Paper>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={editorFormat}
            value={content}
            onChange={onChangeContent}
          />
        </Paper>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            mt: 5,
          }}>
          <Btn
            variant="outlined"
            color="primary"
            sx={{ mr: 2 }}
            onClick={onCancel}>
            취소
          </Btn>
          <Btn variant="contained" color="primary" type="submit">
            저장
          </Btn>
        </Stack>
      </form>
    </Box>
  );
};

export default SupportWrite;
