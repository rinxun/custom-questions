import type { ChangeEvent, CSSProperties } from 'react';

export interface NumberInputProps {
  name: string;
  color?: CSSProperties['color'];
  onChange: (value: string) => void;
  handleFocus?: () => void;
  handleLeave?: () => void;
  value: string | number;
  section?: string | number;
  maxValue?: string | number;
  minValue?: string | number;
  error?: boolean;
  errMsg?: string;
  integerOnly?: boolean;
  verifyFunc?: (value: number, minValue?: number, maxValue?: number) => boolean;
}

export interface NumberInputStates {
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: () => void;
}

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
