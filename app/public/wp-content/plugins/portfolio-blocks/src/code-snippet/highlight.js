export function highlightCode(code = '', language = '') {
  const escapeHtml = (str) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const lang = (language || '').toLowerCase();
  let commentPattern = '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/';

  if (lang.includes('python') || lang.includes('bash') || lang.includes('shell')) {
    commentPattern = '#[^\\n]*';
  } else if (lang.includes('php')) {
    commentPattern = '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/|#[^\\n]*';
  }

  const stringPattern =
    lang.includes('python')
      ? '"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|`[^`]*`|"(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\''
      : '`[^`]*`|"(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\'';

  const keywords = [
    // JS / TS
    'const', 'let', 'var', 'function', 'return', 'async', 'await', 'import', 'from', 'export', 'default',
    'if', 'else', 'switch', 'case', 'try', 'catch', 'finally', 'new', 'class', 'extends', 'throw', 'typeof',
    // Python
    'def', 'self', 'with', 'as', 'elif', 'pass', 'lambda', 'yield', 'raise', 'except', 'is', 'in', 'not', 'and', 'or', 'None', 'True', 'False',
    // PHP
    'echo', 'public', 'private', 'protected', 'static', 'namespace', 'use', 'foreach', 'while', 'fn',
    // Bash
    'fi', 'then', 'do', 'done', 'esac'
  ].join('|');

  const tokenRegex = new RegExp(
    `(${commentPattern})|(${stringPattern})|\\b(${keywords})\\b|\\b(\\d+)\\b|\\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\\s*\\()`,
    'g'
  );

  return escapeHtml(code).replace(
    tokenRegex,
    (match, comment, string, keyword, number, func) => {
      if (comment) return `<span class="tok-comment">${comment}</span>`;
      if (string) return `<span class="tok-string">${string}</span>`;
      if (keyword) return `<span class="tok-keyword">${keyword}</span>`;
      if (number) return `<span class="tok-number">${number}</span>`;
      if (func) return `<span class="tok-func">${func}</span>`;
      return match;
    }
  );
}