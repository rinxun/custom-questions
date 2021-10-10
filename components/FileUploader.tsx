import { memo } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface FileUploadProps {
  maxWidth?: string;
  height?: string;
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

/**
 * Upload file component
 * @param maxWidth the maxWidth of container box
 * @param height the height of container box
 * @param index the index of upload file component for a page
 * @param multiple allow multiple files
 * @param accept set accepted file type
 * @param handleFile handle the file
 */
function FileUpload(props: FileUploadProps) {
  const {
    index = 0,
    height = '150px',
    maxSize = 1024 * 1024 * 5,
    maxWidth = '430px',
    accept = '',
    multiple = true,
    disabled = false,
    loading = false,
    onUpload,
    wrongFileTypeErrText,
    sizeExceededErrText,
    dropFileText,
    chooseFileText
  } = props;
  const ERROR_MSG =
    wrongFileTypeErrText || 'The type of the file you uploaded is not accepted, please reupload!';
  const ERROR_SIZE_MSG =
    sizeExceededErrText || `Your file exceed the max size of ${maxSize / 1024 / 1024}MB.`;
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down('sm'));

  const onDrop = (acceptedFiles: Array<File>, rejectedFiles: Array<FileRejection>) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      const acceptArr = (accept && accept.split(',')) || [];
      rejectedFiles.some((rejectedFile: FileRejection) => {
        const { file } = rejectedFile;
        // this is for error file type
        if (acceptArr.length !== 0 && !acceptArr.includes(file.type)) {
          alert(ERROR_MSG);
          return true;
          // this if for oversize
        }
        if (file.size > maxSize) {
          alert(ERROR_SIZE_MSG);
          return true;
        }
        return false;
      });
    } else {
      // this is for accepted files
      onUpload(acceptedFiles, index);
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept,
    multiple,
    disabled,
    maxSize
  });

  const rootProps = getRootProps({
    onClick: (e) => e.stopPropagation(),
    onKeyDown: (e) => {
      if (e.key === 'Space' || e.key === 'Enter') {
        e.stopPropagation();
      }
    }
  });

  return (
    <>
      {lessThanSm ? (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Link
            color={disabled ? theme.palette.grey[400] : theme.palette.primary.main}
            sx={{
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <CircularProgress sx={{ height: '25px', width: '25px' }} />
            ) : (
              chooseFileText || 'Choose a file'
            )}
          </Link>
        </div>
      ) : (
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px dashed #0099a7',
            borderRadius: '5px',
            outline: 'none',
            backgroundColor: '#F2F2F2',
            maxWidth,
            height,
            width: '100%'
          }}
          {...rootProps}
        >
          {loading ? (
            <CircularProgress style={{ height: '30px', width: '30px' }} />
          ) : (
            <div>
              <input {...getInputProps()} />
              <Typography
                component="p"
                variant="caption"
                sx={{
                  fontSize: '.875rem',
                  textAlign: 'center'
                }}
              >
                {dropFileText || 'Drop files here'}
              </Typography>
              <Button
                variant="contained"
                onClick={open}
                sx={{
                  backgroundColor: 'white !important',
                  color: disabled ? theme.palette.grey[400] : theme.palette.primary.main,
                  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                  cursor: disabled ? 'not-allowed' : 'pointer'
                }}
                disabled={disabled}
              >
                <Typography>{chooseFileText || 'Choose a file'}</Typography>
              </Button>
            </div>
          )}
        </Grid>
      )}
    </>
  );
}

export default memo(FileUpload);
