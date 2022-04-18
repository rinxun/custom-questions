import { memo, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
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
import useCustomTheme from '../useCustomTheme';

interface AnswerGroupProps {
  question: string;
  answerType: AnswerTypeEnum;
  answer:
    | LinkAnswerProps
    | TextAnswerProps
    | UploaderAnswerProps
    | SingleChoiceAnswerProps
    | MultiChoiceAnswerProps;
}

function AnswerGroup(props: AnswerGroupProps) {
  const { answerType, question, answer } = props;

  const theme = useCustomTheme();

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
  }, [answerType, answer]);

  return (
    <ThemeProvider theme={theme}>
      <Typography fontSize={16} fontWeight={600} align="left">
        {question}
      </Typography>
      {answerContent}
    </ThemeProvider>
  );
}

export default memo(AnswerGroup);
