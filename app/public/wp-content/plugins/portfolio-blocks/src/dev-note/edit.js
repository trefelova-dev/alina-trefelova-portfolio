import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({
    className: 'dev-note-wrapper my-12 inline-flex items-center gap-2 font-handwriting text-accent text-2xl',
  });

  return (
    <div {...blockProps}>
      <RichText
        tagName="span"
        value={attributes.content}
        onChange={(val) => setAttributes({ content: val })}
        placeholder="Текст рукописной заметки..."
        allowedFormats={['core/bold', 'core/italic']}
      />
    </div>
  );
}