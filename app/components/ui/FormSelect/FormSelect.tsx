import * as React from 'react';
import {FormSelectProps} from './FormSelect.d';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../../../../build/styles';
import { View } from 'react-native';

const FormSelect: React.FC<FormSelectProps> = ({
  ref = null,
  className = '',
  onClick = e => console.info('Click'),
  formProps = null,
  items = [],
  onValueChange = () => console.info('onValueChange'),
  style = {}
}) => {
  const clickHandler = e => onClick(e);

  const [selection, setSelection] = React.useState(null);

  console.info('form props', formProps);
  let color = 'rgb(10, 122, 255)';
  if (selection !== null) {
    color = 'black';
  }

  return (
    <View style={style}>
      <RNPickerSelect
        onValueChange={value => {
          setSelection(value);
          onValueChange(value);
          // formProps.setFieldValue('gender', value);
        }}
        textInputProps={{
          style: {...styles.formInput, color},
        }}
        items={items}
        // items={[
        //     { label: 'Male', value: 'male' },
        //     { label: 'Female', value: 'female' }
        // ]}
      />
    </View>
  );
};

export default FormSelect;
