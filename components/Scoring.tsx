import { memo, CSSProperties } from 'react';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormControlLabel from '@mui/material/FormControlLabel';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import NumberInput from './NumberInput';
import useCustomTheme from '../useCustomTheme';

export interface ScoringProps {
  color?: CSSProperties['color'];
  totalScore: number | string;
  passScore: number | string;
  turnOffScoring: boolean;
  onChangeTotalScore: (value: string) => void;
  onChangePassScore: (value: string) => void;
  onToggleScoring: (value: boolean) => void;
  turnOffScoringLabel?: string;
  passScoreLabel?: string;
  totalScoreLabel?: string;
  exceededErrText?: string;
}

/**
 * Component For custom question scoring
 */
function Scoring(props: ScoringProps) {
  const {
    color,
    turnOffScoring = false,
    passScore,
    totalScore,
    onChangeTotalScore,
    onChangePassScore,
    onToggleScoring,
    turnOffScoringLabel,
    passScoreLabel,
    totalScoreLabel,
    exceededErrText
  } = props;

  const theme = useCustomTheme({ primaryColor: color });
  // check if the page size is less than sm
  const isLessThanSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={isLessThanSm ? undefined : 1}
      >
        <Grid item xs={12} md={3} lg={2}>
          <NumberInput
            fullWidth
            color={color}
            required={!turnOffScoring}
            disabled={turnOffScoring}
            variant="outlined"
            label={totalScoreLabel || 'Total Score'}
            name="totalScore"
            value={totalScore}
            onChange={onChangeTotalScore}
            minValue={0}
          />
        </Grid>
        <Grid item xs={12} md={3} lg={2}>
          <NumberInput
            fullWidth
            color={color}
            required={!turnOffScoring}
            disabled={turnOffScoring}
            type="number"
            variant="outlined"
            label={passScoreLabel || 'Pass Score'}
            name="passScore"
            value={passScore}
            onChange={onChangePassScore}
            errMsg={exceededErrText || 'Pass Score should be less than the Total Score'}
            minValue={0}
            maxValue={totalScore || undefined}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={3} textAlign="left">
          <FormControlLabel
            label={turnOffScoringLabel || 'Turn off scoring'}
            control={
              <Switch
                checked={turnOffScoring}
                onChange={(event) => {
                  onToggleScoring(event.target.checked);
                }}
                name="turnOffScoring"
                color="primary"
              />
            }
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default memo(Scoring);
