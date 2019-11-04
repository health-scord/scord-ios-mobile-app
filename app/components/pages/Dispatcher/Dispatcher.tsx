import * as React from "react";

import { DispatcherProps } from "./Dispatcher.d";
import { View, AsyncStorage, Text } from "react-native";
import { Navigation } from "react-native-navigation";
import StorageClient from "../../../services/StorageClient";
import HomeTabs from "./HomeTabs";

const Dispatcher: React.FC<DispatcherProps> = ({ componentId }) => {
  const storageClient = new StorageClient();

  React.useEffect(() => {
    const token = storageClient.getToken("@Reeviewr:token").then((token) => {
      console.info("token", token);
      if (typeof token !== "undefined" && token !== "") {
        // Navigation.mergeOptions(componentId, {
        //   bottomTabs: {
        //     currentTabId: componentId
        //   }
        // });
        Navigation.push(componentId, HomeTabs());
      } else {
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
      }
    })
  });  

  return (
    <View></View>
  );
};

export default Dispatcher;
