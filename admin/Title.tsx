import React from 'react';
import { Typography } from '@mui/material';

type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return (
    <Typography variant="h1" sx={{ mb: 4 }}>
      {title}
    </Typography>
  );
};

export default Title;
