export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  href?: string;
  enable?: boolean;
}

export interface IMenu {
  title: string;
  link: string;
  subItems: ISubmenu[];
}
export interface ISubmenu {
  title?: string;
  link?: string;
}
