import type { CSSProperties } from 'react';
import type { ViewTypeEnum, AnswerTypeEnum } from '../../enums';

export interface EditChoiceItemsProps {
  color?: CSSProperties['color'];
  options: Array<{ value: string; name: string; label?: string; correctAnswer?: boolean }>;
  answerType: AnswerTypeEnum;
  needDefineCorrectAnswer?: boolean;
  correctAnswerIconTipText?: string;
  maxItems?: number;
  maxItemsTipText?: string;
  readonly?: boolean;
  onChange: (name: string, value: string) => void;
  onAddMore: () => void;
  onRemove: (name: string) => void;
  onToggleCorrectAnswer?: (name: string) => void;
}

interface ChoiceAnswerProps {
  name?: string;
  error?: boolean;
  helperText?: string;
  description?: string;
  required?: boolean;
  color?: CSSProperties['color'];
  viewType: ViewTypeEnum;
  options: Array<{ label: string; value: string }>;
}

export interface MultiChoiceAnswerProps extends ChoiceAnswerProps {
  value: Array<string>;
  onChange: (value: string, checked: boolean) => void;
}

export interface SingleChoiceAnswerProps extends ChoiceAnswerProps {
  value: string;
  onChange: (value: string) => void;
}
