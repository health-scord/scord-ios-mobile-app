import * as React from "react";

import { SyncFitbitProps } from "./SyncFitbit.d";
import { Linking } from "react-native";

import env from "../../../../env";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

const SyncFitbit: React.FC<SyncFitbitProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  userData = {}
}) => {
  const clickHandler = e => onClick(e);

  const syncFitbit = (e) => {
    const url = env.restUri + `/accounts/${
      userData.id
    }/authorizeDevice/fitbit`;

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });

    clickHandler(e);
  };

  return (
    <PrimaryButton 
      buttonProps={{ inverted: true, rounded: true }} 
      label="Sync my fitbit" 
      onPress={syncFitbit}
    />
  );
};

export default SyncFitbit;