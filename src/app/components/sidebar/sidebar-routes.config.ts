export const ROUTES = [
  { path: '/dashboard', title: 'Dashboard', class: '', icon: 'dashboard', children: null  },
  { path: '/user-profile', title: 'User Profile', class: '', icon: 'person', children: null  },
  { path: '/book', title: 'Book', class: '', icon: 'book', children: null  },

    { path: '#component', id: 'component', title: 'Component', class: '', icon: 'apps', children: [
      { path: '/notifications', title: 'Notifications', class: '', icon: 'notifications',  children: null  },
        { path: '/table-list', title: 'Table List', class: '', icon: 'content_paste', children: null  },
        {path: 'components/wizard', title: 'Wizard', class: '', icon: 'W',  children: null },
      ]},
      { path: '/icons', title: 'Icons', class: '', icon:  'bubble_chart',  children: null },
      { path: '/maps', title: 'Maps', class: '', icon: 'location_on',  children: null  },
      { path: '/notifications', title: 'Notifications', class: '', icon: 'notifications',  children: null  }
];
