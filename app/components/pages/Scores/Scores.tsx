import * as React from "react";

import { ScoresProps } from "./Scores.d";
import { Text } from "react-native";
import ScoreCounter from "../../ui/ScoreCounter/ScoreCounter";
import Stats from "../../ui/Stats/Stats";
import { useAppContext } from "../../../context";
import NotchSpacer from "../../ui/NotchSpacer/NotchSpacer";

const Scores: React.FC<ScoresProps> = () => {
  const [{ userData }, dispatch] = useAppContext();

  if (userData === null) return <></>

  return (
    <>
      <NotchSpacer />
      <ScoreCounter userData={userData} />
      <Stats />
    </>
  );
};

export default Scores;
