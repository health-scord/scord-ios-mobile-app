import * as React from "react";
import { FormSelectProps } from "./FormSelect.d";
import RNPickerSelect from 'react-native-picker-select';
import styles from "../../../../build/styles";

const FormSelect: React.FC<FormSelectProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  formProps = null,
  items = null,
  onValueChange = () => console.info("onValueChange")
}) => {
  const clickHandler = e => onClick(e);

  const [selection, setSelection] = React.useState(null);

  console.info("form props", formProps);
  let color = "#9B9B9B";
  if (selection !== null) {
    color = "black";
  }

  return (
    <RNPickerSelect
        onValueChange={(value) => {
          setSelection(value);
          onValueChange(value);
          // formProps.setFieldValue('gender', value);
        }}
        textInputProps={{
          style: { ...styles.formInput, color }
        }}
        items={items}
        // items={[
        //     { label: 'Male', value: 'male' },
        //     { label: 'Female', value: 'female' }
        // ]}
    />
  );
};

export default FormSelect;
