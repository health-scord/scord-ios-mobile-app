import Ionicons from 'react-native-vector-icons/Ionicons';

export default class NavigationService {
    constructor() {}

    getHomeLayout() {
        return new Promise((resolve, reject) => {
            Promise.all([
                Ionicons.getImageSource('md-home', 25, "black"),
                Ionicons.getImageSource('md-settings', 25, "black"),
            ]).then(([homeIcon, starIcon]) => {
                resolve({
                stack: {
                    options: {
                        topBar: {
                            visible: false
                        }
                    },
                    children: [
                        {
                           component: {
                               id: 'ForgotPassword',
                               name: 'ForgotPassword'
                           },
                         },
                        {
                        bottomTabs: {
                           id: "HomeTabs",
                           options: {
                               topBar: {
                                   visible: false
                               },
                               bottomTabs: {
                                   currentTabIndex: 0
                               }
                           },
                           children: [
                               {
                                   component: {
                                       id: 'Scores',
                                       name: 'Scores',
                                       options: {
                                           bottomTab: {
                                               text: 'Scores',
                                               icon: homeIcon
                                           }
                                       }
                                   },
                               },
                               {
                                   component: {
                                       id: 'Account',
                                       name: 'Account',
                                       options: {
                                           bottomTab: {
                                               text: 'Account',
                                               icon: starIcon
                                           }
                                       }
                                   },
                               },
                           ],
                       }
                       },

                    ]
                }

               });
            });
        });
    }

    getAuthLayout() {
        return {
                id: "AuthTabs",
               options: {
                   topBar: {
                       visible: true
                   },
               },
               children: [
                    {
                      component: {
                          id: 'SignUp',
                          name: 'SignUp'
                      },
                    },
                    {
                      component: {
                          id: 'ForgotPassword',
                          name: 'ForgotPassword'
                      },
                    },
                   {
                       component: {
                           id: 'Login',
                           name: 'Login',
                           options: {
                                topBar: {
                                    backButton: {
                                        visible: false
                                    }
                                }
                           }
                       },
                   },
               ],
        };
    }

    navigateToHome(Navigation, componentId) {
        this.getHomeLayout().then((homeTabs) => {
//             Navigation.push(componentId, homeTabs);
            Navigation.setRoot({
                root: homeTabs
            });
        });
    }

    navigateToAuth(Navigation, componentId) {
        const authTabs = this.getAuthLayout();
        Navigation.setRoot({
            root: {
                stack: authTabs
            }
        });
    }
}
