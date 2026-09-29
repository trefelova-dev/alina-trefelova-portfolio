import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { diagramUrl, caption, tag, bgMode } = attributes;
  const blockProps = useBlockProps.save({
    className: 'flowchart-diagram-block my-12',
  });

  if (!diagramUrl) return null;

  return (
    <div {...blockProps}>
      <div className={`diagram-canvas mode-${bgMode}`}>
        <div className="diagram-header">
          {tag && <span className="geek-badge">[{tag}]</span>}
          <span className="diagram-hint">[click to zoom]</span>
        </div>

        <div className="diagram-scroll-area">
          <img
            src={diagramUrl}
            alt={caption || tag || 'Diagram'}
            className="diagram-img"
            data-zoomable
          />
        </div>
      </div>

      {caption && (
        <p className="font-sans font-medium text-sm text-dark/80 mt-3 text-center">
          <RichText.Content value={caption} />
        </p>
      )}
    </div>
  );
}