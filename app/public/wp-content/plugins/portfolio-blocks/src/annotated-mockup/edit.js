import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
  const { imgPrimary, imgSecondary, noteTop, noteBottom } = attributes;
  const blockProps = useBlockProps({ className: 'annotated-mockup-block my-8' });

  return (
    <div {...blockProps}>
      <div className="annotated-composition">
        <div className="note-group-top">
          <RichText
            tagName="span"
            className="note"
            value={noteTop}
            onChange={(val) => setAttributes({ noteTop: val })}
            placeholder="Заметка сверху (опционально)..."
          />
          <div className="note-arrow-top" />
        </div>

        <div className="mockup-layer-primary">
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({ imgPrimary: media.url })}
              allowedTypes={['image']}
              value={imgPrimary}
              render={({ open }) =>
                imgPrimary ? (
                  <img
                    src={imgPrimary}
                    alt="Primary preview"
                    className="annotated-img"
                    onClick={open}
                  />
                ) : (
                  <div className="annotated-img-placeholder" onClick={open}>
                    <span className="font-mono text-xs text-dark/60">+ Картинка 1 (основа)</span>
                  </div>
                )
              }
            />
          </MediaUploadCheck>
        </div>

        <div className="mockup-layer-secondary">
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => setAttributes({ imgSecondary: media.url })}
              allowedTypes={['image']}
              value={imgSecondary}
              render={({ open }) =>
                imgSecondary ? (
                  <img
                    src={imgSecondary}
                    alt="Secondary preview"
                    className="annotated-img"
                    onClick={open}
                  />
                ) : (
                  <div className="annotated-img-placeholder" onClick={open}>
                    <span className="font-mono text-xs text-dark/60">+ Картинка 2 (нахлест)</span>
                  </div>
                )
              }
            />
          </MediaUploadCheck>
        </div>

        <div className="note-group-bottom">
          <div className="note-arrow-bottom" />
          <RichText
            tagName="span"
            className="note"
            value={noteBottom}
            onChange={(val) => setAttributes({ noteBottom: val })}
            placeholder="Заметка снизу (опционально)..."
          />
        </div>
      </div>
    </div>
  );
}