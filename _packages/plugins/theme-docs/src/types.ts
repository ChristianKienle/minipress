export interface Navbar {
  items: NavbarItem[]
}

export interface NavbarItem {
  text: string
  link: string
}

export interface _Options {
  navbar: Navbar
}

export interface LogoText {
  prefix: string
  suffix: string
}

export interface LogoConfig {
  text: LogoText
}

export type Logo =
  | LogoConfig // if used the logo will be drawn in two parts which are styles differently
  | string // used as the text of the logo

export type Options = Partial<_Options>
