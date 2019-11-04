import Strings from "./Strings";

export default class Legacy {
  public strings;

  constructor() {
    this.strings = new Strings();
  }

  extractMetaValue(allMeta, name, prependValue = "", decode = false) {
    let metaObj = allMeta.filter(meta => meta.name === name);

    metaObj =
      typeof metaObj[0] !== "undefined"
        ? prependValue + metaObj[0]["value"]
        : "";

    if (decode) {
      metaObj = this.strings.decode(metaObj);
    }

    return metaObj;
  }

  extractMetaProp(allMeta, name, propName) {
    let metaObj = allMeta.filter(meta => meta.name === name);

    metaObj = typeof metaObj[0] !== "undefined" ? metaObj[0][propName] : "";

    return metaObj;
  }

  extractMultipleMeta(
    allMeta,
    metaNameList,
    prependValue = "",
    decode = false
  ) {
    let metaList = {};
    metaNameList.forEach(name => {
      metaList[name] = this.extractMetaValue(
        allMeta,
        name,
        prependValue,
        decode
      );
    });
    return metaList;
  }
}
