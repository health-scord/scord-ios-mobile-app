import * as React from "react";

import { FormContainerProps } from "./FormContainer.d";
import { View, Dimensions } from "react-native";

import styles from "../../../../build/styles";
import StyleHelpers from "../../../services/StyleHelpers";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const FormContainer: React.FC<FormContainerProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  children = null
}) => {
  const styleHelpers = new StyleHelpers();

  return (
    <>
      <View style={{ ...styles.formContainer, width: styleHelpers.perc(80) }}>
        {children}
      </View>
    </>
  );
};

export default FormContainer;
