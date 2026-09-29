import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { features } = attributes;
  const blockProps = useBlockProps.save({
    className: 'feature-accordion-block my-12',
    'data-feature-accordion': true,
  });

  if (!features || !features.length) return null;

  return (
    <div {...blockProps}>
      <div className="feature-accordion-layout">
        <div className="feature-accordion-list">
          {features.map((item, idx) => (
            <div
              key={idx}
              className={`feature-item ${idx === 0 ? 'is-active' : ''}`}
              data-feature-index={idx}
            >
              <button
                type="button"
                className="feature-trigger"
                aria-expanded={idx === 0 ? 'true' : 'false'}
              >
                <div className="feature-trigger-left">
                  {item.tag && <span className="geek-badge">[{item.tag}]</span>}
                  <span className="feature-title">
                    <RichText.Content value={item.title} />
                  </span>
                </div>
                <span className="feature-arrow">→</span>
              </button>

              <div
                className="feature-body"
                style={{ display: idx === 0 ? 'block' : 'none' }}
              >
                <p>
                  <RichText.Content value={item.description} />
                </p>

                {item.imgUrl && (
                  <div className="feature-mobile-img-wrap">
                    <img
                      src={item.imgUrl}
                      alt={item.title || ''}
                      className="feature-mobile-img"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="feature-preview-sticky">
          {features.map((item, idx) => (
            item.imgUrl ? (
              <img
                key={idx}
                src={item.imgUrl}
                alt={item.title || ''}
                className={`feature-preview-img ${idx === 0 ? 'is-active' : ''}`}
                data-preview-index={idx}
              />
            ) : null
          ))}
        </div>
      </div>
    </div>
  );
}