import { memo, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { LinkTypeEnum, ViewTypeEnum } from '../enums';

export interface LinkAnswerProps {
  name?: string;
  value: string;
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  linkType: LinkTypeEnum;
  viewType: ViewTypeEnum;
  onChange: (value: string) => void;
  onToggleLinkType: (value: LinkTypeEnum) => void;
}

function LinkAnswer(props: LinkAnswerProps) {
  const {
    name,
    value,
    viewType,
    maxLength,
    minLength,
    disabled = false,
    linkType = LinkTypeEnum.http,
    onChange,
    onToggleLinkType
  } = props;
  const options = useMemo(() => {
    const kvs: Array<string> = [];
    for (let item in LinkTypeEnum) {
      kvs.push(Object(LinkTypeEnum)[item]);
    }
    return kvs;
  }, []);

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="center">
      <Grid item xs={12} md={10} lg={8}>
        <TextField
          fullWidth
          type="url"
          size="small"
          margin="dense"
          variant="outlined"
          name={name}
          value={value}
          label={viewType !== ViewTypeEnum.answer ? 'Answer Preview' : ''}
          placeholder="Type your link here..."
          disabled={disabled || viewType !== ViewTypeEnum.answer}
          onChange={(event) => {
            event.preventDefault();
            onChange(event.target.value);
          }}
          inputProps={{ maxLength, minLength }}
          InputLabelProps={{
            shrink: viewType !== ViewTypeEnum.answer
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Select
                  size="small"
                  margin="dense"
                  name="linkType"
                  labelId="link-type-select-label"
                  id="link-type-select"
                  value={linkType}
                  onChange={(event) => {
                    event.preventDefault();
                    onToggleLinkType(event.target.value as LinkTypeEnum);
                  }}
                >
                  {options.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </InputAdornment>
            )
          }}
        />
      </Grid>
    </Grid>
  );
}

export default memo(LinkAnswer);
