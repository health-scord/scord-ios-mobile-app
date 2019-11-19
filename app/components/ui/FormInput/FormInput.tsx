import * as React from "react";

import { FormInputProps } from "./FormInput.d";

import { compose } from "recompose";
import {
  handleTextInput,
  withNextInputAutoFocusInput
} from "react-native-formik";
import { TextInput as RNTextInput, View } from "react-native";
import { TextField } from 'react-native-ios-kit';
import Validation from "../Validation/Validation";

import styles from "../../../../build/styles";

class TextInput extends React.PureComponent<FormInputProps, any> {
  render() {
    const { 
      error, 
      value, 
      setFieldValue, 
      label, 
      placeholder, 
      type, 
      secureTextEntry, 
      style
    } = this.props;

    return (
      <View style={{ marginBottom: 30, ...style }}>
        <TextField
          placeholder={placeholder}
          // value={value}
          // onChange={setFieldValue}
          autoCompleteType={type}
          textContentType={type}
          secureTextEntry={secureTextEntry}
          // style={styles.formInput}
          {...this.props}
          // ios_backgroundColor={error ? "red" : "transparent"}
          onValueChange={setFieldValue}
        />
        {error ? <Validation intent="danger">{error}</Validation> : <></>}
        {/* <Text>{label}</Text> */}
      </View>
    );
  }
}

const FormInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextInput);

export default FormInput;
