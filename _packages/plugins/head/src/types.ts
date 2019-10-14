interface HeadConfig {
  title: string
  description: string
  meta: { [name: string]: string }
}

type Options = Partial<HeadConfig>;
