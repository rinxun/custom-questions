import type { CSSProperties } from 'react';
import type { LinkTypeEnum, ViewTypeEnum } from '../../enums';

export interface LinkAnswerProps {
  name?: string;
  value: string;
  label?: string;
  color?: CSSProperties['color'];
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  linkType: LinkTypeEnum;
  viewType: ViewTypeEnum;
  onChange: (value: string) => void;
  onToggleLinkType: (value: LinkTypeEnum) => void;
}
