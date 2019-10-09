export interface ComponentsI {
  register(id: string, path: string)
  getPath(id: string): string | undefined
}
