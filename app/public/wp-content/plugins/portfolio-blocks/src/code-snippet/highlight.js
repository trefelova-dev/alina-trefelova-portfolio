export function highlightCode(code = '') {
  const escapeHtml = (str) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const tokenRegex =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\.|[^`])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(const|let|var|function|return|async|await|import|from|export|default|if|else|switch|case|try|catch|new|class|extends|throw)\b|\b(\d+)\b|\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g;

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