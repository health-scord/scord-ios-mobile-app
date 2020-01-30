import RestClient, { formatUrl } from "./RestClient";
// @ts-ignore
import config from "../auth_config.json";
import StorageClient from "./StorageClient";
import NavigationService from "./NavigationService";
import Auth0 from 'react-native-auth0';
import env from "../../env";
import { Navigation } from "react-native-navigation";
import { Linking } from "react-native";

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
        const setContextData = dispatch !== null ? true : false;

        return new Promise((resolve, reject) => {
            this.storageClient.getToken("scordAccessToken").then((token) => {
                this.storageClient.getToken("scordAuth0Id").then((auth0Id) => {
                    const validCreds = (token !== null && typeof token !== 'undefined') && (auth0Id !== null && typeof auth0Id !== 'undefined');
                    const setContextData = dispatch !== null ? true : false;

                    console.info("getUserData", validCreds, setContextData);

                    if (validCreds) {
                        this.restClient.simpleFetch(
                            "/accounts/" + auth0Id,
                            "GET",
                            {},
                            {},
                            {
                                formatUrl: true
                            },
                            {
                                onComplete: (res) => {
                                    console.info("user data", res);

                                    if (typeof res["error"] === "undefined") {
                                        if (setContextData) {
                                            dispatch({
                                                type: "setUserData",
                                                userData: res,
                                            });
                                        }
                                        resolve(res);
                                    } else {
                                        reject(res);
                                    }
                                },
                                onError: (err) => {
                                    reject(err);
                                }
                            }
                        );
                    } else {
                        resolve(null);
                    }
                });
            });
        });
    }

    // async createAuth0Account(values, metaData, callback, onError) {
    //     return new Promise((resolve, reject) => {
    //         const userData = {
    //             email: values.email,
    //             username: values.username,
    //             password: values.password,
    //             connection: "Username-Password-Authentication",
    //             metadata: {
    //                 firstName: values.firstName,
    //                 lastName: values.lastName,
    //                 ...metaData
    //             }
    //         };
    //         console.info("userData", userData);
    //         this.auth0.auth
    //             .createUser(userData).then((data) => {
    //                 console.info("auth0 creation", data);
    //                 callback(data);
    //             })
    //             .catch((err) => {
    //                 onError(err);
    //                 reject(err);
    //             });
    //     });
    // }
    //
    // async createLocalAccount(id, values, callback, onError, resolve, reject) {
    //     this.restClient.simpleFetch(
    //         env.userApi + "/accounts",
    //         "POST",
    //         {},
    //         {
    //             "id": id,
    //             ...values
    //         },
    //         {
    //             formatUrl: false
    //         },
    //         {
    //             onComplete: (data) => {
    //                 console.info("data", id, data);
    //                 if (typeof data['id'] !== "undefined") {
    //                     this.createAuth0Account(values, { mongoId: id }, callback, onError);
    //                 } else {
    //                     console.error(data);
    //                     reject(data);
    //                 }
    //             },
    //             onError: reject
    //         }
    //     );
    // }

    async signup(values, callback, onError) {
        return new Promise((resolve, reject) => {
            const userData = {
                email: values.email,
                username: values.username,
                password: values.password,
                connection: "Username-Password-Authentication",
                metadata: {
                    firstName: values.firstName,
                    lastName: values.lastName
                }
            };
            console.info("userData", userData);
            this.auth0.auth
                .createUser(userData).then((data) => {
                console.info("data", data);
                if (typeof data['Id'] !== "undefined") {
                    this.createLocalAccount(data['Id'], values, callback, onError, resolve, reject);
                } else {
                    console.error(data);
                    reject(data);
                }
            })
                .catch(reject);
        });
    }

    async createLocalAccount(id, values, callback, onError, resolve, reject) {
        this.restClient.simpleFetch(
            env.userApi + "/accounts",
            "POST",
            {},
            {
                "id": id,
                ...values
            },
            {
                formatUrl: false
        },
            {
                onComplete: (data) => {
                    callback(data);
                    resolve(data);
                },
                onError: (err) => {
                    console.error("err", err);
                    reject(err);
                }
            }
    );
  }

  async updateAccount(id, values, callback, onError) {
      this.restClient.makeRequest(
          "/accounts/" + id,
          values,
          callback, // finish
          "PATCH",
          {"content-type": "application/json"},
          false,
          onError
      );
  }

  forgotPassword(values) {
      return new Promise((resolve, reject) => {
          this.auth0.auth
              .resetPassword({
                  email: values.email,
                  connection: "Username-Password-Authentication"
              }).then(resolve)
              .catch(reject);
      });
  }

    async login(values) {
        return new Promise((resolve, reject) => {
            this.auth0.auth
                .passwordRealm({
                    username: values.username,
                    password: values.password,
                    realm: "Username-Password-Authentication",
                })
                .then((data) => {
                    this.getAuth0UserInfo(data["accessToken"]).then((userData) => {
                        console.info("login data", data, userData);
                        const auth0Id = userData['sub'].split("auth0|")[1];
                        this.storageClient.storeItem("scordAccessToken", data["accessToken"]);
                        this.storageClient.storeItem("scordAuth0Id", auth0Id);
                        // this.storageClient.storeItem("scordMongoId", data["userMetadata"]["mongoId"]);
                        resolve(data);
                    }).catch(reject);
                })
                .catch(reject);
        });
    }

    setAuth0Id(token, callback, onError, finished) {
        // auth0 id request #1
        this.restClient.simpleFetch(
            "https://" + config.domain + "/oauth/token",
            "POST",
            {},
            {
                access_token: token
            },
            {
                formatUrl: false
            },
            {
                onComplete: (res2) => {
                    console.info("res2", res2);
                    const auth0Id = res2['sub'].split("auth0|")[1];

                    // Cookies.set("scordAuth0Id", auth0Id);
                    this.storageClient.storeItem("scordAuth0Id", auth0Id);

                    if (typeof finished !== "undefined") {
                        finished(token, auth0Id);
                    }
                },
                onError
            }
        );
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

  socialLogin(connection, callback, compId) {
      console.info("auth0", this.auth0);
      return new Promise((resolve, reject) => {
          let self = this;
          this.auth0.webAuth.authorize({
              connection,
              // audience: "/userinfo",
              scope: 'openid email profile'
          })
              .then(credentials => {
                  console.info("creds", credentials);
                  if (typeof credentials !== "undefined") {
                      const {accessToken, expiresIn, tokenType} = credentials;

                      console.info("credentials", accessToken, expiresIn, tokenType);

                      // when token is retrieved after successful login via auth0
                      const hasToken = typeof accessToken !== "undefined" && accessToken;
                      // const hasClient = route.url.hash.split("auth0Client");
                      // const hasIdToken = route.url.hash.split("id_token");
                      if (hasToken) {
                          let token = accessToken;

                          console.info("token", token);
                          //
                          // get user id with access token
                          self.getAuth0UserInfo(token).then((user) => {
                              console.info("user", user);

                              let firstName = "";
                              let lastName = "";

                              if (user && Object.keys(user).length > 0) {
                                  firstName = user['given_name'];
                                  lastName = user['family_name'];
                              } else {
                                  reject("Cannot find Auth0 user info");
                              }

                              const auth0Id = user['sub'].split("google-oauth2|")[1];
                              // setCookie("scordAccessToken", token);
                              // setCookie("scordAuth0Id", auth0Id);

                              self.storageClient.storeItem("scordAccessToken", token);
                              self.storageClient.storeItem("scordAuth0Id", auth0Id);

                              setTimeout(() => {
                                  // now check if mongo account exists with id
                                  self.getUserData(null).then((res) => {
                                      console.info("token res", res);
                                      if (typeof res["id"] !== "undefined" || typeof res["Id"] !== "undefined") {
                                          // send to scores is yes
                                          // window.location.href = window.location.origin + "/scores";
                                          // Navigation.push(compId, {
                                          //     component: {
                                          //         name: 'Scores'
                                          //     }
                                          // });
                                          this.navigationService.navigateToHome(Navigation, compId);
                                      } else {
                                          alert("Error 195629");
                                          reject("Error 195629");
                                      }
                                  }).catch((err) => {
                                      console.warn("intended", err);
                                      self.createLocalAccount(
                                          auth0Id,
                                          {
                                              firstName,
                                              lastName
                                          },
                                          () => {
                                              console.info("success");
                                              // Navigation.push(compId, {
                                              //     component: {
                                              //         name: 'Scores'
                                              //     }
                                              // });
                                              this.navigationService.navigateToHome(Navigation, compId);
                                          },
                                          (err) => console.error("social login new account creation failure", err),
                                          resolve,
                                          reject
                                      );
                                      // reject(err);
                                  });
                              }, 500)

                          }).catch((err) => {
                              console.error("sociallogin 1 err", err);
                              reject(err);
                          })
                      } else {
                          setTimeout(() => {
                              this.navigationService.navigateToAuth(Navigation, compId);
                          }, 500)
                      }
                  } else {
                      alert("Error 17493");
                      reject("Error 17493");
                  }
              })
              .catch(error => {
                  console.warn("auth error", error)
                  reject(error);
              });
      });
  }

  async logout() {
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

    deleteUser(auth0Id, userData) {
        return new Promise((resolve, reject) => {
            this.restClient.simpleFetch(
                "/accounts/" + auth0Id,
                "GET",
                {},
                {},
                {
                    formatUrl: true
                },
                {
                    onComplete: (res) => {
                        console.info("user data", res, userData);
    
                        resolve(res);
                    },
                    onError: (err) => {
                        reject(err);
                    }
                }
            );
        });
    }
}
