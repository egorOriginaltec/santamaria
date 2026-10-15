const KEYWORDS: Readonly<Record<string, readonly string[]>> = {
  python: [
    'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'elif', 'else', 'except', 'False',
    'for', 'from', 'if', 'import', 'in', 'is', 'lambda', 'None', 'not', 'or', 'pass', 'print',
    'raise', 'return', 'True', 'try', 'while', 'with', 'yield',
  ],
  javascript: [
    'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
    'else', 'export', 'false', 'finally', 'for', 'function', 'if', 'import', 'in', 'let', 'new',
    'null', 'of', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var',
    'void', 'while', 'yield',
  ],
  java: [
    'abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'class', 'continue', 'else', 'extends',
    'false', 'final', 'finally', 'for', 'if', 'implements', 'import', 'int', 'interface', 'new',
    'null', 'private', 'protected', 'public', 'return', 'static', 'super', 'this', 'throw', 'true',
    'try', 'void', 'while',
  ],
  html: ['html', 'head', 'body', 'div', 'span', 'script', 'style', 'class', 'id'],
  css: ['color', 'background', 'display', 'flex', 'grid', 'margin', 'padding', 'border', 'font'],
  sql: ['select', 'from', 'where', 'insert', 'into', 'update', 'delete', 'and', 'or', 'not', 'null', 'as'],
};

const GENERIC = [
  'and', 'break', 'class', 'const', 'continue', 'def', 'else', 'false', 'for', 'function', 'if',
  'import', 'let', 'new', 'not', 'null', 'or', 'print', 'return', 'true', 'try', 'var', 'void',
  'while',
];

export function highlightCode(source: string, language: string): string {
  const keywords = new Set((KEYWORDS[normalizeLang(language)] ?? GENERIC).map((word) => word.toLowerCase()));
  const tokens: string[] = [];
  let index = 0;

  while (index < source.length) {
    const comment = takeComment(source, index, language);
    if (comment) {
      tokens.push(wrap('cm', comment.text));
      index += comment.text.length;
      continue;
    }

    const string = takeString(source, index);
    if (string) {
      tokens.push(wrap('str', string));
      index += string.length;
      continue;
    }

    const number = takeMatch(source, index, /^(?:\d+\.?\d*|\.\d+)/);
    if (number) {
      tokens.push(wrap('num', number));
      index += number.length;
      continue;
    }

    const word = takeMatch(source, index, /^[A-Za-z_]\w*/);
    if (word) {
      const next = source.slice(index + word.length).match(/^\s*\(/);
      if (keywords.has(word.toLowerCase())) {
        tokens.push(wrap('kw', word));
      } else if (next) {
        tokens.push(wrap('fn', word));
      } else {
        tokens.push(escapeHtml(word));
      }
      index += word.length;
      continue;
    }

    tokens.push(escapeHtml(source[index] ?? ''));
    index += 1;
  }

  return tokens.join('') || '&nbsp;';
}

function normalizeLang(language: string): string {
  const value = language.trim().toLowerCase();
  if (value.includes('python') || value === 'py') {
    return 'python';
  }
  if (value.includes('javascript') || value === 'js' || value.includes('typescript') || value === 'ts') {
    return 'javascript';
  }
  if (value.includes('java')) {
    return 'java';
  }
  if (value.includes('html')) {
    return 'html';
  }
  if (value.includes('css')) {
    return 'css';
  }
  if (value.includes('sql')) {
    return 'sql';
  }

  return 'generic';
}

function takeComment(source: string, index: number, language: string): { text: string } | null {
  const lang = normalizeLang(language);
  if (source.startsWith('/*', index)) {
    const end = source.indexOf('*/', index + 2);
    return { text: end === -1 ? source.slice(index) : source.slice(index, end + 2) };
  }
  if (source.startsWith('//', index) || (lang === 'python' && source.startsWith('#', index))) {
    const end = source.indexOf('\n', index);
    return { text: end === -1 ? source.slice(index) : source.slice(index, end) };
  }

  return null;
}

function takeString(source: string, index: number): string | null {
  const quote = source[index];
  if (quote !== '"' && quote !== "'" && quote !== '`') {
    return null;
  }

  let cursor = index + 1;
  while (cursor < source.length) {
    if (source[cursor] === '\\') {
      cursor += 2;
      continue;
    }
    if (source[cursor] === quote) {
      return source.slice(index, cursor + 1);
    }
    if (quote !== '`' && source[cursor] === '\n') {
      break;
    }
    cursor += 1;
  }

  return source.slice(index, cursor);
}

function takeMatch(source: string, index: number, pattern: RegExp): string | null {
  const match = source.slice(index).match(pattern);
  return match?.[0] ?? null;
}

function wrap(kind: string, text: string): string {
  return `<span class="tok-${kind}">${escapeHtml(text)}</span>`;
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
