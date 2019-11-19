import * as React from 'react';

import {AppProps} from './App.d';
import {useAppContext} from '../../../context';
import Loading from '../../ui/Loading/Loading';
import {useQuery} from 'react-apollo';
import {Navigation} from 'react-native-navigation';
import StorageClient from '../../../services/StorageClient';
import AuthClient from '../../../services/AuthClient';

const App: React.FC<AppProps> = ({children = null}) => {
  const authClient = new AuthClient();
  const storageClient = new StorageClient();
  const [{userData}, dispatch] = useAppContext();

  // Global Loading
  // Will users who are logged in be shown a loading symbol on SSR (with JS disabled)?
  if (userData === null) {
    console.info('get tokens...');

    authClient.getUserData(dispatch);
  }

  return <>{children}</>;
};

export default App;
