import { useMemo } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import useCustomTheme from '../../hooks/useCustomTheme';
import { AnswerTypeEnum } from '../../enums';
import type { AnswerTypeSelectorProps } from './types';

/**
 * Component For answer type
 */
function AnswerTypeSelector(props: AnswerTypeSelectorProps) {
  const { value, color, onChange, label, hiddenOptions = [] } = props;

  const theme = useCustomTheme({ primaryColor: color });

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
    <ThemeProvider theme={theme}>
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
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}

export default AnswerTypeSelector;
export * from './types';
