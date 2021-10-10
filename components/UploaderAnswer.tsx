import { memo } from 'react';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
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
  files: Array<FileProps>;
  onUpload: (files: Array<File>, index?: number) => void;
  onRemove: (id: string | number) => void;
  viewType: ViewTypeEnum;
  warmingTips?: string;
}

function UploaderAnswer(props: UploaderAnswerProps) {
  const { files, onUpload, onRemove, viewType, warmingTips } = props;

  return (
    <>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <Typography variant="caption" color="gray" align="left">
          {warmingTips ??
            'Documents can be uploaded in pdf, xls, doc & jpeg formats. Maximum size allowed is 5MB.'}
        </Typography>
        {viewType !== ViewTypeEnum.edit && (
          <Grid item xs={12} md={10} lg={8}>
            <FileUploader onUpload={onUpload} disabled={viewType !== ViewTypeEnum.answer} />
          </Grid>
        )}
      </Grid>
      {viewType === ViewTypeEnum.answer && files && files.length > 0 && (
        <>
          <Typography variant="body2" color="primary">
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
                    <Typography noWrap title={fileName} variant="subtitle2">
                      {fileName}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Tooltip title="Remove">
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={(event) => {
                          event.preventDefault();
                          onRemove(fileKey ?? id);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
