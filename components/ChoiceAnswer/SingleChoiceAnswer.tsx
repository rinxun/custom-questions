import { memo, useMemo } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ViewTypeEnum } from '../../enums';
import withTheme from '../withTheme';

export interface SingleChoiceAnswerProps {
  name?: string;
  color?: string;
  viewType: ViewTypeEnum;
  options: Array<{ label: string; value: string }>;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

function SingleChoiseAnswer(props: SingleChoiceAnswerProps) {
  const { options, color, value, name, viewType, required, onChange } = props;

  const disabled = useMemo(() => viewType !== ViewTypeEnum.answer, [viewType]);

  return (
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
            control={
              opt.label && opt.value ? (
                <Radio
                  size="small"
                  sx={{ '&.MuiRadio-root.Mui-checked': { color: !disabled ? color : undefined } }}
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
      </RadioGroup>
    </FormControl>
  );
}

export default withTheme(memo(SingleChoiseAnswer));
