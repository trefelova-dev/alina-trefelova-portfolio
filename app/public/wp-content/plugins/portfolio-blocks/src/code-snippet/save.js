import { useBlockProps } from '@wordpress/block-editor';
import { highlightCode } from './highlight';

export default function Save({ attributes }) {
  const { code, language, fileName } = attributes;
  const blockProps = useBlockProps.save({ className: 'code-snippet-box my-12' });

  const linesCount = (code || '').split('\n').length;
  const lineNumbers = Array.from({ length: linesCount }, (_, i) => String(i + 1).padStart(2, '0'));

  return (
    <div {...blockProps}>
      <div className="code-editor-ui" data-code-box>
        <div className="code-editor-header">
          <div className="code-editor-meta">
            <span className="geek-badge">[{fileName || 'code'}]</span>
            <span className="font-mono text-xs opacity-60">{language}</span>
          </div>
          <button
            type="button"
            className="btn-copy-code"
            data-code={code}
            aria-label="Копировать код"
          >
            <span className="copy-label">[copy_code]</span>
          </button>
        </div>

        <div className="code-editor-body">
          <div className="code-line-numbers" aria-hidden="true">
            {lineNumbers.map((num) => (
              <div key={num} className="line-num-item">
                {num}
              </div>
            ))}
          </div>

          <pre className="code-pre-block">
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
}