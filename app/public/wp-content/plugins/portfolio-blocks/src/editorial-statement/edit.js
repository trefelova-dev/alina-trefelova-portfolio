import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { statement, author, theme } = attributes;
  const blockProps = useBlockProps({
    className: `editorial-statement-box theme-${theme} my-12`,
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Стиль акцента">
          <SelectControl
            label="Цветовая тема"
            value={theme}
            options={[
              { label: 'Светлая (чистая типографика)', value: 'light' },
              { label: 'Темная (плашка)', value: 'dark' },
            ]}
            onChange={(val) => setAttributes({ theme: val })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <RichText
          tagName="h3"
          className="statement-text"
          value={statement}
          onChange={(val) => setAttributes({ statement: val })}
          placeholder="Напишите ключевую мысль или манифест..."
        />

        <div className="statement-author">
          —{' '}
          <RichText
            tagName="span"
            value={author}
            onChange={(val) => setAttributes({ author: val })}
            placeholder="Автор / источник (необязательно)..."
          />
        </div>
      </div>
    </>
  );
}