import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { useMemo, useState } from 'react';
import { Button, Paper, Stack } from '@mui/material';
import { editorFormat, editorModule } from '@/constant/admin/editor';

const WriteEditor = () => {
  const [value, setValue] = useState('');

  const modules = useMemo(() => {
    return editorModule;
  }, []);

  return (
    <div>
      {/* <div>{value}</div> */}
      <Paper>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={editorFormat}
          onChange={setValue}
        />
      </Paper>

      <Stack mt={2} gap={1} direction="row-reverse">
        <Button variant="contained" color="primary">
          글쓰기
        </Button>
        <Button variant="outlined" color="primary">
          취소
        </Button>
      </Stack>
      {/* <div>{value}</div> */}
    </div>
  );
};

export default WriteEditor;
