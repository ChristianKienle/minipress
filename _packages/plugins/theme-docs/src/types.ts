export interface Navbar {
  items: NavbarItem[];
}
export interface NavbarItem {
  text: string;
  link: string;
}
export interface _Options {
  navbar: Navbar
}
export type Options = Partial<_Options>
