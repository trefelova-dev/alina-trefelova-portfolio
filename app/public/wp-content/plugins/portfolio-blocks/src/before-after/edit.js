import { useBlockProps, MediaUpload, MediaUploadCheck, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const { beforeUrl, afterUrl, beforeLabel, afterLabel, caption } = attributes;
  const [sliderPos, setSliderPos] = useState(50);
  const blockProps = useBlockProps({ className: 'before-after-box my-12' });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Настройки сравнения">
          <TextControl
            label="Текст бейджа До"
            value={beforeLabel}
            onChange={(val) => setAttributes({ beforeLabel: val })}
          />
          <TextControl
            label="Текст бейджа После"
            value={afterLabel}
            onChange={(val) => setAttributes({ afterLabel: val })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {(!beforeUrl || !afterUrl) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border-2 border-dashed border-dark/20 rounded-card">
            <div className="text-center">
              <span className="geek-badge mb-2">[{beforeLabel || 'before'}]</span>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => setAttributes({ beforeUrl: media.url })}
                  allowedTypes={['image']}
                  value={beforeUrl}
                  render={({ open }) => (
                    <div
                      onClick={open}
                      className="cursor-pointer border border-dark/20 rounded p-4 bg-white/50 min-h-[140px] flex items-center justify-center"
                    >
                      {beforeUrl ? (
                        <img src={beforeUrl} alt="Before preview" className="max-h-32 object-contain" />
                      ) : (
                        <span className="font-mono text-xs text-dark/60">+ Загрузить экран ДО</span>
                      )}
                    </div>
                  )}
                />
              </MediaUploadCheck>
            </div>

            <div className="text-center">
              <span className="geek-badge mb-2">[{afterLabel || 'after'}]</span>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => setAttributes({ afterUrl: media.url })}
                  allowedTypes={['image']}
                  value={afterUrl}
                  render={({ open }) => (
                    <div
                      onClick={open}
                      className="cursor-pointer border border-dark/20 rounded p-4 bg-white/50 min-h-[140px] flex items-center justify-center"
                    >
                      {afterUrl ? (
                        <img src={afterUrl} alt="After preview" className="max-h-32 object-contain" />
                      ) : (
                        <span className="font-mono text-xs text-dark/60">+ Загрузить экран ПОСЛЕ</span>
                      )}
                    </div>
                  )}
                />
              </MediaUploadCheck>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <div className="before-after-container">
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
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={beforeUrl}
                  alt={beforeLabel}
                />
              </div>

              <div className="before-after-slider-line" style={{ left: `${sliderPos}%` }}>
                <div className="before-after-handle">↔</div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="before-after-range-input"
                aria-label="Сравнение до и после"
              />
            </div>

            <div className="flex gap-4 mt-3">
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => setAttributes({ beforeUrl: media.url })}
                  allowedTypes={['image']}
                  render={({ open }) => (
                    <Button isSmall variant="tertiary" onClick={open}>
                      Сменить [before]
                    </Button>
                  )}
                />
                <MediaUpload
                  onSelect={(media) => setAttributes({ afterUrl: media.url })}
                  allowedTypes={['image']}
                  render={({ open }) => (
                    <Button isSmall variant="tertiary" onClick={open}>
                      Сменить [after]
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            </div>

            <div className="w-full text-center mt-4">
              <RichText
                tagName="p"
                value={caption}
                onChange={(val) => setAttributes({ caption: val })}
                placeholder="Подпись к сравнению экранов..."
                className="font-sans font-medium text-base text-dark/85"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}