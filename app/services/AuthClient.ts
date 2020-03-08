import RestClient, { formatUrl } from "./RestClient";
// @ts-ignore
import config from "../auth_config.json";
import StorageClient from "./StorageClient";
import NavigationService from "./NavigationService";
import Auth0 from 'react-native-auth0';
import env from "../../env";
import { Navigation } from "react-native-navigation";
import { Linking } from "react-native";
import Promise from 'bluebird'

import axios from 'axios'

export default class AuthClient {
    public auth0 = new Auth0({
        domain: config.domain,
        clientId: config.clientId,
    });

    public storageClient = new StorageClient();
    public restClient = new RestClient();
    public navigationService = new NavigationService();

    constructor() {
        this.init();
    }

    async init() {
    }

    async getUserData(dispatch) {
        console.log('getUserData called')

        const setContextData = dispatch !== null ? true : false;

        const token = await this.storageClient.getToken("scordAccessToken")
        const auth0Id = await this.storageClient.getToken("scordAuth0Id")

        const validCreds = (token !== null && typeof token !== 'undefined') //&& (auth0Id !== null && typeof auth0Id !== 'undefined');
    
        if (validCreds) {
            try {
                let results = await axios.get(`${env.userApi}/accounts/${auth0Id}`)
                console.log('results')
                console.log(results.data)
                if (setContextData) {
                    console.log('setting ContextData')
                    dispatch({
                        type: "setUserData",
                        userData: results.data,
                    });
                    return Promise.resolve(results.data);
                }
            } catch(error) {
                console.log(error)
                //await this.logout()
                return Promise.resolve(null)

            }
        } else {
            return Promise.resolve(null);
        }

    }

    async createAccount(id, values){
        try{
            let results = await axios.post(
                `${env.userApi}/accounts`,
                {
                    id,
                    ...values
                }    
            )
        } catch(error){
            return Promise.reject(error)
        }
    }

 
    getAuth0UserInfo(token): Promise<any> {
        return new Promise((resolve, reject) => {
            this.storageClient.getToken("scordAccessToken").then((scordAccessToken) => {
                this.storageClient.getToken("scordAuth0Id").then((scordAuth0Id) => {
                    this.auth0.auth
                        .userInfo({token})
                        .then(resolve)
                        .catch(reject);
                });
            });
        });
    }

    async socialLogin(connection, compId) {     
        let credentials = await this.auth0.webAuth.authorize({ connection, scope: 'openid email profile'})

        if (typeof credentials !== "undefined") {
            const { accessToken } = credentials;
            const hasToken = typeof accessToken !== "undefined" && accessToken;

            if (hasToken) {
                let token = accessToken;

                // get user id with access token
                const user = await this.getAuth0UserInfo(token)

                let firstName = "";
                let lastName = "";

                if (user && Object.keys(user).length > 0) {
                    firstName = user['givenName'];
                    lastName = user['familyName'];
                } else {
                    return Promise.reject("Cannot find Auth0 user info");
                }

                const auth0Id = user['sub'].split("google-oauth2|")[1];
                    
                await this.storageClient.storeItem("scordAccessToken", token);
                await this.storageClient.storeItem("scordAuth0Id", auth0Id);

                let results = await this.getUserData(null)
                
                if (results === null){
                    await this.createAccount(auth0Id,  {
                        firstName,
                        lastName,
                        healthScore: {
                            calculated: 'n/a',
                            components: {
                                sleep: {
                                    averageDailySleepHours: 'n/a'
                                },
                                fitness: {
                                    averageDailyRigorousActivityMinutes: 'n/a',
                                    averageRigorousActivityTimesPerWeek: 'n/a'
                                },
                                heartRate: {
                                    averageRestingHeartRate: 'n/a'
                                }
                            }
                        }
                    })

                    await axios.get('https://us-central1-scord-260818.cloudfunctions.net/scord-score-calculation-daemon')

                }
            } else {
                this.navigationService.navigateToAuth(Navigation, compId);
            }
        } else {
            alert("Authorization Error");
            return Promise.reject("Authorization Error");
        }



    }

    async logout() {
        console.log('IN LOGOUT')
        await this.storageClient.deleteItem("scordAccessToken");
        await this.storageClient.deleteItem("scordAuth0Id");
    }

    syncFitbit(
        userData, 
        clickHandler = () => {} 
    ) {
        const url = env.authApi + `/accounts/${
            userData.id
        }/authorize`;

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });

        clickHandler(e);
    }

    deleteLocalUser(auth0Id, userData) {
        return new Promise((resolve, reject) => {
            this.restClient.simpleFetch(
                "/accounts/" + auth0Id,
                "DELETE",
                {},
                {},
                {
                    formatUrl: true
                },
                {
                    onComplete: (res) => {
                        console.info("local user data", res, userData);
    
                        resolve(res);
                    },
                    onError: (err) => {
                        reject(err);
                    }
                }
            );
        });
    }

    // deleteAuth0User(auth0Id, userData) {
        // return new Promise((resolve, reject) => {
        //     this.auth0.auth
        //         .createUser(userData).then((data) => {
        //         if (typeof data['Id'] !== "undefined") {
        //             resolve(data);
        //         } else {
        //             console.error(data);
        //             reject(data);
        //         }
        //     })
        //         .catch(reject);
        // });
    // }
}
