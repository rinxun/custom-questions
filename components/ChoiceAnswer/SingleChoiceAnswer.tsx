import { memo } from 'react';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ViewTypeEnum } from '../../enums';

export interface SingleChoiceAnswerProps {
  name?: string;
  color?: string;
  viewType: ViewTypeEnum;
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}

function SingleChoiseAnswer(props: SingleChoiceAnswerProps) {
  const { options, color, value, name, viewType, onChange } = props;

  return (
    <FormControl component="fieldset">
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
            disabled={viewType !== ViewTypeEnum.answer}
            key={opt.value}
            value={opt.value}
            control={
              opt.label && opt.value ? (
                <Radio size="small" sx={{ '&.MuiRadio-root.Mui-checked': { color } }} />
              ) : (
                <></>
              )
            }
            label={opt.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default memo(SingleChoiseAnswer);
