import * as React from "react";

import { AccountProps } from "./Account.d";
import { Text, ScrollView, View } from "react-native";
import NotchSpacer from "../../ui/NotchSpacer/NotchSpacer";
import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton";
import { useAppContext } from "../../../context";
import SyncFitbit from "../../ui/SyncFitbit/SyncFitbit";
import AuthClient from "../../../services/AuthClient";
import NavigationService from "../../../services/NavigationService";
import {Navigation} from "react-native-navigation";
import FormContainer from "../../ui/FormContainer/FormContainer";

import Modal from "react-native-modal";
import StorageClient from "../../../services/StorageClient";

const Account: React.FC<AccountProps> = ({
  componentId = null
}) => {
    const navigationService = new NavigationService();
    const authClient = new AuthClient();
    const storageClient = new StorageClient();
    const [{userData}, dispatch] = useAppContext();

    const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);

    if (typeof userData === "undefined" || userData === null) return <></>

    return (
        <ScrollView>
            <NotchSpacer/>
      <FormContainer>
          {/* <SyncFitbit userData={userData} passProps={{styles: {marginBottom: 25}}}/>
          <PrimaryButton
              styles={{marginBottom: 25}}
              buttonProps={{inverted: true, rounded: true}}
              label="Reset My Password"
              onPress={() => {
                  Navigation.push(componentId, {
                      component: {
                          name: 'ForgotPassword'
                      }
                  });
              }}
          /> */}
          {/* <PrimaryButton
              styles={{marginBottom: 25}}
              buttonProps={{inverted: true, rounded: true}}
              label="Delete Account"
              onPress={() => {
                // delete  
                setDeleteModalVisible(!deleteModalVisible);
                authClient.deleteLocalUser().then(() => {
                  authClient.deleteAuthUser().then(() => {

                  });
                });
              }}
          /> */}
          <PrimaryButton
              styles={{marginBottom: 25}}
              buttonProps={{inverted: true, rounded: true}}
              label="Logout"
              onPress={() => {
                  authClient.logout();
                  navigationService.navigateToAuth(Navigation, componentId);
              }}
          />
          <Modal isVisible={deleteModalVisible}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ fontSize: 18, color: "white", marginBottom: 25 }}>Are you sure you'd like to delete!</Text>
              <PrimaryButton
                styles={{marginBottom: 15}}
                buttonProps={{inverted: true, rounded: true}}
                label="Okay"
                onPress={() => {
                  // delete  
                  storageClient.getToken("scordAccessToken").then((token) => {
                    storageClient.getToken("scordAuth0Id").then((auth0Id) => {
                      const validCreds = (token !== null && typeof token !== 'undefined') && (auth0Id !== null && typeof auth0Id !== 'undefined');

                      if (validCreds) {
                        setDeleteModalVisible(!deleteModalVisible);
                        // authClient.deleteUser(auth0Id , userData)
                        //   .then((res) => {
                        //     console.info("deleteUser", res);
                        //   });
                      }
                    });
                  });
                }}
              />
              <PrimaryButton
                // styles={{marginBottom: 25}}
                buttonProps={{rounded: true}}
                label="Cancel"
                onPress={() => {
                  // delete  
                  setDeleteModalVisible(!deleteModalVisible);
                }}
              />
            </View>
          </Modal>
      </FormContainer>
    </ScrollView>
  );
};

export default Account;
