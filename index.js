import {Navigation} from 'react-native-navigation';
import Login from './app/components/pages/Login/Login';
import SignUp from './app/components/pages/SignUp/SignUp';
import ForgotPassword from './app/components/pages/ForgotPassword/ForgotPassword';
import RootProvider from './app/RootProvider';
import NavigationService from './app/services/NavigationService';
import StorageClient from './app/services/StorageClient';
import Dispatcher from './app/components/pages/Dispatcher/Dispatcher';
import Account from './app/components/pages/Account/Account';
import Offers from './app/components/pages/Offers/Offers';
import Scores from './app/components/pages/Scores/Scores';
import LoadingModal from './app/components/pages/LoadingModal/LoadingModal';
// import Ionicons from 'react-native-vector-icons/Ionicons';

console.disableYellowBox = true;

// To see all the requests in the chrome Dev tools in the network tab.
global.XMLHttpRequest = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest
global.FormData = global.originalFormData
  ? global.originalFormData
  : global.FormData

fetch // Ensure to get the lazy property

if (window.__FETCH_SUPPORT__) {
  // it's RNDebugger only to have
  window.__FETCH_SUPPORT__.blob = false
} else {
  /*
   * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
   * If you're using another way you can just use the native Blob and remove the `else` statement
   */
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob
  global.FileReader = global.originalFileReader
    ? global.originalFileReader
    : global.FileReader
}

Navigation.registerComponent(`Login`, () => RootProvider(Login));
Navigation.registerComponent(`SignUp`, () => RootProvider(SignUp));
Navigation.registerComponent(`ForgotPassword`, () => RootProvider(ForgotPassword));
Navigation.registerComponent(`Dispatcher`, () => RootProvider(Dispatcher));
Navigation.registerComponent(`Account`, () => RootProvider(Account));
Navigation.registerComponent(`Offers`, () => RootProvider(Offers));
Navigation.registerComponent(`Scores`, () => RootProvider(Scores));
Navigation.registerComponent(`LoadingModal`, () => RootProvider(LoadingModal));

Navigation.events().registerAppLaunchedListener(() => {
    const storageClient = new StorageClient();
    const navigationService = new NavigationService();

    Navigation.setDefaultOptions({
        bottomTabs: {
            backgroundColor: '#E5E5E5',
        },
        bottomTab: {
            fontSize: 11
        }
    });

    storageClient.getToken('scordAccessToken').then((token) => {
        if (typeof token === 'undefined' || token === '') {
            const authTabs = navigationService.getAuthLayout();
            Navigation.setRoot({
                root: {
                    stack: authTabs,
                },
            });
        } else {
            navigationService.getHomeLayout().then((homeTabs) => {
                Navigation.setRoot({
                    root: homeTabs,
                });
            });
        }
    });
});

