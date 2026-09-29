import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const { features } = attributes;
  const [activeIndex, setActiveIndex] = useState(0);
  const blockProps = useBlockProps({ className: 'feature-accordion-block my-12' });

  const updateFeature = (index, field, value) => {
    const updated = features.map((f, i) => (i === index ? { ...f, [field]: value } : f));
    setAttributes({ features: updated });
  };

  const addFeature = () => {
    setAttributes({
      features: [
        ...features,
        {
          tag: `0${features.length + 1}_feature`,
          title: 'Новая фича',
          description: 'Описание архитектурного решения...',
          imgUrl: '',
        },
      ],
    });
  };

  const removeFeature = (index) => {
    if (features.length <= 1) return;
    const filtered = features.filter((_, i) => i !== index);
    setAttributes({ features: filtered });
    setActiveIndex(0);
  };

  const currentPreview = features[activeIndex]?.imgUrl || '';

  return (
    <div {...blockProps}>
      <div className="feature-accordion-layout">
        <div className="feature-accordion-list">
          {features.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                className={`feature-item ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="feature-trigger">
                  <div className="feature-trigger-left">
                    <span className="geek-badge">
                      [
                      <RichText
                        tagName="span"
                        value={item.tag}
                        onChange={(val) => updateFeature(idx, 'tag', val)}
                        placeholder="tag"
                        allowedFormats={[]}
                      />
                      ]
                    </span>
                    <RichText
                      tagName="span"
                      className="feature-title"
                      value={item.title}
                      onChange={(val) => updateFeature(idx, 'title', val)}
                      placeholder="Название фичи..."
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {features.length > 1 && (
                      <Button
                        isDestructive
                        isSmall
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFeature(idx);
                        }}
                      >
                        ✕
                      </Button>
                    )}
                    <span className="feature-arrow font-mono text-sm">→</span>
                  </div>
                </div>

                {isActive && (
                  <div className="feature-body">
                    <RichText
                      tagName="p"
                      value={item.description}
                      onChange={(val) => updateFeature(idx, 'description', val)}
                      placeholder="Подробное описание работы фичи..."
                    />
                    <div className="mt-3">
                      <MediaUploadCheck>
                        <MediaUpload
                          onSelect={(media) => updateFeature(idx, 'imgUrl', media.url)}
                          allowedTypes={['image']}
                          value={item.imgUrl}
                          render={({ open }) => (
                            <Button isSmall variant="secondary" onClick={open}>
                              {item.imgUrl ? 'Сменить скриншот фичи' : '+ Загрузить скриншот'}
                            </Button>
                          )}
                        />
                      </MediaUploadCheck>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Button variant="secondary" onClick={addFeature} className="mt-2 w-full justify-center">
            + Добавить пункт фичи
          </Button>
        </div>

        <div className="feature-preview-sticky">
          {currentPreview ? (
            <img src={currentPreview} alt="Feature preview" className="w-full h-full object-cover" />
          ) : (
            <div className="feature-preview-empty">
              [screen_preview: {features[activeIndex]?.tag || 'empty'}]
            </div>
          )}
        </div>
      </div>
    </div>
  );
}