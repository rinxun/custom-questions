import { CSSProperties, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/FileDownload';
import { ViewTypeEnum } from '../enums';
import FileUploader from './FileUploader';
import useCustomTheme from '../useCustomTheme';

export interface FileProps {
  id: string;
  fileName: string;
  fileKey?: string;
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

function UploaderAnswer(props: UploaderAnswerProps) {
  const {
    files,
    color,
    multiple,
    viewType,
    warmingTips,
    maxSize,
    onUpload,
    onRemove,
    onDownload,
    ...rest
  } = props;

  const theme = useCustomTheme({ primaryColor: color });

  const uploaderDisabled = useMemo(() => {
    if (viewType !== ViewTypeEnum.answer) {
      return true;
    } else if (!multiple && files.length > 0) {
      return true;
    } else {
      return false;
    }
  }, [multiple, viewType, files]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <Grid item xs={12}>
          <Typography component="p" variant="caption" color="gray" align="left">
            {warmingTips ??
              `Documents can be uploaded in pdf, xls, doc & jpeg formats. Maximum size allowed is ${
                maxSize ?? 5
              } MB.`}
          </Typography>
        </Grid>
        {(viewType === ViewTypeEnum.answer || files?.length === 0) && (
          <Grid item xs={12} md={10} lg={8}>
            <FileUploader
              color={color}
              multiple={multiple}
              onUpload={onUpload}
              disabled={uploaderDisabled}
              maxSize={maxSize}
              {...rest}
            />
          </Grid>
        )}
      </Grid>
      {files?.length > 0 && (
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
                    {viewType === ViewTypeEnum.answer ? (
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
                    ) : (
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(event) => {
                          event.preventDefault();
                          onDownload(fileKey ?? id);
                        }}
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </ThemeProvider>
  );
}

export default UploaderAnswer;
