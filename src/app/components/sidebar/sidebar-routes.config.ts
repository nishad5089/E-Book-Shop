export const ROUTES = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', children: null  },
  { path: '/user-profile', title: 'User Profile',  icon: 'person', children: null  },

    { path: '#component', id: 'component', title: 'Component', icon: 'apps', children: [
      { path: '/notifications', title: 'Notifications',  icon: 'notifications',  children: null  },
        { path: '/table-list', title: 'Table List',  icon: 'content_paste', children: null  },
        {path: 'components/wizard', title: 'Wizard', icon: 'W',  children: null },
      ]},
      { path: '/icons', title: 'Icons',  icon:  'bubble_chart',  children: null },
      { path: '/maps', title: 'Maps',  icon: 'location_on',  children: null  },
      { path: '/notifications', title: 'Notifications',  icon: 'notifications',  children: null  }
];
// export const ROUTES = [
//   { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
//   { path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' },
//   { path: '/table-list', title: 'Table List',  icon: 'content_paste', class: '' },
//   { path: '/typography', title: 'Typography',  icon: 'library_books', class: '' },
//   { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//   { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
//   { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
//   { path: '/upgrade', title: 'Upgrade to PRO',  icon: 'unarchive', class: 'active-pro' },
// ];