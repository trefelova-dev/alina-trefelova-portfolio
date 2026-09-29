import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'dev-note-wrapper my-12 inline-flex items-center gap-2 font-handwriting text-accent text-2xl',
  });

  return (
    <div {...blockProps}>
      <RichText.Content tagName="span" value={attributes.content} />
    </div>
  );
}