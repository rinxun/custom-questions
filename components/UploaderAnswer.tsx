import { memo } from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { ViewTypeEnum } from '../enums';
import FileUploader from './FileUploader';

export interface FileProps {
  id: string | number;
  fileName: string;
  fileKey?: string;
}

export interface UploaderAnswerProps {
  color?: string;
  files: Array<FileProps>;
  onUpload: (files: Array<File>, index?: number) => void;
  onRemove: (id: string | number) => void;
  viewType: ViewTypeEnum;
  maxSize?: number;
  warmingTips?: string;
  wrongFileTypeErrText?: string;
  sizeExceededErrText?: string;
  dropFileText?: string;
  chooseFileText?: string;
}

function UploaderAnswer(props: UploaderAnswerProps) {
  const { files, color, onUpload, onRemove, viewType, warmingTips, maxSize, ...rest } = props;

  return (
    <>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <Grid item xs={12}>
          <Typography component="p" variant="caption" color="gray" align="left">
            {warmingTips ??
              `Documents can be uploaded in pdf, xls, doc & jpeg formats. Maximum size allowed is ${
                maxSize ?? 5
              } MB.`}
          </Typography>
        </Grid>
        {viewType !== ViewTypeEnum.edit && (
          <Grid item xs={12} md={10} lg={8}>
            <FileUploader
              color={color}
              onUpload={onUpload}
              disabled={viewType !== ViewTypeEnum.answer}
              maxSize={maxSize}
              {...rest}
            />
          </Grid>
        )}
      </Grid>
      {viewType === ViewTypeEnum.answer && files && files.length > 0 && (
        <>
          <Typography component="p" variant="body2" align="left">
            Files:
          </Typography>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            {files.map((file) => {
              const { id, fileName, fileKey } = file;
              return (
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  key={fileKey ?? id}
                >
                  <Grid item xs={11} sm={8} md={6} lg={5} xl={4}>
                    <Typography noWrap title={fileName} variant="subtitle2" align="left">
                      {fileName}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(event) => {
                        event.preventDefault();
                        onRemove(fileKey ?? id);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
}

export default memo(UploaderAnswer);
