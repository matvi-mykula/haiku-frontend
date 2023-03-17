declare module 'nltk' {
  export function posTag(words: string[]): Array<[string, string]>;
}
