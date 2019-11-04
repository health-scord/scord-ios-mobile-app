import * as React from "react";

import { ApolloProvider } from '@apollo/react-hooks';
import { View } from 'react-native';
import client from './services/ApolloClient';

function RootProvider(Component) {
    return (props) => (
        <ApolloProvider client={client}>
            <Component {...props} />
        </ApolloProvider>
    );
}

export default RootProvider;