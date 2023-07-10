export interface Rainbow {
    extend(language: string, languagePatterns: any, inherits: string): void;
    color(e?: Event): void;
    remove(language: string): void;
    onHighlight(callback: Function): void;
    addAlias(alias: string, language: string): void;
    colorSync?(code: string, lang: string): void;
}

export interface Options {
  globalClass: string | null
  language?: string | null
  delay: number | null
  patterns?: Record<string, Pattern[]>
  inheritenceMap?: Record<string, string>
  aliases?: Record<string, string>
}

export interface Pattern {
  name: string
  pattern: RegExp
  language?: string
  matches?: Record<string, string | Pattern | Pattern[]>
}

export interface WorkerData {
  id: number
  code: string
  lang?: string | null
  options: Options
  isNode: boolean
}