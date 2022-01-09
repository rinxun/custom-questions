import { memo, useMemo } from 'react';
import colorAlpha from 'color-alpha';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AnswerTypeEnum } from '../enums';
import withTheme from './withTheme';

export interface AnswerTypeSelectorProps {
  value: AnswerTypeEnum;
  color?: string;
  label?: string;
  hiddenOptions?: Array<AnswerTypeEnum>;
  onChange: (value: AnswerTypeEnum) => void;
}

/**
 * Component For answer type
 */
function AnswerTypeSelector(props: AnswerTypeSelectorProps) {
  const { value, color, onChange, label, hiddenOptions = [] } = props;

  const options = useMemo(
    () =>
      [
        { label: 'Short Text', value: AnswerTypeEnum.shortText },
        { label: 'Long Text', value: AnswerTypeEnum.longText },
        { label: 'Upload File', value: AnswerTypeEnum.upload },
        { label: 'Link', value: AnswerTypeEnum.link },
        { label: 'Single Choice', value: AnswerTypeEnum.singleChoice },
        { label: 'Multiple Choice', value: AnswerTypeEnum.multiChoice }
      ].filter((opt) => !hiddenOptions.includes(opt.value)),
    []
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="answer-type-select-label" sx={{ '&.Mui-focused': { color } }}>
        {label || 'Select Answer Type'}
      </InputLabel>
      <Select
        label={label || 'Select Answer Type'}
        size="small"
        margin="dense"
        sx={{
          textAlign: 'left',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: color }
        }}
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
          <MenuItem
            key={opt.value}
            value={opt.value}
            sx={{
              '&.MuiMenuItem-root.Mui-selected': {
                backgroundColor: color ? colorAlpha(color, 0.08) : undefined
              }
            }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default withTheme(memo(AnswerTypeSelector));
