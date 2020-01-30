import * as React from "react";

import { View } from "react-native";

import { LoadingModalProps } from "./LoadingModal.d";
import { ActivityIndicator } from "react-native";

import styles from "../../../../build/styles";

const LoadingModal: React.FC<LoadingModalProps> = () => {
  return (
    <>
      <View style={styles.loadingModal}>
        <ActivityIndicator
          size="large"
        />
      </View>
    </>
  );
};

export default LoadingModal;
