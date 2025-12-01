import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AnswerTypeEnum, ViewTypeEnum, LinkTypeEnum } from '../../enums';
import Scoring from '../Scoring';
import TextAnswer from '../TextAnswer';
import LinkAnswer from '../LinkAnswer';
import UploaderAnswer from '../UploaderAnswer';
import { EditChoiceItems, EditChoiceItemsProps } from '../ChoiceAnswer';
import AnswerTypeSelector from '../AnswerTypeSelector';
import useCustomTheme from '../../hooks/useCustomTheme';
import { QuestionGroupProps } from './types';

function QuestionGroup(props: QuestionGroupProps) {
  const {
    color,
    scoring,
    questionLabel,
    inputLabel,
    choices,
    answerType,
    question,
    readonly,
    showScoring,
    onChangeQuestion,
    ...rest
  } = props;

  const theme = useCustomTheme({ primaryColor: color });

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
            readonly={readonly}
            label={inputLabel}
            onChange={() => {}}
            viewType={ViewTypeEnum.edit}
            answerType={type}
          />
        );
      case AnswerTypeEnum.singleChoice:
      case AnswerTypeEnum.multiChoice:
        return <EditChoiceItems {...(choices as EditChoiceItemsProps)} readonly={readonly} />;
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
            readonly={readonly}
          />
        );
      case AnswerTypeEnum.upload:
        return (
          <UploaderAnswer
            color={color}
            files={[]}
            onUpload={() => {}}
            onRemove={() => {}}
            onDownload={() => {}}
            viewType={ViewTypeEnum.edit}
          />
        );
      default:
        return <></>;
    }
  }, [answerType, choices]);

  return (
    <ThemeProvider theme={theme}>
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
        InputProps={{ readOnly: readonly }}
        {...rest}
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
    </ThemeProvider>
  );
}

export default QuestionGroup;
export * from './types';
