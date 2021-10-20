import { memo, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AnswerTypeEnum } from '../enums';

export interface AnswerTypeSelectorProps {
  value: AnswerTypeEnum;
  label?: string;
  hiddenOptions?: Array<AnswerTypeEnum>;
  onChange: (value: AnswerTypeEnum) => void;
}

/**
 * Component For answer type
 */
function AnswerTypeSelector(props: AnswerTypeSelectorProps) {
  const { value, onChange, label, hiddenOptions = [] } = props;
  const options = useMemo(() => {
    const kvs: Array<string> = [];
    for (let type in AnswerTypeEnum) {
      const enumVal = Object(AnswerTypeEnum)[type];
      // if user sets the hiddenOptions, we should only show those types not in the hiddenOptions
      if (!hiddenOptions.includes(enumVal)) {
        kvs.push(enumVal);
      }
    }
    return kvs;
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      sx={{ mt: 0.125, mb: 0.5 }}
    >
      <Grid item xs={12} md={3} lg={2}>
        <FormControl fullWidth>
          <InputLabel id="answer-type-select-label">{label || 'Select Answer Type'}</InputLabel>
          <Select
            label={label || 'Select Answer Type'}
            size="small"
            margin="dense"
            sx={{ textAlign: 'left' }}
            name="answerType"
            labelId="answer-type-select-label"
            id="answer-type-select"
            value={value}
            onChange={(event) => {
              event.preventDefault();
              onChange(event.target.value as AnswerTypeEnum);
            }}
          >
            {options.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default memo(AnswerTypeSelector);
