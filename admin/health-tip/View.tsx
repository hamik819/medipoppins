import React, { useMemo, useState, useRef, useCallback } from 'react';
import {
  Box,
  Stack,
  TextField,
  Typography,
  Paper,
  styled,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { editorFormat, editorModule } from '@/constant/admin/editor';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { healthTipAPI } from '@/api';
import { fileAPI } from '@/api/config';

// 스타일
const ImageBox = styled('div')`
  overflow: hidden;
  max-width: 600px;
  margin-top: 20px;
  img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 16 / 6;
    border-radius: 12px;
  }
`;
const Btn = styled(Button)`
  width: 150px;
  height: 50px;
`;

const HealthView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const modules = useMemo(() => {
    return editorModule;
  }, []);
  const [file, setFile] = useState('');
  const [img, setImg] = useState<string | ArrayBuffer | null>('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const fileInput = useRef(null);

  // react query //
  // 글 조회(get)
  const { data, isLoading, isError, isFetching, refetch } = useQuery(
    ['test', id],
    () => healthTipAPI.getItem(id),
    {
      onSuccess: data => {
        setTitle(data.data.title);
        setContent(data.data.content);
        const url = data.data.thumbnail;
        const arSplitUrl = url.split('/');
        const filename = arSplitUrl[arSplitUrl.length - 2];
        setFile(filename);
        setImg(data.data.thumbnail);
      },
      cacheTime: 0,
      staleTime: Infinity,
      // enabled: false,
      // staleTime: Infinity,
    },
  );
  // 글 수정(put)
  const { mutate: update, isLoading: updateIsLoading } = useMutation(
    healthTipAPI.put,
  );
  // 이미지(post)
  const {
    mutate: upload,
    isLoading: uploadIsLoading,
    isError: uploadIsError,
  } = useMutation((formData: FormData) =>
    fileAPI.post('upload/image', formData),
  );
  // react query end //

  // 뒤로가기
  const onCancel = useCallback(() => {
    navigate(-1);
  }, []);
  // 내용 변경
  const onChangeContent = (value: string) => {
    setContent(value);
  };
  // 내용 필수값 체크
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content === '<p><br></p>' || content.length === 0) {
      alert('내용을 입력해 주세요.');
    } else if (img === '') {
      alert('썸네일 이미지를 업로드해 주세요.');
    } else {
      onUpdate();
    }
  };
  // 이미지 업데이트
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const formData = new FormData();
    if (files) {
      const fileRef = files[0];
      formData.append('image', fileRef);
      upload(formData, {
        onSuccess: res => {
          if (fileRef) {
            setImg(`${res.data.data.image.pathList[0]}original.png`);
            setFile(fileRef.name);
          }
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
    }
  };
  // 수정하기
  const onUpdate = () => [
    update(
      {
        id,
        form: {
          title,
          content,
          thumbnail: img,
          type: 1,
        },
      },
      {
        onSuccess: () => {
          alert('수정되었습니다.');
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
    ),
  ];

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
    <Box sx={{ width: '1400px', margin: '0 auto' }}>
      <form onSubmit={onSubmit}>
        <Stack sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 1, color: 'rgb(49,201,201)' }}>
            제목
          </Typography>
          <TextField
            placeholder="제목을 입력하세요."
            size="medium"
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={{ width: '100%', backgroundColor: 'white' }}
            inputProps={{ maxLength: 50 }}
            required
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
        <Stack sx={{ mt: 3 }}>
          <Typography variant="h4" sx={{ mb: 1, color: 'rgb(49,201,201)' }}>
            썸네일 이미지{' '}
            <span style={{ fontSize: 14 }}>
              ( 16:6 비율의 이미지를 업로드 해주세요. )
            </span>
          </Typography>
          <div
            style={{
              border: '1px solid rgba(0, 0, 0, 0.23)',
              padding: '5px 14px',
              borderRadius: 4,
              color: 'rgba(0, 0, 0, 0.87)',
              position: 'relative',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
            }}>
            <p
              style={{
                height: '100%',
                width: '94%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                paddingRight: 10,
                margin: 0,
              }}>
              {file}
            </p>
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={onChangeFile}
                ref={fileInput}
              />
            </Button>
          </div>
          <ImageBox>
            {uploadIsLoading ? (
              <LinearProgress />
            ) : (
              img && (
                <>
                  <img src={img.toString()} alt="미리보기 이미지" />
                  <Button
                    variant="contained"
                    component="label"
                    onClick={() => {
                      setImg('');
                      setFile('');
                    }}>
                    삭제
                  </Button>
                </>
              )
            )}
          </ImageBox>
        </Stack>
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
            수정
          </Btn>
        </Stack>
      </form>
    </Box>
  );
};

export default HealthView;
