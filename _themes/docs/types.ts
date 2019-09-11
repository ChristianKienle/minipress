export interface Navbar {
  items: NavbarItem[];
}
export interface NavbarItem {
  text: string;
  link: string;
}
export interface _Config {
  navbar: Navbar
}
export type Config = Partial<_Config>
