import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { code, language, fileName } = attributes;
  const blockProps = useBlockProps({ className: 'code-snippet-box my-12' });

  const linesCount = (code || '').split('\n').length;
  const lineNumbers = Array.from({ length: linesCount }, (_, i) => String(i + 1).padStart(2, '0'));

  return (
    <>
      <InspectorControls>
        <PanelBody title="Настройки сниппета">
          <SelectControl
            label="Язык программирования"
            value={language}
            options={[
              { label: 'TypeScript', value: 'typescript' },
              { label: 'JavaScript', value: 'javascript' },
              { label: 'PHP', value: 'php' },
              { label: 'Python', value: 'python' },
              { label: 'SCSS / CSS', value: 'scss' },
              { label: 'Bash / Shell', value: 'bash' },
            ]}
            onChange={(val) => setAttributes({ language: val })}
          />
          <TextControl
            label="Имя файла"
            value={fileName}
            onChange={(val) => setAttributes({ fileName: val })}
            placeholder="example.ts"
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="code-editor-ui">
          <div className="code-editor-header">
            <div className="code-editor-meta">
              <span className="geek-badge">[{fileName || 'snippet'}]</span>
              <span className="font-mono text-xs opacity-60">lang: {language}</span>
            </div>
            <button type="button" className="btn-copy-code" disabled>
              [copy_code]
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

            <textarea
              value={code}
              onChange={(e) => setAttributes({ code: e.target.value })}
              placeholder="// Вставьте или напишите сюда код..."
              rows={Math.max(4, linesCount)}
              className="w-full bg-transparent font-mono text-xs md:text-sm text-cream resize-none border-none outline-none leading-[22px] p-0"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}