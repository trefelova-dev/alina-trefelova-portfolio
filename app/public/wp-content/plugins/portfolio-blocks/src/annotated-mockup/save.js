import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { imgPrimary, imgSecondary, noteTop, noteBottom } = attributes;
  const blockProps = useBlockProps.save({ className: 'annotated-mockup-block my-8' });

  return (
    <div {...blockProps}>
      <div className="annotated-composition">
        {noteTop && (
          <div className="note-group-top">
            <span className="note">
              <RichText.Content value={noteTop} />
            </span>
            <div className="note-arrow-top" aria-hidden="true" />
          </div>
        )}

        {imgPrimary && (
          <div className="mockup-layer-primary">
            <img
              src={imgPrimary}
              alt="Mockup view"
              className="annotated-img"
              data-zoomable
            />
          </div>
        )}

        {imgSecondary && (
          <div className="mockup-layer-secondary">
            <img
              src={imgSecondary}
              alt="Mockup detail"
              className="annotated-img"
              data-zoomable
            />
          </div>
        )}

        {noteBottom && (
          <div className="note-group-bottom">
            <div className="note-arrow-bottom" aria-hidden="true" />
            <span className="note">
              <RichText.Content value={noteBottom} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}