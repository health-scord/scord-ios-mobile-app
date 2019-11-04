import * as React from "react";

import { FormAddressInputProps } from "./FormAddressInput.d";

import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { TextInput, ScrollView, View, Text, TouchableHighlight } from "react-native";
import ShadowView from 'react-native-shadow-view';
import StyleHelpers from "../../../services/StyleHelpers";

import styles from "../../../../build/styles";

const FormAddressInput: React.FC<FormAddressInputProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const styleHelpers = new StyleHelpers();
  const clickHandler = e => onClick(e);
  return (
    <GoogleAutoComplete apiKey="AIzaSyB8OHaKoWjlSoquN0y_topQeUngZCj5xjE" debounce={300}>
      {({ inputValue, handleTextChange, locationResults, fetchDetails }) => (
        <React.Fragment>
          <TextInput
            style={{
              width: styleHelpers.perc(80),
              ...styles.formInput
            }}
            value={inputValue}
            onChangeText={handleTextChange}
            placeholder="Location..."
          />
          {locationResults.length > 1 ?
            <ShadowView style={{
                zIndex: 100,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0, height: 2,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4
            }}>
                <ScrollView style={{ 
                  maxHeight: 100, 
                  position: "absolute", 
                  backgroundColor: "white", 
                  
                }}>
                  {locationResults.map((el, i) => { 
                    console.info("el", el);
                    return (
                      <TouchableHighlight 
                        underlayColor="#E5E5E5"
                        onPress={() => handleTextChange(el.description)}
                        style={{ padding: 5 }}
                      >
                        <Text>{el.description}</Text>
                      </TouchableHighlight>
                    )
                  })}
                </ScrollView>
            </ShadowView>
            : <></>}
        </React.Fragment>
      )}
    </GoogleAutoComplete>
  );
};

export default FormAddressInput;
