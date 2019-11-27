import * as React from "react";

import { SummaryProps } from "./Summary.d";
import { View, Text, Linking } from "react-native";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

import styles from "../../../../build/styles";
import Callout from "../Callout/Callout";
import env from "../../../../env";
import SyncFitbit from "../SyncFitbit/SyncFitbit";

const Summary: React.FC<SummaryProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  userData = {}
}) => {
  const clickHandler = e => onClick(e);

  

  return (
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
            <SyncFitbit userData={userData} />
          </>
        )}
    </View>
  );
};

export default Summary;
