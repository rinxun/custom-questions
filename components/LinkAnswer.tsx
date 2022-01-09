import { memo, useMemo } from 'react';
import colorAlpha from 'color-alpha';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { LinkTypeEnum, ViewTypeEnum } from '../enums';
import withTheme from './withTheme'

export interface LinkAnswerProps {
  name?: string;
  value: string;
  label?: string;
  color?: string;
  required?: boolean;
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
    label,
    color,
    required,
    viewType,
    maxLength,
    minLength,
    disabled = false,
    linkType = LinkTypeEnum.http,
    onChange,
    onToggleLinkType
  } = props;

  const options = useMemo(
    () => [
      { label: 'http://', value: LinkTypeEnum.http },
      { label: 'https://', value: LinkTypeEnum.https },
      { label: 'mailto://', value: LinkTypeEnum.mailto },
      { label: 'ftp://', value: LinkTypeEnum.ftp },
      { label: 'sftp://', value: LinkTypeEnum.sftp }
    ],
    []
  );

  return (
    <TextField
      fullWidth
      type="url"
      size="small"
      margin="dense"
      variant="outlined"
      name={name}
      value={value}
      label={label ?? (viewType !== ViewTypeEnum.answer ? 'Preview' : '')}
      placeholder="Type your link here..."
      disabled={disabled || viewType !== ViewTypeEnum.answer}
      onChange={(event) => {
        event.preventDefault();
        onChange(event.target.value);
      }}
      inputProps={{ maxLength, minLength }}
      InputLabelProps={{
        shrink: viewType !== ViewTypeEnum.answer,
        sx: { '&.Mui-focused': { color } }
      }}
      InputProps={{
        sx: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: color
          }
        },
        startAdornment: (
          <InputAdornment position="start">
            <Select
              required={required}
              size="small"
              variant="standard"
              margin="dense"
              name="linkType"
              labelId="link-type-select-label"
              id="link-type-select"
              value={linkType}
              sx={{
                '&.Mui-focused .MuiInputBase-root': { borderBottomColor: color },
                '&.MuiInputBase-root:after': { borderBottomColor: color }
              }}
              onChange={(event) => {
                event.preventDefault();
                onToggleLinkType(event.target.value as LinkTypeEnum);
              }}
            >
              {options.map((opt) => (
                <MenuItem
                  key={opt.value}
                  value={opt.value}
                  sx={{
                    '&.MuiMenuItem-root.Mui-selected': {
                      backgroundColor: color ? colorAlpha(color, 0.08) : undefined
                    }
                  }}
                >
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </InputAdornment>
        )
      }}
    />
  );
}

export default withTheme(memo(LinkAnswer));
