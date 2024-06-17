import type { CSSProperties } from 'react';
import type { AnswerTypeEnum } from '../../enums';

export interface AnswerTypeSelectorProps {
  value: AnswerTypeEnum;
  color?: CSSProperties['color'];
  label?: string;
  hiddenOptions?: Array<AnswerTypeEnum>;
  onChange: (value: AnswerTypeEnum) => void;
}
