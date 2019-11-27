import Cookies from "js-cookie";
import client from "./ApolloClient";
import RestClient, { formatUrl } from "./RestClient";
import createAuth0Client from "@auth0/auth0-spa-js";
import config from "../auth_config.json";
import * as $ from "jquery";
// import auth0 from "auth0-js";
import StorageClient from "./StorageClient";
import Auth0 from 'react-native-auth0';
import env from "../../env";
import { Navigation } from "react-native-navigation";
import HomeTabs from "../components/pages/Dispatcher/HomeTabs";

export default class AuthClient {
  // public auth0;
  // public webAuth = new auth0.WebAuth({
  //   domain:       config.domain,
  //   clientID:     config.clientId
  // });
  public auth0 = new Auth0({
    domain: config.domain,
    clientId: config.clientId,
  });
  public storageClient = new StorageClient();
  public restClient = new RestClient();

  constructor() {
    this.init();
  }

  async init() {
    // this.auth0 = await createAuth0Client({
    //   domain: config.domain,
    //   client_id: config.clientId,
    //   redirect_uri: window.location.origin
    // });
  }

  async getUserData(dispatch, setData = true) {
    return new Promise((resolve, reject) => {
      this.storageClient.getToken("scordAccessToken").then((token) => {
        this.storageClient.getToken("scordAuth0Id").then((auth0Id) => {
          const validCreds = (token !== null && typeof token !== 'undefined') && (auth0Id !== null && typeof auth0Id !== 'undefined');

          if ((dispatch !== null && validCreds) || (dispatch === null)) {
              this.restClient.makeRequest(
                formatUrl("/accounts/" + auth0Id), 
                {}, 
                () => console.info("getUserData finished"),
                "GET", 
                { "content-type": "application/json" },
                false
              ).then(res => {
                console.info("user data", res);
                if (dispatch && setData) {
                  dispatch({
                    type: "setUserData",
                    userData: res,
                  });
                }
                resolve(res);
              });
            } else {
              console.warn("ERROR. Not logging in 2033")
            }
        });
      });
    });
  }

  // TODO: use route constants
  async signup(values, callback, onError) {
    // auth0 user create
    this.restClient.makeRequest(
      "https://" + config.domain + "/dbconnections/signup", 
      {
        "client_id": config.clientId,
        "connection": "Username-Password-Authentication",
        ...values
      }, 
      () => console.info("Step 1 finished"), 
      "POST", 
      { "content-type": "application/x-www-form-urlencoded" },
      false,
      onError
    ).then((res) => {
      console.info("res", res, values)
      // data-service user create
      if (typeof res['body']['_id'] !== "undefined") {
        this.createLocalAccount(res['body']['_id'], values, callback, onError);
      } else {
        console.error(res);
      }
    });
  }

  async createLocalAccount(id, values, callback, onError) {
    this.restClient.makeRequest(
      env.restUri + "/accounts", 
      {
        "id": id,
        ...values
      }, 
      callback, // finish
      "POST", 
      { "content-type": "application/json" },
      false,
      onError
    )
  }

  async updateAccount(id, values, callback, onError) {
    // data-service user update
    this.restClient.makeRequest(
      "/accounts/" + id, 
      values, 
      callback, // finish
      "PATCH", 
      { "content-type": "application/json" },
      false,
      onError
    )
  }

  forgotPassword(values, callback) {
    this.restClient.makeRequest(
      "https://" + config.domain + "/dbconnections/change_password", 
      {
        email: values.email,
        client_id: config.clientId,
        connection: values.connection
      }, 
      callback, 
      "POST", 
      { "content-type": "application/x-www-form-urlencoded" },
      false
    ).then(data => {
      console.info("data", data);
    })
  }

  async login(values, callback, onError, finished) {
    // the local User _id is not used, we use the associated auth0 id
    // auth0 token request
    this.restClient.makeRequest(
      "https://" + config.domain + "/oauth/token", 
      {
        grant_type: "password",
        client_id: config.clientId,
        // client_secret
        // audience
        // scope
        // realm
        ...values
      }, 
      callback,
      "POST", 
      { "content-type": "application/x-www-form-urlencoded" },
      false,
      onError
    ).then(res => {
      const token = res['body']['access_token'];

      // Cookies.set("scordAccessToken", token);
      this.storageClient.storeItem("scordAccessToken", token);

      this.setAuth0Id(token, callback, onError, finished);
    })
  }

