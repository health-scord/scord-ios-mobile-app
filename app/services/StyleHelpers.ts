import { Dimensions } from "react-native";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class StyleHelpers {
    constructor() {

    }

    getWidth() {
        return viewportWidth;
    }

    getHeight() {
        return viewportHeight;
    }

    perc(percentage) {
        const value = (percentage * viewportWidth) / 100;
        return Math.round(value);
    }
}