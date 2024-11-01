export type SubChildren = {
  href: string;
  label: string;
  active: boolean;
  children?: SubChildren[];
};
export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: React.ReactNode;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: React.ReactNode;
  submenus: Submenu[];
  id: string;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
  id: string;
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: 'Dashboard',
      id: 'dashboard',
      menus: [
        {
          id: 'dashboard',
          href: '/dashboard',
          label: 'Dashboard',
          active: pathname === '/dashboard',
          icon: 'heroicons-outline:home',
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Strategies',
      id: 'strategies',
      menus: [
        {
          id: 'strategies',
          href: '/dashboard/strategies',
          label: 'Strategies',
          active: pathname.includes('/strategies'),
          icon: 'heroicons-outline:puzzle',
          submenus: [
            {
              href: '/dashboard/strategies/my-strategies',
              label: 'My Strategies',
              active: pathname === '/dashboard/strategies/my-strategies',
              icon: 'heroicons:',
              children: [],
            },
            {
              href: '/dashboard/strategies/strategy-builder',
              label: 'Create Strategy',
              active: pathname === '/dashboard/strategies/strategy-builder',
              icon: 'heroicons:',
              children: [],
            },
          ],
        },
      ],
    },
  ];
}
