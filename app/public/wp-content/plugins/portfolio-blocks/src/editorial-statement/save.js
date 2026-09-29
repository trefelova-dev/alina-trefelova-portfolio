import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { statement, author, theme } = attributes;
  const blockProps = useBlockProps.save({
    className: `editorial-statement-box theme-${theme} my-12`,
  });

  return (
    <div {...blockProps}>
      <h3 className="statement-text">
        <RichText.Content value={statement} />
      </h3>

      {author && (
        <span className="statement-author">
          — <RichText.Content value={author} />
        </span>
      )}
    </div>
  );
}