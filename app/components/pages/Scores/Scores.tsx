import * as React from "react";

import { ScoresProps } from "./Scores.d";
import { Text, ScrollView } from "react-native";
import ScoreCounter from "../../ui/ScoreCounter/ScoreCounter";
import Stats from "../../ui/Stats/Stats";
import { useAppContext } from "../../../context";
import NotchSpacer from "../../ui/NotchSpacer/NotchSpacer";
import Summary from "../../ui/Summary/Summary";

const Scores: React.FC<ScoresProps> = () => {
  const [{ userData }, dispatch] = useAppContext();

  if (typeof userData === "undefined" || userData === null) return <></>

  return (
    <ScrollView>
      <NotchSpacer />
      <ScoreCounter userData={userData} />
      <Summary userData={userData} />
      <Stats userData={userData} />
    </ScrollView>
  );
};

export default Scores;
