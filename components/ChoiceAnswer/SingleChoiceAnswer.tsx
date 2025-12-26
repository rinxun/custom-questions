import { useMemo } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { ViewTypeEnum } from '../../enums';
import useCustomTheme from '../../hooks/useCustomTheme';
import type { SingleChoiceAnswerProps } from './types';

function SingleChoiseAnswer(props: SingleChoiceAnswerProps) {
  const { name, color, value, error, options, viewType, required, helperText, onChange } = props;

  const theme = useCustomTheme({ primaryColor: color });

  const disabled = useMemo(() => viewType !== ViewTypeEnum.answer, [viewType]);

  return (
    <ThemeProvider theme={theme}>
      <FormControl component="fieldset" required={required} error={error}>
        <RadioGroup
          name={name}
          onChange={(event) => {
            event.preventDefault();
            onChange(event.target.value);
          }}
          value={value}
        >
          {options.map((opt) => (
            <FormControlLabel
              sx={{ alignItems: 'flex-start', mb: 1 }}
              disabled={disabled}
              key={opt.value}
              value={opt.value}
              control={
                opt.label && opt.value ? <Radio size="small" sx={{ pb: 0, pt: '1.5px' }} /> : <></>
              }
              label={
                <Typography fontSize={16} align="left">
                  {opt.label}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
        {helperText ? (
          <FormHelperText>
            <Typography fontSize={14} align="left">
              {helperText}
            </Typography>
          </FormHelperText>
        ) : (
          <></>
        )}
      </FormControl>
    </ThemeProvider>
  );
}

export default SingleChoiseAnswer;
