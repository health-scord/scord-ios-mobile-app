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
      authClient.getUserData(dispatch);
    });

    return () => {
      Linking.removeEventListener('url', this._handleOpenURL);
    }

    
  }, [])

  // Global Loading
  // Will users who are logged in be shown a loading symbol on SSR (with JS disabled)?
  if (userData === null) {

    console.log('THIS GOT CALLED')

    authClient.getUserData(dispatch).then((response) => {
      return <>{children}</>;

    }).catch((err) => {
      return <>{children}</>;
    })
  }


  return <>{children}</>;
};

export default App;
