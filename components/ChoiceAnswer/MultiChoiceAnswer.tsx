import { useMemo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { ViewTypeEnum } from '../../enums';
import useCustomTheme from '../../hooks/useCustomTheme';
import type { MultiChoiceAnswerProps } from './types';

function MultiChoiseAnswer(props: MultiChoiceAnswerProps) {
  const { options, color, value, name, viewType, required, onChange } = props;

  const theme = useCustomTheme({ primaryColor: color });

  const disabled = useMemo(() => viewType !== ViewTypeEnum.answer, [viewType]);

  return (
    <ThemeProvider theme={theme}>
      <FormControl component="fieldset" name={name} required={required}>
        <FormGroup>
          {options.map((opt) => (
            <FormControlLabel
              disabled={disabled}
              key={opt.value}
              value={opt.value}
              control={
                opt.label && opt.value ? (
                  <Checkbox
                    checked={value.includes(opt.value)}
                    onChange={(event) => {
                      event.preventDefault();
                      onChange(opt.value, event.target.checked);
                    }}
                    name={opt.label}
                  />
                ) : (
                  <></>
                )
              }
              label={
                <Typography fontSize={16} align="left">
                  {opt.label}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    </ThemeProvider>
  );
}

export default MultiChoiseAnswer;
