import * as React from "react";

import { StatsProps } from "./Stats.d";
import { View, Text } from "react-native";

import styles from "../../../../build/styles";

const Stats: React.FC<StatsProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const clickHandler = e => onClick(e);

  const stats = [
    {
      label: "Average hours of sleep per night",
      percentage: 0
    },
    {
      label: "Daily active minutes average",
      percentage: 0
    },
    {
      label: "Average resting heart rate",
      percentage: 0
    }
  ];

  return (
    <View style={styles.stats}>
      {stats.map((stat, i) => {
        return (
          <View key={i} style={styles.statItem}>
            <Text style={styles.itemLabel}>{stat.label}</Text>
            <Text style={styles.itemPerc}>{stat.percentage ? stat.percentage : "No Data"}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Stats;
