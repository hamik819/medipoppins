import React from 'react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
// import { SelectArrowIcons } from '@/component/icons/commonIcons';
// const SelectArrow = () => {
//   return <SelectArrowIcons />;
// };

type Color =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

type ChipColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

const UiPage = () => {
  const typoVariant = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'button',
    'overline',
  ] as Variant[];

  const color = [
    'inherit',
    'primary',
    'secondary',
    'success',
    'error',
    'info',
    'warning',
  ] as Color[];

  const chipColor = [
    'default',
    'primary',
    'secondary',
    'success',
    'error',
    'info',
    'warning',
  ] as ChipColor[];

  return (
    <Box sx={{ width: '1400px', margin: '0 auto' }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h5">Typography</Typography>
          <Stack direction="row" spacing={2}>
            {typoVariant.map(value => (
              <Stack spacing={2} key={value}>
                <Typography variant={value}>{value}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="h5">Button</Typography>
          <Stack direction="row" spacing={2}>
            {color.map(value => (
              <Stack spacing={2} key={value}>
                <Button variant="contained" color={value}>
                  {`${value} 채우기`}
                </Button>
                <Button variant="outlined" color={value}>
                  {`${value} 테두리`}
                </Button>
                <Button variant="text" color={value}>
                  {`${value} 텍스트`}
                </Button>
                <Button variant="contained" disabled color={value}>
                  {`${value} 비활성`}
                </Button>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="h5">Chip</Typography>
          <Stack direction="row" spacing={2}>
            {chipColor.map(value => (
              <Stack spacing={2} key={value}>
                <Chip label={`${value.toUpperCase()} 채우기`} color={value} />
                <Chip
                  label={`${value.toUpperCase()} 테두리`}
                  color={value}
                  variant="outlined"
                />
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="h5">TextField</Typography>
          <Stack direction="row" spacing={2}>
            <TextField placeholder="텍스트필드 1" size="small" />
            <TextField
              placeholder="텍스트필드 2"
              type="text"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button size="small" variant="contained" color="primary">
                      인증
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              placeholder="텍스트필드 3"
              type="password"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="contained" disabled size="small">
                      인증
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Box>

        <Box>
          <Typography variant="h5">Select</Typography>
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ width: 240, textAlign: 'center' }}>
              <TextField
                size="small"
                value="0"
                select
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <SearchIcons /> */}
                    </InputAdornment>
                  ),
                }}>
                <MenuItem value="0">카테고리</MenuItem>
                <MenuItem value="10">성별</MenuItem>
                <MenuItem value="20">연령대</MenuItem>
              </TextField>
            </FormControl>

            <Select value="10" size="small" sx={{ width: '240px' }}>
              <MenuItem value="0">카테고리</MenuItem>
              <MenuItem value="10">성별</MenuItem>
              <MenuItem value="20">연령대</MenuItem>
            </Select>
            <Button variant="contained">조회</Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default UiPage;
