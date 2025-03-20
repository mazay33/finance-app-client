export function buildUrl(...args: string[]): string {
  return args.filter(Boolean).join('/')
}
