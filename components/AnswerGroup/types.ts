import type { AnswerTypeEnum } from '../../enums';
import type { TextAnswerProps } from '../TextAnswer';
import type { LinkAnswerProps } from '../LinkAnswer';
import type { UploaderAnswerProps } from '../UploaderAnswer';
import type { SingleChoiceAnswerProps, MultiChoiceAnswerProps } from '../ChoiceAnswer';

export interface AnswerGroupProps {
  question: string;
  answerType: AnswerTypeEnum;
  required?: boolean;
  answer:
    | LinkAnswerProps
    | TextAnswerProps
    | UploaderAnswerProps
    | SingleChoiceAnswerProps
    | MultiChoiceAnswerProps;
}
