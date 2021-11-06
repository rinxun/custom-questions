import { memo, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AnswerTypeEnum, ViewTypeEnum, LinkTypeEnum } from '../enums';
import Scoring, { ScoringProps } from './Scoring';
import { EditChoiceItems, EditChoiceItemsProps } from './ChoiceAnswer';
import TextAnswer from './TextAnswer';
import LinkAnswer from './LinkAnswer';
import UploaderAnswer from './UploaderAnswer';
import AnswerTypeSelector, { AnswerTypeSelectorProps } from './AnswerTypeSelector';

interface QuestionGroupProps {
  question: string;
  questionLabel?: string;
  answerType: AnswerTypeSelectorProps;
  choices?: EditChoiceItemsProps;
  showScoring?: boolean;
  scoring?: ScoringProps;
  onChangeQuestion: (value: string) => void;
}

function QuestionGroup(props: QuestionGroupProps) {
  const { scoring, questionLabel, choices, answerType, question, onChangeQuestion, showScoring } =
    props;

  const answerContent = useMemo(() => {
    const { value: type } = answerType;
    switch (type) {
      case AnswerTypeEnum.longText:
      case AnswerTypeEnum.shortText:
        return (
          <TextAnswer
            name=""
            value=""
            onChange={() => {}}
            viewType={ViewTypeEnum.edit}
            answerType={type}
          />
        );
      case AnswerTypeEnum.singleChoice:
      case AnswerTypeEnum.multiChoice:
        return <EditChoiceItems {...(choices as EditChoiceItemsProps)} />;
      case AnswerTypeEnum.link:
        return (
          <LinkAnswer
            name=""
            value=""
            onChange={() => {}}
            onToggleLinkType={() => {}}
            linkType={LinkTypeEnum.https}
            viewType={ViewTypeEnum.edit}
          />
        );
      case AnswerTypeEnum.upload:
        return (
          <UploaderAnswer
            files={[]}
            onUpload={() => {}}
            onRemove={() => {}}
            viewType={ViewTypeEnum.edit}
          />
        );
      default:
        return <></>;
    }
  }, [answerType, choices]);

  return (
    <>
      <TextField
        size="small"
        margin="dense"
        fullWidth
        required
        variant="outlined"
        label={questionLabel || 'Enter Question'}
        name="question"
        value={question}
        onChange={(event) => {
          event.preventDefault();
          onChangeQuestion(event.target.value);
        }}
      />
      <AnswerTypeSelector {...answerType} />
      {answerContent}
      {answerType.value !== AnswerTypeEnum.upload && showScoring && scoring && (
        <Scoring {...scoring} />
      )}
    </>
  );
}

export default memo(QuestionGroup);
