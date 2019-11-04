import { Navigation } from "react-native-navigation";
import AddActivities from "./app/components/pages/AddActivities/AddActivities";
import AddChildAccount from "./app/components/pages/AddChildAccount/AddChildAccount";
import AdvancedProfile from "./app/components/pages/AdvancedProfile/AdvancedProfile";
import Alerts from "./app/components/pages/Alerts/Alerts";
import Calendar from "./app/components/pages/Calendar/Calendar";
import InterestPreferences from "./app/components/pages/InterestPreferences/InterestPreferences";
import Intro from "./app/components/pages/Intro/Intro";
import LeagueOverview from "./app/components/pages/LeagueOverview/LeagueOverview";
import Login from "./app/components/pages/Login/Login";
import ManageInterests from "./app/components/pages/ManageInterests/ManageInterests";
import MapDetail from "./app/components/pages/MapDetail/MapDetail";
import MainMapView from "./app/components/pages/MainMapView/MainMapView";
import Organization from "./app/components/pages/Organization/Organization";
import Profile from "./app/components/pages/Profile/Profile";
import SavedActivities from "./app/components/pages/SavedActivities/SavedActivities";
import SavedSearches from "./app/components/pages/SavedSearches/SavedSearches";
import SignUp from "./app/components/pages/SignUp/SignUp";
import MapFilters from "./app/components/pages/MapFilters/MapFilters";
import ForgotPassword from "./app/components/pages/ForgotPassword/ForgotPassword";
import FormCompleteModal from "./app/components/ui/FormCompleteModal/FormCompleteModal";
import RootProvider from "./app/RootProvider";
import Dispatcher from "./app/components/pages/Dispatcher/Dispatcher";
import Venue from "./app/components/pages/Venue/Venue";
// import RootProvider from "./app/RootProvider";

console.disableYellowBox = true; 

Navigation.registerComponent(`AddActivities`, () => RootProvider(AddActivities)); // done
Navigation.registerComponent(`AdvancedProfile`, () => RootProvider(AdvancedProfile)); // done
Navigation.registerComponent(`Alerts`, () => RootProvider(Alerts)); // done
Navigation.registerComponent(`Calendar`, () => RootProvider(Calendar)); // done
Navigation.registerComponent(`InterestPreferences`, () => RootProvider(InterestPreferences)); // done
Navigation.registerComponent(`Intro`, () => RootProvider(Intro)); // done
Navigation.registerComponent(`Login`, () => RootProvider(Login)); // done
Navigation.registerComponent(`ManageInterests`, () => RootProvider(ManageInterests)); // done
Navigation.registerComponent(`MainMapView`, () => RootProvider(MainMapView)); // done
Navigation.registerComponent(`Organization`, () => RootProvider(Organization)); // done
Navigation.registerComponent(`SignUp`, () => RootProvider(SignUp)); // done
Navigation.registerComponent(`ForgotPassword`, () => RootProvider(ForgotPassword)); // done
Navigation.registerComponent(`FormCompleteModal`, () => RootProvider(FormCompleteModal)); // done
Navigation.registerComponent(`MapFilters`, () => RootProvider(MapFilters)); // done
Navigation.registerComponent(`Dispatcher`, () => RootProvider(Dispatcher)); // done
Navigation.registerComponent(`Venue`, () => RootProvider(Venue)); // done
Navigation.registerComponent(`SavedActivities`, () => RootProvider(SavedActivities)); // done
Navigation.registerComponent(`SavedSearches`, () => RootProvider(SavedSearches)); // done
Navigation.registerComponent(`AddChildAccount`, () => RootProvider(AddChildAccount));
Navigation.registerComponent(`LeagueOverview`, () => RootProvider(LeagueOverview));
Navigation.registerComponent(`MapDetail`, () => RootProvider(MapDetail));
Navigation.registerComponent(`Profile`, () => RootProvider(Profile));

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        topBar: {
            visible: false
        },
        bottomTabs: {
            visible: true,
            animate: false, // Controls whether BottomTabs visibility changes should be animated
            currentTabIndex: 0,
            currentTabId: 'currentTabId',
            testID: 'bottomTabsTestID',
            drawBehind: false,
            backgroundColor: 'white'
        },
        bottomTab: {
            iconInsets: { top: 7, left: 7, bottom: 7, right: 7 },
            badgeColor: '#FE0B84',
            dotIndicator: {
                color: 'green', // default red
                size: 8, // default 6
                visible: true // default false
            },
            iconColor: '#9B9B9B',
            selectedIconColor: '#FE0B84',
            textColor: '#9B9B9B',
            selectedTextColor: '#FE0B84',
            fontFamily: 'Helvetica',
            fontWeight: 'regular', // Available on iOS only, will ignore fontFamily style and use the iOS system fonts instead. Supported weights are: 'regular', 'bold', 'thin', 'ultraLight', 'light', 'medium', 'semibold', 'heavy' and 'black'.
            fontSize: 12
        },
    });

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

