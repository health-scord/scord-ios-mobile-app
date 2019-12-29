import * as React from "react";

import { AccountProps } from "./Account.d";
import { Text, ScrollView } from "react-native";
import NotchSpacer from "../../ui/NotchSpacer/NotchSpacer";
import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton";
import { useAppContext } from "../../../context";
import SyncFitbit from "../../ui/SyncFitbit/SyncFitbit";
import AuthClient from "../../../services/AuthClient";
import NavigationService from "../../../services/NavigationService";
import {Navigation} from "react-native-navigation";
import FormContainer from "../../ui/FormContainer/FormContainer";

const Account: React.FC<AccountProps> = ({
                                             componentId = null
                                         }) => {
    const navigationService = new NavigationService();
    const authClient = new AuthClient();
    const [{userData}, dispatch] = useAppContext();

    if (typeof userData === "undefined" || userData === null) return <></>

    return (
        <ScrollView>
            <NotchSpacer/>
      <FormContainer>
          <SyncFitbit userData={userData} passProps={{styles: {marginBottom: 25}}}/>
          <PrimaryButton
              styles={{marginBottom: 25}}
              buttonProps={{inverted: true, rounded: true}}
              label="Reset My Password"
              onPress={() => {
                  Navigation.push(componentId, {
                      component: {
                          name: 'ForgotPassword',
                          options: {
                              topBar: {
                                  visible: false
                              }
                          }
                      }
                  });
              }}
          />
          <PrimaryButton
              styles={{marginBottom: 25}}
              buttonProps={{inverted: true, rounded: true}}
              label="Logout"
              onPress={() => {
                  authClient.logout();
                  navigationService.navigateToAuth(Navigation, componentId);
                  // Navigation.push(componentId, {
                  //   component: {
                  //     name: 'Login',
                  //     options: {
                  //       topBar: {
                  //         visible: false
                  //       }
                  //     }
                  //   }
                  // });
              }}
        />
      </FormContainer>
    </ScrollView>
  );
};

export default Account;
