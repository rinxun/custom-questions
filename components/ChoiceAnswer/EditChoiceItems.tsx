import { memo, useMemo } from 'react';
import colorAlpha from 'color-alpha';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import useTheme from '@mui/material/styles/useTheme';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { AnswerTypeEnum } from '../../enums';

export interface EditChoiceItemsProps {
  color?: string;
  options: Array<{ value: string; name: string; label?: string; correctAnswer?: boolean }>;
  onChange: (name: string, value: string) => void;
  onAddMore: () => void;
  onRemove: (name: string) => void;
  onToggleCorrectAnswer?: (name: string) => void;
  answerType: AnswerTypeEnum;
  needDefineCorrectAnswer?: boolean;
  correctAnswerIconTipText?: string;
  maxItems?: number;
  maxItemsTipText?: string;
}

function EditChoiceItems(props: EditChoiceItemsProps) {
  const {
    color,
    options,
    onAddMore,
    onChange,
    onRemove,
    onToggleCorrectAnswer,
    needDefineCorrectAnswer,
    correctAnswerIconTipText,
    answerType,
    maxItems,
    maxItemsTipText
  } = props;

  const theme = useTheme();

  const canAddMore = useMemo(
    () => !maxItems || options.length < maxItems,
    [options.length, maxItems]
  );

  if (options.length < 2) {
    console.error('EditChoiceItems: "options" should be an array with more than 2 items.');
    return <></>;
  }
  if (maxItems && maxItems <= 2) {
    console.error('EditChoiceItems: "maxItems" should be greater than 2.');
    return <></>;
  }
  if (needDefineCorrectAnswer) {
    if (!onToggleCorrectAnswer) {
      console.error(
        `EditChoiceItems: "onToggleCorrectAnswer" can't be null or undefined when "needDefineCorrectAnswer" is true.`
      );
      return <></>;
    }
    const allHasCorrectAnswerVar = options.every(
      (opt) => opt.correctAnswer !== undefined && opt.correctAnswer !== null
    );
    if (!allHasCorrectAnswerVar) {
      console.error(
        `EditChoiceItems: all options should include "correctAnswer" when "needDefineCorrectAnswer" is true.`
      );
      return <></>;
    }
    if (answerType === AnswerTypeEnum.singleChoice) {
      const correctAnswers = options.filter((opt) => opt.correctAnswer);
      if (correctAnswers.length > 1) {
        console.error(`EditChoiceItems: For Single Choice, only 1 correct answer can be set.`);
        return <></>;
      }
    }
  }
  return (
    <>
      {options.map((opt, index) => {
        const { label, value, name, correctAnswer } = opt;
        return (
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            key={index}
          >
            <Grid item xs={needDefineCorrectAnswer ? 11 : 12}>
              <TextField
                fullWidth
                required
                size="small"
                margin="dense"
                variant="outlined"
                label={label || `Choice ${index + 1}`}
                name={name}
                value={value}
                onChange={(event) => {
                  event.preventDefault();
                  onChange(name, event.target.value);
                }}
                InputLabelProps={{
                  sx: { '&.Mui-focused': { color } }
                }}
                InputProps={{
                  sx: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: color
                    }
                  },
                  endAdornment:
                    options.length > 2 ? (
                      <InputAdornment position="end">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => {
                            onRemove(name);
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ) : null
                }}
              />
            </Grid>
            {needDefineCorrectAnswer && onToggleCorrectAnswer && (
              <Grid item xs={1}>
                <Tooltip
                  title={correctAnswerIconTipText || 'Toggle it as correct / incorrect answer'}
                >
                  <IconButton
                    sx={{ color: correctAnswer ? 'forestgreen' : 'lightgray' }}
                    size="medium"
                    onClick={() => {
                      onToggleCorrectAnswer(name);
                    }}
                  >
                    <CheckIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        );
      })}
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ m: theme.spacing(1, 0) }}
      >
        {maxItems && (
          <Grid item xs={12}>
            <Typography
              variant="caption"
              component="p"
              align="left"
              color="red"
              sx={{ mb: theme.spacing(0.5) }}
            >
              {maxItemsTipText || `A maximum of ${maxItems} choices can be set!`}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={3} lg={2}>
          <Button
            fullWidth
            disabled={!canAddMore}
            variant="outlined"
            color="primary"
            onClick={onAddMore}
            sx={{
              '&.MuiButtonBase-root': {
                borderColor: canAddMore ? color : undefined,
                color: canAddMore ? color : undefined,
                '&:hover': {
                  backgroundColor: color && canAddMore ? colorAlpha(color, 0.05) : undefined
                }
              }
            }}
          >
            <Typography component="span" fontSize={14}>
              Add a New Choice
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default memo(EditChoiceItems);
