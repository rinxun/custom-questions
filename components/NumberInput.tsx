import { useState, useEffect, ChangeEvent, memo, CSSProperties } from 'react';
import Field, { TextFieldProps } from '@mui/material/TextField';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import useCustomTheme from '../useCustomTheme';

type TextProps = Omit<Omit<TextFieldProps, 'onChange'>, 'color'>;

interface NumberInputProps {
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

function NumberInput(props: NumberInputProps & TextProps) {
  const {
    name,
    label,
    value,
    color,
    section,
    minValue = Number.MIN_SAFE_INTEGER,
    maxValue = Number.MAX_SAFE_INTEGER,
    onChange,
    error = false,
    errMsg = 'Your value exceeds the exceptable input range',
    integerOnly = false,
    handleFocus = () => {},
    handleLeave = () => {},
    verifyFunc,
    ...rest
  } = props;

  const theme = useCustomTheme({ primaryColor: color });

  const [helperTextOpen, setHelperTextOpen] = useState(error || false);

  if (maxValue < minValue) throw new Error('NumberInput: Max should be bigger than min!');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    err = false
  ): void => {
    let errorTemp = err;
    event.preventDefault();
    const val = event.currentTarget.value;
    // When the min value is greater than or equal to 0, negative integers are not allowed
    if (val !== '' && minValue >= 0 && val.includes('-')) return;
    if (integerOnly) {
      // Verify that it is integer
      if (val !== '' && val !== '-' && !/^\d+$/g.test(val)) return;
      // verify that it is decimal
    } else if (val !== '' && val !== '-' && !/^(-?\d*)(\.\d*)?$/g.test(val)) return;

    onChange(val);
    if (
      verifyFunc
        ? !verifyFunc(Number(val), Number(minValue), Number(maxValue))
        : val !== '' &&
          val !== null &&
          val !== undefined &&
          (Number(val) < Number(minValue) || Number(val) > Number(maxValue))
    ) {
      errorTemp = true;
    }
    setHelperTextOpen(errorTemp);
  };

  const handleBlur = () => {
    const excludedValue = [null, undefined, '.', '', '-', '-.', 'null', 'undefined'];
    const strVal = String(value).trim();
    if (strVal !== null && strVal.lastIndexOf('.') === strVal.length - 1) {
      // eg. '20.'
      const newValue = strVal.substring(0, String(value).length - 1);
      onChange(newValue);
    } else if (excludedValue.includes(strVal)) {
      onChange('');
    }
  };

  // for verification if maxValue/minValue changed
  useEffect(() => {
    if (
      verifyFunc
        ? !verifyFunc(Number(value), Number(minValue), Number(maxValue))
        : value !== null &&
          value !== undefined &&
          (Number(value) < Number(minValue) || Number(value) > Number(maxValue))
    ) {
      setHelperTextOpen(true);
    } else {
      setHelperTextOpen(error !== null || error !== undefined ? error : false);
    }
  }, [error, maxValue, minValue, value, verifyFunc]);

  return (
    <ThemeProvider theme={theme}>
      <Field
        size="small"
        margin="dense"
        type="number"
        name={name}
        label={label}
        value={value === undefined || value === null ? '' : value}
        InputProps={{
          onFocus: () => {
            handleFocus();
          },
          onBlur: () => {
            handleBlur();
            handleLeave();
          }
        }}
        onChange={(event) => {
          handleChange(event);
        }}
        error={error || helperTextOpen}
        helperText={error || helperTextOpen ? errMsg : ''}
        {...rest}
      />
    </ThemeProvider>
  );
}

export default memo(NumberInput);
