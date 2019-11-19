export default () => ({
    bottomTabs: {
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
                        icon: require('../../../../assets/svg/profile.png')
                      }
                    }
                },
            },
            // {
            //     component: {
            //         id: 'MainMapView',
            //         name: 'MainMapView',
            //         passProps: {
            //             ...mapProps
            //         },
            //         options: {
            //           bottomTab: {
            //             text: 'Expore',
            //             icon: require('../../../../assets/svg/explore.png')
            //           }
            //         }
            //     },
            // },
            {
              component: {
                  id: 'Account',
                  name: 'Account',
                  options: {
                    bottomTab: {
                      text: 'Account',
                      icon: require('../../../../assets/svg/profile.png')
                    }
                  }
              },
          },
        ],
    },
  });