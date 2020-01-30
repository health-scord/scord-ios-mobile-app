import * as React from "react";

import { RefreshViewProps } from "./RefreshView.d";
import { ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  // scrollView: {
  //   flex: 1
  // },
});

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const RefreshView: React.FC<RefreshViewProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  children = null,
  onRefresh = () => console.info("refresh")
}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const refreshTrigger = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      setRefreshing(false);
      onRefresh();
    });
  }, [refreshing]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ ...styles.scrollView, ...{ height: viewportHeight - 200 } }}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={refreshTrigger} 
          />
        }
      >
        {children}
      </ScrollView>
    </>
  );
};

export default RefreshView;
