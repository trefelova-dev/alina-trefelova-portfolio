import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { cards } = attributes;
  const blockProps = useBlockProps({ className: 'bento-grid-block my-12' });

  const updateCard = (index, field, value) => {
    const updated = cards.map((c, i) => (i === index ? { ...c, [field]: value } : c));
    setAttributes({ cards: updated });
  };

  return (
    <div {...blockProps}>
      <div className="bento-grid-container">
        {cards.map((card, idx) => (
          <div key={idx} className="bento-card">
            <div>
              <div className="geek-badge self-start mb-2">
                [
                <RichText
                  tagName="span"
                  value={card.badge}
                  onChange={(val) => updateCard(idx, 'badge', val)}
                  placeholder="tag"
                  allowedFormats={[]}
                />
                ]
              </div>

              <RichText
                tagName="h4"
                className="bento-card-title font-sans font-bold text-lg md:text-xl mb-1.5"
                value={card.title}
                onChange={(val) => updateCard(idx, 'title', val)}
                placeholder="Заголовок фичи..."
              />

              <RichText
                tagName="p"
                className="bento-card-text font-sans text-xs md:text-sm leading-relaxed"
                value={card.text}
                onChange={(val) => updateCard(idx, 'text', val)}
                placeholder="Описание фичи или инсайта..."
              />
            </div>

            <div className="bento-card-img-wrap">
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => updateCard(idx, 'imgUrl', media.url)}
                  allowedTypes={['image']}
                  value={card.imgUrl}
                  render={({ open }) =>
                    card.imgUrl ? (
                      <div onClick={open} className="cursor-pointer relative group">
                        <img src={card.imgUrl} alt={card.title} />
                        <span className="absolute inset-0 bg-black/40 text-white font-mono text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          [изменить]
                        </span>
                      </div>
                    ) : (
                      <Button
                        isSmall
                        variant="secondary"
                        onClick={open}
                        className="w-full text-center mt-2"
                      >
                        + Скриншот (опционально)
                      </Button>
                    )
                  }
                />
              </MediaUploadCheck>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}