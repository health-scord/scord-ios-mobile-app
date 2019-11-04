import * as React from "react";

import { FormInputProps } from "./FormInput.d";

import { compose } from "recompose";
import {
  handleTextInput,
  withNextInputAutoFocusInput
} from "react-native-formik";
import { TextInput as RNTextInput } from "react-native";
import Validation from "../Validation/Validation";

import styles from "../../../../build/styles";

class TextInput extends React.PureComponent<any, any> {
  render() {
    const { error, value, setFieldValue, label, placeholder, type, secureTextEntry } = this.props;

    console.info("err", error);

    return (
      <React.Fragment>
        <RNTextInput
          placeholder={placeholder}
          // value={value}
          // onChange={setFieldValue}
          autoCompleteType={type}
          textContentType={type}
          secureTextEntry={secureTextEntry}
          style={styles.formInput}
          {...this.props}
          // ios_backgroundColor={error ? "red" : "transparent"}
          // onValueChange={setFieldValue}
        />
        {error ? <Validation intent="danger">{error}</Validation> : <></>}
        {/* <Text>{label}</Text> */}
      </React.Fragment>
    );
  }
}

const FormInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextInput);

export default FormInput;
