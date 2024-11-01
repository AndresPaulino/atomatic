

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
  icon: any;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
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
      groupLabel: "Dashboard",
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/",
          label: "Dashboard",
          active: pathname.includes("/"),
          icon: "heroicons-outline:home",
          submenus: [],
        },
      ],
    },
    
  ];
}
export function getHorizontalMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Dashboard",
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/",
          label: "Dashboard",
          active: pathname.includes("/"),
          icon: "heroicons-outline:home",
          submenus:[],
        },
      ],
    },

    
  ];
}


