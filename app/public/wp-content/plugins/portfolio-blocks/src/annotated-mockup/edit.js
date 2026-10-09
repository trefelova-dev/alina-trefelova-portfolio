import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

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
                  <div className="relative group/media">
                    <img
                      src={imgPrimary}
                      alt="Primary preview"
                      className="annotated-img"
                    />
                    <div className="absolute top-2 right-2 flex gap-1 z-10">
                      <Button
                        variant="secondary"
                        size="compact"
                        onClick={open}
                        className="!bg-white/90 !text-black shadow-sm"
                      >
                        Заменить
                      </Button>
                      <Button
                        variant="destructive"
                        size="compact"
                        onClick={() => setAttributes({ imgPrimary: '' })}
                        className="shadow-sm"
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={open}
                    className="annotated-img-placeholder w-full text-center flex items-center justify-center cursor-pointer border border-dashed p-4"
                  >
                    <span className="font-mono text-xs text-dark/60">+ Картинка 1 (основа)</span>
                  </Button>
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
                  <div className="relative group/media">
                    <img
                      src={imgSecondary}
                      alt="Secondary preview"
                      className="annotated-img"
                    />
                    <div className="absolute top-2 right-2 flex gap-1 z-10">
                      <Button
                        variant="secondary"
                        size="compact"
                        onClick={open}
                        className="!bg-white/90 !text-black shadow-sm"
                      >
                        Заменить
                      </Button>
                      <Button
                        variant="destructive"
                        size="compact"
                        onClick={() => setAttributes({ imgSecondary: '' })}
                        className="shadow-sm"
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={open}
                    className="annotated-img-placeholder w-full text-center flex items-center justify-center cursor-pointer border border-dashed p-4"
                  >
                    <span className="font-mono text-xs text-dark/60">+ Картинка 2 (нахлест)</span>
                  </Button>
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