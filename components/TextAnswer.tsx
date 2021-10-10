import { memo } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AnswerTypeEnum, ViewTypeEnum } from '../enums';

export interface TextAnswerProps {
  name: string;
  value: string;
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
    maxLength,
    minLength,
    disabled,
    viewType,
    answerType,
    onChange,
    placeholder
  } = props;

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="center">
      <Grid item xs={12} md={10} lg={8}>
        <TextField
          fullWidth
          size="small"
          margin="dense"
          variant="outlined"
          label={viewType !== ViewTypeEnum.answer ? 'Answer Preview' : ''}
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
            shrink: viewType !== ViewTypeEnum.answer
          }}
        />
      </Grid>
    </Grid>
  );
}

export default memo(TextAnswer);
