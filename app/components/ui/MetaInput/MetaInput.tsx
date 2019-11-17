import * as React from "react";

import { MetaInputProps } from "./MetaInput.d";
import { Button, View, Switch, Text, TouchableOpacity, TouchableHighlight, TextInput } from "react-native";
import StarRating from "../StarRating/StarRating";

import styles from "../../../../build/styles";

import DropdownIcon from "../../../../assets/svg/dropdownIcon";
import Right from "../../../../assets/svg/right";
import Plus from "../../../../assets/svg/plus";
import StyleHelpers from "../../../services/StyleHelpers";
import { Navigation } from 'react-native-navigation';
import RNPickerSelect from 'react-native-picker-select';

const MetaInput: React.FC<MetaInputProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  label = "",
  type = "switch",
  value = null,
  details = null,
  formProps = null,
  name = "",
  clickable = false,
  extraText = "",
  extraComp = null,
  defaultOpen = false,
  defaultItem = null,
  selectItems = [],
  componentId = null,
  children = null
}) => {
  const styleHelpers = new StyleHelpers();

  const pickerRef = React.useRef(null);
  const [specialText, setSpecialText] = React.useState("");
  const [open, setOpen] = React.useState(defaultOpen);
  const [on, setOn] = React.useState(false);

  console.info("pickerRef", pickerRef);

  let ctrl = <></>;
  let clickHandler = () => console.info("click");
  switch (type) {
    case "number":
      ctrl = (
        <TextInput 
          style={styles.numberInput}
          onChangeText={(value) => formProps.setFieldValue(name, value)}
          value={formProps.values[name]}
        />
      )
      break;
    case "accordion":
      ctrl = (
        <View style={styles.extraTextWrapper}>
          <Text style={styles.extraText}>{extraText}</Text>
          <DropdownIcon style={styles.extraIcon} width="16" height="16" />
        </View>
      )
      break;
    case "activitySelector":
      // clickHandler = () => formProps.setFieldValue(name, !formProps.values[name]);
      clickHandler = () => {
        Navigation.showModal({
          stack: {
            children: [{
              component: {
                name: 'AddActivities',
                passProps: {
                  onInitialSelection: (activity, compId) => {
                    Navigation.dismissModal(compId);
                    formProps.setFieldValue(name, activity.id);
                    setSpecialText(activity.name);
                    console.info("onInitialSelection", componentId, name, activity);
                  }
                },
                // options: {
                //   topBar: {
                //     title: {
                //       text: 'Welcome'
                //     }
                //   }
                // }
              }
            }]
          }
        });
      }
      ctrl = (
        <View style={{ ...styles.extraTextWrapper, ...styles.inlineRow }}>
          {/* <Text style={styles.extraText}>{extraText}</Text> */}
          <Text style={styles.extraText}>{specialText}</Text>
          <Plus style={styles.extraIcon} width="16" height="16" />
        </View>
      )
      break;
    case "ratingRange":
      // ctrl = (
      //   <View style={{ ...styles.ratingWrapper, ...styles.inlineRow }}>
      //     {extraComp}
      //   </View>
      // )
      ctrl = (
        <View style={{ ...styles.extraTextWrapper, ...styles.inlineRow }}>
          {/* <Text style={styles.extraText}>{extraText}</Text> */}
          <Text style={styles.extraText}>{specialText}</Text>
          <DropdownIcon style={styles.extraIcon} width="16" height="16" />
        </View>
      )
      break;
    case "select":
      console.info("select", name, formProps.values[name])
      clickHandler = () => pickerRef.current.togglePicker();
      ctrl = (
        <View style={{ ...styles.extraTextWrapper, ...styles.inlineRow }}>
          <RNPickerSelect
            ref={pickerRef}
            onValueChange={(value) => formProps.setFieldValue(name, value)}
            value={formProps.values[name]}
            items={selectItems}
            // style={styles.extraText}
            textInputProps={{ style: styles.extraText }}
          />
          {/* <Text style={styles.extraText}>{extraText}</Text> */}
          <Right width="20" height="20" />
        </View>
      )
      break;
    case "switch":
      clickHandler = () => formProps.setFieldValue(name, !formProps.values[name]);
      ctrl = (
        <Switch 
          style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
          trackColor={{ false: "#FE0B84", true: "#FE0B84" }}
          onValueChange={(value) => formProps.setFieldValue(name, value)}
          value={formProps.values[name]}
        />
      )
      break;
  
    case "rating":
      clickHandler = () => formProps.setFieldValue(name, !formProps.values[name]);
      ctrl = (
        <StarRating
          onValueChange={(value) => formProps.setFieldValue(name, value)}
          value={formProps.values[name]}
          
        />
      )
      break;
    case "none":
        ctrl = (
        <View style={styles.extraTextWrapper}>
          <Text style={styles.extraText}>{extraText}</Text>
        </View>
      )
      break;
  }

  const detailComp = details !== null ?
    <Button title="DETAILS" />
    : <></>;

    const bodyComp = open ? 
      <View style={styles.accordionBody}>
        {children}
      </View>
      : <></>;

  if (type === "accordion") {
    return (
      <View>
        <TouchableHighlight 
          underlayColor="#E5E5E5"
          onPress={() => setOpen(!open)}  
        >
          <View style={{ ...styles.inlineRow, ...styles.spaceBetween, ...styles.metaInput }}>
            <View style={styles.inlineRow}>
              <Text style={styles.metaInputLabel}>{label}</Text>
              {detailComp}
            </View>
            {ctrl}
          </View>
        </TouchableHighlight>
        {bodyComp}
      </View>
    );
  } else {
    if (clickable) {
      return (
        <View>
          <TouchableHighlight 
            underlayColor="#E5E5E5"
          // style={{  }}
            onPress={clickHandler}
          >
            <View style={{ ...styles.inlineRow, ...styles.spaceBetween, ...styles.metaInput }}>
              <View style={styles.inlineRow}>
                <Text style={styles.metaInputLabel}>{label}</Text>
                {detailComp}
              </View>
              {ctrl}
            </View>
          </TouchableHighlight>
          {bodyComp}
        </View>
      );
    } else {
      return (
        <View>
          <View style={{ ...styles.inlineRow, ...styles.spaceBetween, ...styles.metaInput }}>
            <View style={styles.inlineRow}>
              <Text style={styles.metaInputLabel}>{label}</Text>
              {detailComp}
            </View>
            {ctrl}
          </View>
          {bodyComp}
        </View>
      );
    }
  }
  
};

export default MetaInput;
