import type { CSSProperties } from 'react';
import type { ViewTypeEnum } from '../../enums';

export interface FileProps {
  id: string;
  fileName: string;
  fileKey?: string;
}

export interface FileUploadProps {
  maxWidth?: string;
  height?: string;
  color?: CSSProperties['color'];
  index?: number;
  multiple?: boolean;
  accept?: string;
  onUpload: (files: Array<File>, index?: number) => void;
  disabled?: boolean;
  maxSize?: number;
  loading?: boolean;
  wrongFileTypeErrText?: string;
  sizeExceededErrText?: string;
  dropFileText?: string;
  chooseFileText?: string;
}

export interface UploaderAnswerProps {
  color?: CSSProperties['color'];
  files: Array<FileProps>;
  multiple?: boolean;
  onUpload: (files: Array<File>, index?: number) => void;
  onRemove: (id: string) => void;
  onDownload: (id: string) => void;
  viewType: ViewTypeEnum;
  maxSize?: number;
  warmingTips?: string;
  wrongFileTypeErrText?: string;
  sizeExceededErrText?: string;
  dropFileText?: string;
  chooseFileText?: string;
}
