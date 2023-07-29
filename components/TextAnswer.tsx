import type { CSSProperties } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AnswerTypeEnum, ViewTypeEnum } from '../enums';
import useCustomTheme from '../useCustomTheme';

type TextProps = Omit<Omit<TextFieldProps, 'onChange'>, 'color'>;

export interface TextAnswerProps {
  value: string;
  color?: CSSProperties['color'];
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  viewType: ViewTypeEnum;
  answerType: AnswerTypeEnum;
  onChange: (value: string) => void;
}

function TextAnswer(props: TextAnswerProps & TextProps) {
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
    placeholder,
    inputProps = {},
    ...rest
  } = props;

  const theme = useCustomTheme({ primaryColor: color });

  return (
    <ThemeProvider theme={theme}>
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
        inputProps={{ ...inputProps, maxLength, minLength }}
        InputLabelProps={{
          shrink: viewType !== ViewTypeEnum.answer ? true : undefined
        }}
        {...rest}
      />
    </ThemeProvider>
  );
}

export default TextAnswer;
