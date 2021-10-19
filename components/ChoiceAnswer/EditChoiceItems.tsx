import { memo, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import useTheme from '@mui/material/styles/useTheme';
import CloseIcon from '@mui/icons-material/Close';

export interface EditChoiceItemsProps {
  options: Array<{ value: string; name: string; label?: string }>;
  onChange: (name: string, value: string) => void;
  onAddMore: () => void;
  onRemove: (name: string) => void;
  maxItems?: number;
  maxItemsTipText?: string;
}

function EditChoiceItems(props: EditChoiceItemsProps) {
  const { options, onAddMore, onChange, onRemove, maxItems, maxItemsTipText } = props;
  const theme = useTheme();

  const canAddMore = useMemo(
    () => !maxItems || options.length < maxItems,
    [options.length, maxItems]
  );

  if (options.length < 2) {
    console.error('EditChoiceItems: "options" should be an array with more than 2 items');
    return <></>;
  }
  if (maxItems && maxItems <= 2) {
    console.error('EditChoiceItems: "maxItems" should be greater than 2');
    return <></>;
  }
  return (
    <>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        {options.map((opt, index) => {
          const { label, value, name } = opt;
          return (
            <Grid item xs={12} md={10} lg={8} key={index}>
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
                InputProps={{
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
          );
        })}
      </Grid>
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
