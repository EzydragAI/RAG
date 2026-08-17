const PATTERNS: Array<[RegExp, string]> = [
  [/\b[\w.+-]+@[\w-]+\.[\w.-]+\b/g, "[EMAIL]"],
  [/\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/g, "[PHONE_NUM]"],
  [/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN]"],
  [/\b(?:acct|account)[\s#:]*\d{6,}\b/gi, "[ACCOUNT]"],
];

const NAME_PATTERN =
  /\b(?:Mr\.|Mrs\.|Ms\.|Dr\.)?\s*[A-Z][a-z]+(?:\s[A-Z][a-z]+)+\b/g;

export function maskPii(text: string) {
  let next = text;
  for (const [pattern, token] of PATTERNS) {
    next = next.replace(pattern, token);
  }
  return next.replace(NAME_PATTERN, "[PERSON]");
}
