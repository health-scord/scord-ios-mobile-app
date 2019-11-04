import AsyncStorage from '@react-native-community/async-storage';

export default class StorageClient {
    constructor() {}

    async storeItem(name, value) {
        try {
            console.info("storeItem", name, value)
            if (typeof value !== "undefined") {
                await AsyncStorage.setItem(name, value);
            } else {
                console.error("ERROR. value is undefined");
            }
        } catch (error) {
            console.error(error);
        }
    };

    async getToken(name) {
        try {
            const token = await AsyncStorage.getItem(name);
            if (token !== null) {
                return token;
            }
        } catch (error) {
            console.error(error);
        }
    };
}