import * as React from "react";

import { SummaryProps } from "./Summary.d";
import { View, Text, Linking } from "react-native";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

import styles from "../../../../build/styles";
import Callout from "../Callout/Callout";
import env from "../../../../env";
import SyncFitbit from "../SyncFitbit/SyncFitbit";
import FormContainer from "../FormContainer/FormContainer";

const Summary: React.FC<SummaryProps> = ({
                                             ref = null,
                                             className = "",
                                             onClick = e => console.info("Click"),
                                             userData = {},
                                             healthScore = null
                                         }) => {

  console.log('rendering SUmmary')    
  console.log(userData)                                      

  const clickHandler = e => onClick(e);

  return (
    <FormContainer>
      <View style={styles.summary}>
          {typeof userData.devices !== "undefined" && userData.devices.length > 0 ?
              (
                  <>
                      <Callout title="" intent="none">
                          Your account is all set up!
                      </Callout>
                  </>
              ) :
              (
                  <>
                      <Text style={styles.ctrlLabel}>Sync your fitbit to see your score</Text>
                      <SyncFitbit userData={userData}/>
                  </>
              )}
      </View>
    </FormContainer>
  );
};

export default Summary;
