import { Navigation } from "react-native-navigation";
import Login from "./app/components/pages/Login/Login";
import SignUp from "./app/components/pages/SignUp/SignUp";
import ForgotPassword from "./app/components/pages/ForgotPassword/ForgotPassword";
import RootProvider from "./app/RootProvider";
import Dispatcher from "./app/components/pages/Dispatcher/Dispatcher";
import Account from "./app/components/pages/Account/Account";
import Offers from "./app/components/pages/Offers/Offers";
import Scores from "./app/components/pages/Scores/Scores";
// import RootProvider from "./app/RootProvider";

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

Navigation.events().registerAppLaunchedListener(() => {
    // Navigation.setDefaultOptions({
    //     topBar: {
    //         visible: false
    //     },
    //     bottomTabs: {
    //         visible: true,
    //         animate: false, // Controls whether BottomTabs visibility changes should be animated
    //         currentTabIndex: 0,
    //         currentTabId: 'currentTabId',
    //         testID: 'bottomTabsTestID',
    //         drawBehind: false,
    //         backgroundColor: 'white'
    //     },
    //     bottomTab: {
    //         iconInsets: { top: 7, left: 7, bottom: 7, right: 7 },
    //         badgeColor: '#FE0B84',
    //         dotIndicator: {
    //             color: 'green', // default red
    //             size: 8, // default 6
    //             visible: true // default false
    //         },
    //         iconColor: '#9B9B9B',
    //         selectedIconColor: '#FE0B84',
    //         textColor: '#9B9B9B',
    //         selectedTextColor: '#FE0B84',
    //         fontFamily: 'Helvetica',
    //         fontWeight: 'regular', // Available on iOS only, will ignore fontFamily style and use the iOS system fonts instead. Supported weights are: 'regular', 'bold', 'thin', 'ultraLight', 'light', 'medium', 'semibold', 'heavy' and 'black'.
    //         fontSize: 12
    //     },
    // });

    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: "Dispatcher",
                            options: {
                                topBar: {
                                    visible: false
                                },
                                // bottomTab: {
                                //     text: "Good job"
                                // }
                            }
                        }
                    }
                ]
            }
        }
    });
    // Navigation.setRoot({
    //     root: {
    //         bottomTabs: {
    //             children: [
    //                 {
    //                     component: {
    //                         name: 'Alerts',
    //                         passProps: {
    //                             text: 'This is tab 1',
    //                             myFunction: () => 'Hello from a function!',
    //                         },
    //                     },
    //                 },
    //                 {
    //                     component: {
    //                         name: 'MainMapView',
    //                         passProps: {
    //                             text: 'This is tab 2',
    //                         },
    //                     },
    //                 },
    //             ],
    //         },
    //     }
    // });
});

