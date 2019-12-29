import * as React from 'react';

import {AppProps} from './App.d';
import {useAppContext} from '../../../context';
import Loading from '../../ui/Loading/Loading';
import {useQuery} from 'react-apollo';
import {Navigation} from 'react-native-navigation';
import StorageClient from '../../../services/StorageClient';
import AuthClient from '../../../services/AuthClient';

// import DeepLinking from 'react-native-deep-linking';
import { Linking } from 'react-native';

const App: React.FC<AppProps> = ({children = null}) => {
  const authClient = new AuthClient();
  const storageClient = new StorageClient();
  const [{userData}, dispatch] = useAppContext();

  React.useEffect(() => {
    Linking.addEventListener('url', (data) => {
      console.info("data", data);
    });

    return () => {
      Linking.removeEventListener('url', this._handleOpenURL);
    }

    // DeepLinking.addScheme('scord://');
    // DeepLinking.addScheme('goodman.beta.ScordMobile://');

    // DeepLinking.addRoute('/', (response) => {
    //   console.info("sssss", response);
    // });

    // DeepLinking.addRoute('/test', (response) => {
    //   console.info("test", response);
    // });

    // DeepLinking.addRoute('/test/:id', (response) => {
    //   console.info("test id", response);
    // });

    // Linking.getInitialURL().then((url) => {
    //   if (url) {
    //     Linking.openURL(url);
    //   }
    // }).catch(err => console.error('An error occurred', err));
  }, [])

  // Global Loading
  // Will users who are logged in be shown a loading symbol on SSR (with JS disabled)?
  if (userData === null) {
    console.info('fetch init user data...');

    authClient.getUserData(dispatch);
  }

  return <>{children}</>;
};

export default App;
