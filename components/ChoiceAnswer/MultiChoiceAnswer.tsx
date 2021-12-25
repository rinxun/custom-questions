import { memo, useMemo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ViewTypeEnum } from '../../enums';

export interface MultiChoiceAnswerProps {
  name?: string;
  color?: string;
  viewType: ViewTypeEnum;
  options: Array<{ label: string; value: string }>;
  value: Array<string>;
  onChange: (value: string, checked: boolean) => void;
}

function MultiChoiseAnswer(props: MultiChoiceAnswerProps) {
  const { options, color, value, name, viewType, onChange } = props;

  const disabled = useMemo(() => viewType !== ViewTypeEnum.answer, [viewType]);

  return (
    <FormControl component="fieldset" name={name}>
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
                  sx={{
                    '&.MuiCheckbox-root.Mui-checked': { color: !disabled ? color : undefined }
                  }}
                  name={opt.label}
                />
              ) : (
                <></>
              )
            }
            label={opt.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default memo(MultiChoiseAnswer);
