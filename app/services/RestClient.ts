// const methods = ['get', 'post', 'put', 'patch', 'del'];
import fetch from "cross-fetch";
const superagent = require('superagent');
import env from "../../env";

// get endpoint in proper format
export const formatUrl = (path) => {
  // let pathBase = "https://68.183.100.145";
  // if (__DEV__) {
  //   pathBase = env.restUri;
  // }
  let pathBase = env.userApi;

  const adjustedPath = path[0] !== "/" ? "/" + path : path;
  const formattedUrl = pathBase + adjustedPath;

  return formattedUrl;
}

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
        console.info("run fetch", endpoint, params, method, format)
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

  // exec currently unused
  exec(endpoint, params, method = "GET", format, headers, onError) {
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

    console.info("FETCH ", method, fullUrl, fetchParams);

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
  ) {
    return new Promise((resolve, reject) => {
      try {
        console.info("makeRequest", endpoint, values, method, headers, this.execSuper, "superagent", superagent)
        this.exec(endpoint, values, method, format, headers, onError).then((value) => {
          console.info("run callback", value)
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
}
