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
  color?: string;
  questionLabel?: string;
  inputLabel?: string;
  answerType: AnswerTypeSelectorProps;
  choices?: EditChoiceItemsProps;
  showScoring?: boolean;
  scoring?: ScoringProps;
  onChangeQuestion: (value: string) => void;
}

function QuestionGroup(props: QuestionGroupProps) {
  const {
    color,
    scoring,
    questionLabel,
    inputLabel,
    choices,
    answerType,
    question,
    onChangeQuestion,
    showScoring
  } = props;

  const answerContent = useMemo(() => {
    const { value: type } = answerType;
    switch (type) {
      case AnswerTypeEnum.longText:
      case AnswerTypeEnum.shortText:
        return (
          <TextAnswer
            color={color}
            name=""
            value=""
            label={inputLabel}
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
            color={color}
            name=""
            value=""
            label={inputLabel}
            onChange={() => {}}
            onToggleLinkType={() => {}}
            linkType={LinkTypeEnum.https}
            viewType={ViewTypeEnum.edit}
          />
        );
      case AnswerTypeEnum.upload:
        return (
          <UploaderAnswer
            color={color}
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
        InputProps={{
          sx: color
            ? {
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: color
                }
              }
            : undefined
        }}
        InputLabelProps={{
          sx: color ? { '&.Mui-focused': { color } } : undefined
        }}
      />
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        sx={{ mt: 0.125, mb: 0.5 }}
      >
        <Grid item xs={12} md={4} lg={3}>
          <AnswerTypeSelector {...answerType} />
        </Grid>
      </Grid>
      {answerContent}
      {answerType.value !== AnswerTypeEnum.upload && showScoring && scoring && (
        <Scoring {...scoring} />
      )}
    </>
  );
}

export default memo(QuestionGroup);