  setAuth0Id(token, callback, onError, finished) {
    // auth0 id request #1
    this.restClient.makeRequest(
      "https://" + config.domain + "/userinfo", 
      {
        access_token: token
      }, 
      callback,
      "POST", 
      { "content-type": "application/x-www-form-urlencoded" },
      false,
      onError
    ).then(res2 => {
      const auth0Id = res2['body']['sub'].split("auth0|")[1];
      
      // Cookies.set("scordAuth0Id", auth0Id);
      this.storageClient.storeItem("scordAuth0Id", auth0Id);

      if (typeof finished !== "undefined") {
        finished(token, auth0Id);
      }
    })
  }

  getAuth0UserInfo(token) {
    let self = this;
    return new Promise((resolve, reject) => {
      // this.webAuth.parseHash({ hash: window.location.hash }, function(err, authResult) {
      //   if (err) {
      //     reject(err);
      //   }
        self.auth0.auth.userInfo({ token }).then((user) => {
          resolve(user);
        }).catch((err) => {
          reject(err);
        });
      // });
    })
    
  }

  socialLogin(connection, callback, compId) {
    // const queryString = this.restClient.paramsToString({
    //   response_type: "token",
    //   client_id: config.clientId,
    //   redirect_uri: process.env.SERVER_URL,
    //   connection
    // });
    // const fullUrl = "https://" + config.domain + "/authorize" + queryString;
    // window.location.href = fullUrl;
    // console.info("auth0", this.auth0, this.webAuth);
    // this.webAuth.authorize({
    //   connection,
    //   responseType: "token",
    //   redirectUri: process.env.SERVER_URL,
    //   clientId: config.clientId
    // })
    console.info("auth0", this.auth0)
    let self = this;
    this.auth0.webAuth.authorize({
      connection,
      // audience: "/userinfo",
      scope: 'openid email profile'
    })
    .then(credentials => {
      console.info("creds", credentials);
      if (typeof credentials !== "undefined") {
        const { accessToken, expiresIn, tokenType } = credentials;

        console.info("credentials", accessToken, expiresIn, tokenType);

        // when token is retrieved after successful login via auth0
        const hasToken = typeof accessToken !== "undefined" && accessToken ? true : false;
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
              console.warn("cannot find auth0 user info");
            }

            const auth0Id = user['sub'].split("google-oauth2|")[1];
            // setCookie("scordAccessToken", token);
            // setCookie("scordAuth0Id", auth0Id);

            self.storageClient.storeItem("scordAccessToken", token);
            self.storageClient.storeItem("scordAuth0Id", auth0Id);
            
            setTimeout(() => {
              // now check if mongo account exists with id
              self.getUserData(null, false).then((res) => {
                console.info("token res", res)
                if (typeof res['error'] !== "undefined" && 
                    res['error'].error.title === "Account Not Found") {
                  // send to complete profile if not
                  self.createLocalAccount(
                    auth0Id, 
                    {
                      firstName,
                      lastName
                    }, 
                    () => {
                      console.info("success");
                      Navigation.push(compId, HomeTabs());
                    }, 
                    (err) => console.error("social login new account creation failure", err)
                  );
                  // window.location.href = window.location.origin + "/account";
                  
                } else if (typeof res["id"] !== "undefined") {
                  // send to scores is yes
                  // window.location.href = window.location.origin + "/scores";
                  Navigation.push(compId, HomeTabs());
                } else {
                  alert("Error 195629");
                }
              })
            }, 500)
            
          }).catch((err) => {
            console.error("err", err);
          })
        }
        // else if (typeof hasClient[1] !== "undefined") {
        //   let client = hasClient[1].split("&")[0];
        //   client = client.substr(1, client.length - 1);
        //   // setCookie("scordAccessToken", token);
        //   console.info("client", client);
        // } else if (typeof hasIdToken[1] !== "undefined") {
        //   let token = hasIdToken[1].split("&")[0];
        //   token = token.substr(1, token.length - 1);
        //   let userInfo = JSON.parse(window.atob(token.split(".")[1]));
  
        //   const auth0Id = userInfo.sub.split("google-oauth2|")[1];
  
        //   console.info("token 2", userInfo, auth0Id);
        
        //   setCookie("scordAuth0Id", auth0Id);
  
        //   // setTimeout(() => {
        //   //   window.location.replace("/");
        //   // }, 500);
        // } 
        else {
          setTimeout(() => {
            Navigation.push(compId, {
              component: {
                name: 'Login',
                options: {
                  topBar: {
                    visible: false
                  }
                }
              }
            });
          }, 500)
        }
      } else {
        alert("Error 17493");
      }
    })
    .catch(error => {
      console.warn("auth error", error)
    });
  }

  async logout() {
    // Cookies.remove("scordAccessToken");
    // Cookies.remove("scordAuth0Id");
    // window.location.href = window.location.origin;
    await this.storageClient.deleteItem("scordAccessToken");
    await this.storageClient.deleteItem("scordAuth0Id");
  }
}
