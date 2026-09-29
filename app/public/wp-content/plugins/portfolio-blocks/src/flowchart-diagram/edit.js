import { useBlockProps, RichText, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { diagramUrl, caption, tag, bgMode } = attributes;
  const blockProps = useBlockProps({ className: 'flowchart-diagram-block my-12' });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Настройки отображения схемы">
          <SelectControl
            label="Подложка диаграммы"
            value={bgMode}
            options={[
              { label: 'Светлая плашка (card)', value: 'card' },
              { label: 'Инженерная сетка-миллиметровка (grid)', value: 'grid' },
              { label: 'Без фона (transparent)', value: 'transparent' },
            ]}
            onChange={(val) => setAttributes({ bgMode: val })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className={`diagram-canvas mode-${bgMode}`}>
          <div className="diagram-header">
            <span className="geek-badge">
              [
              <RichText
                tagName="span"
                value={tag}
                onChange={(val) => setAttributes({ tag: val })}
                placeholder="system_architecture"
                allowedFormats={[]}
              />
              ]
            </span>
            <span className="diagram-hint">[click to zoom]</span>
          </div>

          <div className="diagram-scroll-area">
            {diagramUrl ? (
              <img src={diagramUrl} alt="Architecture preview" className="diagram-img" />
            ) : (
              <div className="py-12 text-center w-full">
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => setAttributes({ diagramUrl: media.url })}
                    allowedTypes={['image']}
                    render={({ open }) => (
                      <Button variant="secondary" onClick={open}>
                        + Загрузить схему (SVG / PNG / JPG)
                      </Button>
                    )}
                  />
                </MediaUploadCheck>
              </div>
            )}
          </div>

          {diagramUrl && (
            <div className="mt-3">
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => setAttributes({ diagramUrl: media.url })}
                  allowedTypes={['image']}
                  render={({ open }) => (
                    <Button isSmall variant="tertiary" onClick={open}>
                      Сменить схему
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            </div>
          )}
        </div>

        <div className="w-full text-center mt-3">
          <RichText
            tagName="p"
            value={caption}
            onChange={(val) => setAttributes({ caption: val })}
            placeholder="Подпись к архитектурной схеме..."
            className="font-sans font-medium text-sm text-dark/80"
          />
        </div>
      </div>
    </>
  );
}