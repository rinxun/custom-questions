import { memo } from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ViewTypeEnum } from '../../enums';

export interface MultiChoiceAnswerProps {
  name: string;
  viewType: ViewTypeEnum;
  options: Array<{ label: string; value: string }>;
  value: Array<string>;
  onChange: (value: string, checked: boolean) => void;
}

function MultiChoiseAnswer(props: MultiChoiceAnswerProps) {
  const { options, value, name, viewType, onChange } = props;

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="center">
      <Grid item xs={12} md={10} lg={8} textAlign="left">
        <FormControl component="fieldset" name={name}>
          <FormGroup>
            {options.map((opt) => (
              <FormControlLabel
                disabled={viewType !== ViewTypeEnum.answer}
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
                label={opt.label}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default memo(MultiChoiseAnswer);
