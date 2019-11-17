export default (mapProps = {}) => ({
    // component: {
    //   name: 'MainMapView',
    //   options: {
    //     topBar: {
    //       visible: false
    //     },
    //     // bottomTab: {
    //     //   text: "Map View"
    //     // }
    //   }
    // }
    bottomTabs: {
        options: {
          topBar: {
            visible: false
          },
          bottomTabs: {
            currentTabIndex: 1
          }
        },
        children: [
            {
                component: {
                    id: 'Alerts',
                    name: 'Alerts',
                    options: {
                      bottomTab: {
                        text: 'Activity',
                        icon: require('../../../../assets/svg/activity.png')
                      }
                    }
                },
            },
            {
                component: {
                    id: 'MainMapView',
                    name: 'MainMapView',
                    passProps: {
                        ...mapProps
                    },
                    options: {
                      bottomTab: {
                        text: 'Expore',
                        icon: require('../../../../assets/svg/explore.png')
                      }
                    }
                },
            },
            {
              component: {
                  id: 'Profile',
                  name: 'Profile',
                  options: {
                    bottomTab: {
                      text: 'Profile',
                      icon: require('../../../../assets/svg/profile.png')
                    }
                  }
              },
          },
        ],
    },
  });