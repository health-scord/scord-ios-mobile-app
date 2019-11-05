import { Navigation } from "react-native-navigation";
import Login from "./app/components/pages/Login/Login";
import RootProvider from "./app/RootProvider";
import Dispatcher from "./app/components/pages/Dispatcher/Dispatcher";
// import RootProvider from "./app/RootProvider";

console.disableYellowBox = true; 

Navigation.registerComponent(`Login`, () => RootProvider(Login)); // done
// Navigation.registerComponent(`SignUp`, () => RootProvider(SignUp)); // done
// Navigation.registerComponent(`ForgotPassword`, () => RootProvider(ForgotPassword)); // done
Navigation.registerComponent(`Dispatcher`, () => RootProvider(Dispatcher)); // done

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

