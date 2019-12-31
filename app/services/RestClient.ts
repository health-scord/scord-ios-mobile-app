import queryString from 'query-string';
import env from "../../env";
// import Toast from 'react-native-root-toast';
// import Toast from 'react-native-simple-toast';
// import Toast, { DURATION } from 'react-native-easy-toast';
// import Toast from 'react-native-toast-native';

const parseError = require('parse-error');

// get endpoint in proper format
export const formatUrl = (path) => {
    // let pathBase = "https://68.183.100.145";
    // if (__DEV__) {
    //   pathBase = env.restUri;
    // }
    let pathBase = env.userApi;

    const adjustedPath = path[0] !== "/" ? "/" + path : path;

    return pathBase + adjustedPath;
};

export default class RestClient {
    constructor() {}

    execSuper(
        endpoint = "",
        params = {},
        method = "GET",
        headers = {},
        format = true,
        onError = (err) => console.error("exec error", err)
    ) {
        try {
            if (method === "POST") {
                console.info('run superagent', format, endpoint, params, onError);
                return superagent
                    .post(format ? formatUrl(endpoint) : endpoint)
                    .type('form')
                    .send(params)
                    .on('error', onError)
                // .withCredentials()
                // .set("accept", "json")
                // .set(headers);
            } else if (method === "PATCH") {
                console.info('run patch', format, endpoint, params, onError);
                return superagent
                    .patch(format ? formatUrl(endpoint) : endpoint)
                    .type('form')
                    .send(params)
                    .on('error', onError)
                // .withCredentials()
                // .set("accept", "json")
                // .set(headers);
            } else if (method === "GET") {
                console.info("run fetch", endpoint, params, method, format);
                // return superagent
                //   .post(format ? formatUrl(endpoint) : endpoint)
                //   .send(params)
                //   .withCredentials()
                //   .set("accept", "json");
                return this.exec(endpoint, params, method, format);
            }
        } catch(err) {
            console.error("err 5", err)
        }
    }

    paramsToString(params) {
        let sendParams = "?";
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                sendParams += key + "=" + params[key] + "&";
            }
        }
        return sendParams;
    }

    simpleFetch(
        endpoint = "http://localhost",
        method = "POST",
        params = {},
        body = {},
        options = {
            formatUrl: true,
        },
        handlers = {
            onComplete: (data) => {
                console.info("complete", data);
            },
            onError: (err) => {
                console.info("error", err);
            }
        }
    ) {
        // Toast.show(this.loadingToast);
        // Toast.show('Loading...', Toast.LONG);
        // let toast = Toast.show('Loading...', {
        //     duration: Toast.durations.LONG,
        //     position: Toast.positions.BOTTOM,
        //     shadow: true,
        //     animation: true,
        //     hideOnPress: true,
        //     delay: 0
        // });
        //
        // Toast.show(toast);

        // const newHeaders = new Headers();
        // newHeaders.append("Content-Type", "application/json");
        const headers = {
            'Content-Type': 'application/json'
        };

        let sendParams = "";
        if (Object.keys(params).length > 0) {
            sendParams = this.paramsToString(params);
        }

        const fullUrl = options.formatUrl ? formatUrl(endpoint) + sendParams : endpoint + sendParams;

        let sendBody = "";
        if (Object.keys(body).length > 0) {
            sendBody = JSON.stringify(body);
        }

        return this.fetchTimeout(fullUrl, {
            method,
            headers,
            body: sendBody
        })
            // .then((res) => {
            //     Toast.hide(toast);
            //     return res;
            // })
            .then(handlers.onComplete)
            .catch(handlers.onError)
    }

    // exec currently unused
    exec(endpoint, params, method = "GET", format) {
        const newHeaders = new Headers();
        newHeaders.append("Content-Type", "application/json");

        let sendParams = "";
        let fetchParams;
        if (method === "GET") {
            sendParams = this.paramsToString(params);
            fetchParams = {
                method,
                headers: newHeaders
            };
        } else if (method === "POST") {
            fetchParams = {
                method,
                headers: newHeaders,
                body: JSON.stringify(params),
            };
        }

        const fullUrl = format ? formatUrl(endpoint) + sendParams : endpoint + sendParams;

        console.info("FETCH ", fetch, method, fullUrl, fetchParams);

        return fetch(fullUrl, fetchParams).then(data => {
            if (!data.ok || data.status === 414) {
                console.warn("Fetch error", data.status);
            }

            const jsonData = data.json();

            console.info("resonse data", jsonData);
            return jsonData;
        }).catch((err) => {
            console.warn("FETCH ERR", err, JSON.stringify(err));
        })
    }

    makeRequest(
        endpoint,
        values,
        callback,
        method = "POST",
        headers = {},
        format = true,
        onError = (err) => console.warn("exec/makeRequest error", err)
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                console.info("makeRequest", endpoint, values, method, headers, this.execSuper, "superagent", superagent);
                this.exec(endpoint, values, method, format).then((value: any) => {
                    console.info("run callback", value);
                    // if (err) {
                    //   console.error("makeRequest ERROR", err, res);

                    //   if (typeof res !== "undefined") {
                    //     if (res.body !== null) {
                    //       console.error("makeRequest ERROR BODY", res.body.errorMessage);
                    //     }
                    //   }

                    //   reject(err);
                    // }
                    callback(value);
                    resolve(value);
                });
            } catch (err) {
                console.error("ERROR 2001: ", err);
                reject(err);
            }
        });
    }

    fetchTimeout(url, options) {
        const FETCH_TIMEOUT = 15000;
        let didTimeOut = false;

        return new Promise(function (resolve, reject) {
            const timeout = setTimeout(function () {
                didTimeOut = true;
                reject({message: "Timeout", url, options});
            }, FETCH_TIMEOUT);

            fetch(url, options)
                .then(function (response) {
                    clearTimeout(timeout);
                    if (!didTimeOut) {
                        resolve(response.json());
                    }
                })
                .catch(function (err) {
                    console.warn("FETCH ERR", parseError(err));
                    if (didTimeOut) return;
                    reject(err);
                });
        })
    }
}
