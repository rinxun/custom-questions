import { memo } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AnswerTypeEnum, ViewTypeEnum } from '../enums';

export interface TextAnswerProps {
  name?: string;
  value: string;
  label?: string;
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
      label={viewType !== ViewTypeEnum.answer ? 'Answer Preview' : label || ''}
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
      InputLabelProps={{
        shrink: viewType !== ViewTypeEnum.answer ? true : undefined
      }}
    />
  );
}

export default memo(TextAnswer);
