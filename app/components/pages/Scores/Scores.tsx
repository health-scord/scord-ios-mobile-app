import * as React from "react";

import {ScoresProps} from "./Scores.d";
import {Text, ScrollView} from "react-native";
import ScoreCounter from "../../ui/ScoreCounter/ScoreCounter";
import Stats from "../../ui/Stats/Stats";
import {useAppContext} from "../../../context";
import NotchSpacer from "../../ui/NotchSpacer/NotchSpacer";
import Summary from "../../ui/Summary/Summary";
import {Navigation} from "react-native-navigation";
import StorageClient from "../../../services/StorageClient";
import NavigationService from "../../../services/NavigationService";

const Scores: React.FC<ScoresProps> = ({componentId}) => {
    const navigationService = new NavigationService();
    const storageClient = new StorageClient();
    const [{userData}, dispatch] = useAppContext();

    // React.useEffect(() => {
    //     storageClient.getToken("scordAccessToken").then((token) => {
    //         console.info("token", token);
    //         if (typeof token === "undefined" || token === "") {
    //             // Navigation.push(componentId, {
    //             //     component: {
    //             //         name: 'Login'
    //             //     }
    //             // });
    //             navigationService.navigateToAuth(Navigation, componentId);
    //         }
    //     })
    // });

    if (typeof userData === "undefined" || userData === null) return <Text>Loading...</Text>;

    // const healthScore = {
    //     calculated: "225",
    //     components: {
    //         sleep: {
    //             averageDailySleepHours: "3"
    //         },
    //         fitness: {
    //             averageDailyRigorousActivityMinutes: "30",
    //             averageRigorousActivityTimesPerWeek: "20"
    //         },
    //         heartRate: {
    //             averageRestingHeartRate: "10"
    //         }
    //     }
    // };
    const healthScore = null;

    return (
        <ScrollView>
            <NotchSpacer/>
            <ScoreCounter userData={userData} healthScore={healthScore}/>
            <Summary userData={userData} healthScore={healthScore}/>
            <Stats userData={userData} healthScore={healthScore}/>
        </ScrollView>
    );
};

export default Scores;
