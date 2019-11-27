import * as React from "react";

import { AccountProps } from "./Account.d";
import { Text } from "react-native";
import NotchSpacer from "../../ui/NotchSpacer/NotchSpacer";
import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton";
import { useAppContext } from "../../../context";
import SyncFitbit from "../../ui/SyncFitbit/SyncFitbit";
import AuthClient from "../../../services/AuthClient";
import { Navigation } from "react-native-navigation";

const Account: React.FC<AccountProps> = ({ 
  componentId = null 
}) => {
  const authClient = new AuthClient();
  const [{ userData }, dispatch] = useAppContext();

  if (typeof userData === "undefined" || userData === null) return <></>

  return (
    <>
      <NotchSpacer />
      <SyncFitbit userData={userData} />
      <PrimaryButton 
        buttonProps={{ inverted: true, rounded: true }} 
        label="Reset My Password"
        onPress={() => {}}
      />
      <PrimaryButton 
        buttonProps={{ inverted: true, rounded: true }} 
        label="Logout" 
        onPress={() => {
          authClient.logout();
          Navigation.push(componentId, {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  visible: false
                }
              }
            }
          });
        }}
      />
    </>
  );
};

export default Account;
