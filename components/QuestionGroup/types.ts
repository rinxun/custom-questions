import type { CSSProperties } from 'react';
import type { ScoringProps } from '../Scoring';
import type { EditChoiceItemsProps } from '../ChoiceAnswer';
import type { AnswerTypeSelectorProps } from '../AnswerTypeSelector';

export interface QuestionGroupProps {
  question: string;
  description?: string;
  color?: CSSProperties['color'];
  questionLabel?: string;
  inputLabel?: string;
  answerType: AnswerTypeSelectorProps;
  choices?: EditChoiceItemsProps;
  showScoring?: boolean;
  scoring?: ScoringProps;
  readonly?: boolean;
  onChangeQuestion: (value: string) => void;
}
