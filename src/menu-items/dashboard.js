// assets
import { IconDashboard,IconApps,IconShape2, IconCar } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'ALL Auctions',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
 
    {
      id: 'myauctions',
      title: 'My Auctions',
      type: 'item',
      url: '/myauctions',
      icon: IconApps,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
