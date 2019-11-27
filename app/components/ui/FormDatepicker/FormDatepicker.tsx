import * as React from "react";

import { FormDatepickerProps } from "./FormDatepicker.d";

// import DatePicker from 'react-native-datepicker';
import { DatePicker } from 'react-native-propel-kit';
import StyleHelpers from "../../../services/StyleHelpers";
import styles from "../../../../build/styles";
import { View, Text } from "react-native";

const FormDatepicker: React.FC<FormDatepickerProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  placeholder = "Pick Date",
  formProps = null,
  name = ""
}) => {
  const styleHelpers = new StyleHelpers();

  const clickHandler = e => onClick(e);

  // const [date, setDate] = React.useState(new Date());

  console.info(formProps)

  return (
    <View>
      <DatePicker 
        {...formProps}
        title={placeholder} 
        value={new Date(formProps.values[name])} 
        onChange={(date) => { 
          formProps.setFieldValue(name, date.toISOString());
        }} 
      />
    </View>
  );

  // return (
  //   <DatePicker
  //     style={{ 
  //       width: styleHelpers.perc(80), 
  //       marginBottom: 15, 
        
  //     }}
  //     date={date}
  //     mode="date"
  //     placeholder={placeholder}
  //     format="YYYY-MM-DD"
  //     // minDate="2016-05-01"
  //     // maxDate="2016-06-01"
  //     confirmBtnText="Confirm"
  //     cancelBtnText="Cancel"
  //     customStyles={{
  //       dateInput: {
  //         flexDirection: "row",
  //           justifyContent: "flex-start",
  //           top: 6,
  //           borderBottomWidth: 1,
  //       borderBottomColor: "red" 
  //       },
  //       placeholderText: {
  //         fontSize: 18,
  //         color: "grey"
  //       },
  //       dateText: {
  //         fontSize: 18,
  //         color: "grey"
  //       }
  //     }}
  //     onDateChange={(date) => {
  //       setDate(date);
  //       formProps.setFieldValue(name, date);
  //     }}
  //     showIcon={false}
  //   />
  // );
};

export default FormDatepicker;
