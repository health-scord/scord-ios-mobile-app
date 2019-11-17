import * as React from "react";

import { ApolloProvider } from '@apollo/react-hooks';
import { View } from 'react-native';
import client from './services/ApolloClient';

import { ThemeProvider } from 'react-native-ios-kit';

function RootProvider(Component) {
    return (props) => (
        <ThemeProvider theme={{
            primaryColor: "rgb(10, 122, 255)",
            primaryLightColor: "rgb(0, 122, 255)",
            disabledColor: "rgb(142, 142, 147)",
            // backgroundColor: "transparent",
            // barColor: string,
            // dividerColor: string,
            // textColor: string,
            // placeholderColor: string,
            // footnoteColor: string,
            // footnoteBackgroundColor: string,
            // positiveColor: string,
        }}>
            <ApolloProvider client={client}>
                <Component {...props} />
            </ApolloProvider>
        </ThemeProvider>
    );
}

export default RootProvider;