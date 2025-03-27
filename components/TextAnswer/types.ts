import type { CSSProperties } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';
import type { AnswerTypeEnum, ViewTypeEnum } from '../../enums';

type TextProps = Omit<Omit<TextFieldProps, 'onChange'>, 'color'>;

export interface TextAnswerProps extends TextProps {
  value: string;
  color?: CSSProperties['color'];
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  viewType: ViewTypeEnum;
  answerType: AnswerTypeEnum;
  readonly?: boolean;
  onChange: (value: string) => void;
}
