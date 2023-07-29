import { useMemo, CSSProperties } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { ViewTypeEnum } from '../../enums';
import useCustomTheme from '../../useCustomTheme';

export interface SingleChoiceAnswerProps {
  name?: CSSProperties['color'];
  color?: string;
  viewType: ViewTypeEnum;
  options: Array<{ label: string; value: string }>;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

function SingleChoiseAnswer(props: SingleChoiceAnswerProps) {
  const { options, color, value, name, viewType, required, onChange } = props;

  const theme = useCustomTheme({ primaryColor: color });

  const disabled = useMemo(() => viewType !== ViewTypeEnum.answer, [viewType]);

  return (
    <ThemeProvider theme={theme}>
      <FormControl component="fieldset" required={required}>
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
              disabled={disabled}
              key={opt.value}
              value={opt.value}
              control={opt.label && opt.value ? <Radio size="small" /> : <></>}
              label={
                <Typography fontSize={16} align="left">
                  {opt.label}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  );
}

export default SingleChoiseAnswer;
