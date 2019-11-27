import * as React from 'react';
import {FormSelectProps} from './FormSelect.d';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../../../../build/styles';
import { View, Button } from 'react-native';
import { ModalDialog, ModalDialogHandle, Select } from 'react-native-propel-kit';

const FormSelect: React.FC<FormSelectProps> = ({
  ref = null,
  className = '',
  onClick = e => console.info('Click'),
  formProps = null,
  placeholder = "",
  name = "",
  items = [],
  onValueChange = () => console.info('onValueChange'),
  style = {}
}) => {
  // const modalDialogRef = React.useRef<ModalDialogHandle>(null);

  return (
    <Select 
      value={formProps.values[name]} 
      onChange={(val) => { 
        formProps.setFieldValue(name, val);
      }}  
      placeholder={placeholder}
    >
      {items.map(({value, label}) => (
        <Select.Item key={value} value={value} label={label} />
      ))}
    </Select>
  );

  // const clickHandler = e => onClick(e);

  // const [selection, setSelection] = React.useState(null);

  // let color = 'rgb(10, 122, 255)';
  // if (selection !== null) {
  //   color = 'black';
  // }

  // return (
  //   <View style={style}>
  //     <RNPickerSelect
  //       onValueChange={value => {
  //         setSelection(value);
  //         onValueChange(value);
  //       }}
  //       textInputProps={{
  //         style: {...styles.formInput, color},
  //       }}
  //       items={items}
  //     />
  //   </View>
  // );
};

export default FormSelect;
