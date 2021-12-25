import { memo } from 'react';
import TextField from '@mui/material/TextField';
import { AnswerTypeEnum, ViewTypeEnum } from '../enums';

export interface TextAnswerProps {
  name?: string;
  value: string;
  label?: string;
  color?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  viewType: ViewTypeEnum;
  answerType: AnswerTypeEnum;
  onChange: (value: string) => void;
  placeholder?: string;
}

function TextAnswer(props: TextAnswerProps) {
  const {
    name,
    value,
    label,
    color,
    required,
    maxLength,
    minLength,
    disabled,
    viewType,
    answerType,
    onChange,
    placeholder
  } = props;

  return (
    <TextField
      required={required}
      fullWidth
      size="small"
      margin="dense"
      variant="outlined"
      label={label ?? (viewType !== ViewTypeEnum.answer ? 'Preview' : '')}
      name={name}
      value={value}
      placeholder={placeholder || 'Type your answer here...'}
      minRows={3}
      maxRows={6}
      multiline={answerType === AnswerTypeEnum.longText}
      disabled={disabled || viewType !== ViewTypeEnum.answer}
      onChange={(event) => {
        event.preventDefault();
        onChange(event.target.value);
      }}
      inputProps={{ maxLength, minLength }}
      InputProps={{
        sx: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: color
          }
        }
      }}
      InputLabelProps={{
        sx: { '&.Mui-focused': { color } },
        shrink: viewType !== ViewTypeEnum.answer ? true : undefined
      }}
    />
  );
}

export default memo(TextAnswer);
