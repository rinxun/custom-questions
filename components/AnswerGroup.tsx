import { memo, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AnswerTypeEnum } from '../enums';
import {
  SingleChoiceAnswer,
  SingleChoiceAnswerProps,
  MultiChoiceAnswer,
  MultiChoiceAnswerProps
} from './ChoiceAnswer';
import TextAnswer, { TextAnswerProps } from './TextAnswer';
import LinkAnswer, { LinkAnswerProps } from './LinkAnswer';
import UploaderAnswer, { UploaderAnswerProps } from './UploaderAnswer';

interface AnswerGroupProps {
  question: string;
  answerType: AnswerTypeEnum;
  totalScore?: number | string;
  passScore?: number | string;
  turnOffScoring?: boolean;
  answer:
    | LinkAnswerProps
    | TextAnswerProps
    | UploaderAnswerProps
    | SingleChoiceAnswerProps
    | MultiChoiceAnswerProps;
}

function AnswerGroup(props: AnswerGroupProps) {
  const { answerType, question, answer } = props;

  const answerContent = useMemo(() => {
    switch (answerType) {
      case AnswerTypeEnum.longText:
      case AnswerTypeEnum.shortText: {
        return <TextAnswer {...(answer as TextAnswerProps)} answerType={answerType} />;
      }
      case AnswerTypeEnum.singleChoice:
        return <SingleChoiceAnswer {...(answer as SingleChoiceAnswerProps)} />;
      case AnswerTypeEnum.multiChoice:
        return <MultiChoiceAnswer {...(answer as MultiChoiceAnswerProps)} />;
      case AnswerTypeEnum.link: {
        return <LinkAnswer {...(answer as LinkAnswerProps)} />;
      }
      case AnswerTypeEnum.upload: {
        return <UploaderAnswer {...(answer as UploaderAnswerProps)} />;
      }
      default:
        return <></>;
    }
  }, [answerType]);

  return (
    <>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="body2">{question}</Typography>
        </Grid>
      </Grid>
      {answerContent}
    </>
  );
}

export default memo(AnswerGroup);
