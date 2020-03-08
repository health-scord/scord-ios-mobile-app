import * as React from "react";

import {ScoresProps} from "./Scores.d";
import {Text, ScrollView, View, Dimensions} from "react-native";
import ScoreCounter from "../../ui/ScoreCounter/ScoreCounter";
import Stats from "../../ui/Stats/Stats";
import {useAppContext} from "../../../context";
import NotchSpacer from "../../ui/NotchSpacer/NotchSpacer";
import Summary from "../../ui/Summary/Summary";
import {Navigation} from "react-native-navigation";
import StorageClient from "../../../services/StorageClient";
import NavigationService from "../../../services/NavigationService";
import RefreshView from "../../ui/RefreshView/RefreshView";
import AuthClient from "../../../services/AuthClient";
import styles from "../../../../build/styles";
import axios from 'axios'


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const Scores: React.FC<ScoresProps> = ({componentId}) => {
    const authClient = new AuthClient();
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

    console.log("RERENDERING SCORES")



    if (typeof userData === undefined || userData === null) return <Text>Loading...</Text>;

    let healthScore = userData.healthScore   
    const halfHeight = (viewportHeight - 155) / 2;

    return (
        <RefreshView 
            onRefresh={async () => {
                //authClient.syncFitbit(userData);
                console.log("THIS WAS CALLED!!!!!")
                try {
                    axios.get('https://us-central1-scord-260818.cloudfunctions.net/scord-score-calculation-daemon')
                } catch(err){
                    err
                }
                let results = await authClient.getUserData(dispatch) 
                console.log(results)
                this.forceUpdate()

                //logic here to query api for latest data and set it to the 
            }}
        >
            <NotchSpacer />
            <View style={{ ...styles.scoreTop, height: halfHeight }}>
                <ScoreCounter userData={userData} healthScore={healthScore}/>
                <Summary userData={userData} healthScore={healthScore}/>
            </View>
            <View style={{ ...styles.scoreBottom, height: halfHeight }}>
                <Stats userData={userData} healthScore={healthScore}/>
            </View>
        </RefreshView>
    );
};

export default Scores;
