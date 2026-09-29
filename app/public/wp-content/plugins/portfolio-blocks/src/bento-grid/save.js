import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { cards } = attributes;
  const blockProps = useBlockProps.save({ className: 'bento-grid-block my-12' });

  if (!cards || !cards.length) return null;

  return (
    <div {...blockProps}>
      <div className="bento-grid-container">
        {cards.map((card, idx) => (
          <div key={idx} className="bento-card">
            <div>
              {card.badge && (
                <div className="geek-badge self-start mb-2">
                  [{card.badge}]
                </div>
              )}
              <h4 className="bento-card-title font-sans font-bold text-lg md:text-xl mb-1.5">
                <RichText.Content value={card.title} />
              </h4>
              <p className="bento-card-text font-sans text-xs md:text-sm leading-relaxed">
                <RichText.Content value={card.text} />
              </p>
            </div>

            {card.imgUrl && (
              <div className="bento-card-img-wrap">
                <img src={card.imgUrl} alt={card.title || ''} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}