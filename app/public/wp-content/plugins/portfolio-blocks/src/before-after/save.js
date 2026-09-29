import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { beforeUrl, afterUrl, beforeLabel, afterLabel, caption } = attributes;
  const blockProps = useBlockProps.save({ className: 'before-after-box my-12' });

  if (!beforeUrl || !afterUrl) return null;

  return (
    <div {...blockProps}>
      <div className="flex flex-col items-center">
        <div className="before-after-container" data-before-after>
          <div className="before-after-badge is-before">
            [{beforeLabel}]
          </div>
          <div className="before-after-badge is-after">
            [{afterLabel}]
          </div>

          <img
            src={afterUrl}
            alt={afterLabel}
            className="before-after-base-img"
          />

          <div
            className="before-after-overlay"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          >
            <img
              src={beforeUrl}
              alt={beforeLabel}
            />
          </div>

          <div className="before-after-slider-line" style={{ left: '50%' }}>
            <div className="before-after-handle">↔</div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="before-after-range-input"
            aria-label="Сравнение до и после"
          />
        </div>

        {caption && (
          <p className="font-sans font-medium text-base text-dark/90 mt-4 text-center">
            <RichText.Content value={caption} />
          </p>
        )}
      </div>
    </div>
  );
}