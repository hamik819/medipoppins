import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { useMemo, useState } from 'react';
import { Button, Paper, Stack } from '@mui/material';
import { editorModule, editorFormat } from '@/constant/admin/editor';

const ViewEditor = () => {
  const testValue =
    '<h3><strong>지원내용</strong></h3><p><br></p><p><span style="color: rgb(136, 136, 136);">고혈압·이상지질혈증·비만을 동반한 당뇨병 환자가 흔한 것도 심혈관 질환 발생 위험을 부추기는 원인이다.</span></p><p><br></p><ul><li><strong>개인상담</strong></li></ul><p class="ql-indent-1"><span style="color: rgb(136, 136, 136);">고혈압·이상지질혈증·비만을 동반한 당뇨병 환자가 흔한 것도 심혈관 질환 발생 위험을 부추기는 원인이다.</span></p><p class="ql-indent-1"><br></p><h3>신청자격</h3><p><br></p><p><span style="color: rgb(136, 136, 136);">3세 6세 아동을 양육하는 비혼모부모, 한부모, 청소년 부모</span></p><p><span style="color: rgb(136, 136, 136);">(초동학생 자녀를 양육하는 가족도 신청 가능)</span></p><p><br></p><h3>접수방법</h3><p><br></p><p><span style="color: rgb(136, 136, 136);">신청하기 클릭 후 구글폼 제출</span></p><p><br></p><p><br></p><h3>제출서류</h3><p><br></p><p><span style="color: rgb(136, 136, 136);">고혈압·이상지질혈증·비만을 동반한 당뇨병 환자가 흔한 것도 심혈관 질환 발생 위험을 부추기는 원인이다.</span></p><p><br></p>';

  const modules = useMemo(() => {
    return editorModule;
  }, []);

  return (
    <div>
      <Paper>
        <ReactQuill
          theme="bubble"
          modules={modules}
          formats={editorFormat}
          value={testValue}
          readOnly
        />
      </Paper>

      <Stack mt={2} gap={1} direction="row-reverse">
        <Button variant="contained" color="primary">
          수정
        </Button>
        <Button variant="outlined" color="primary">
          삭제
        </Button>
      </Stack>
    </div>
  );
};

export default ViewEditor;
