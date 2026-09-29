import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { layout, items } = attributes;
  const blockProps = useBlockProps({ className: 'project-gallery-block my-12' });

  const addItem = () => {
    setAttributes({
      items: [
        ...items,
        {
          id: Date.now(),
          desktopUrl: '',
          desktopAlt: '',
          mobileUrl: '',
          mobileAlt: '',
          caption: '',
        },
      ],
    });
  };

  const updateItem = (index, field, value) => {
    const nextItems = [...items];
    nextItems[index] = { ...nextItems[index], [field]: value };
    setAttributes({ items: nextItems });
  };

  const removeItem = (index) => {
    setAttributes({ items: items.filter((_, i) => i !== index) });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Настройки галереи">
          <SelectControl
            label="Режим галереи"
            value={layout}
            options={[
              { label: 'Pinterest / Сетка (Masonry)', value: 'masonry' },
              { label: 'Большой слайдер (Одиночный)', value: 'slider-single' },
              { label: 'Слайдер комбо (Десктоп + Мобайл)', value: 'slider-paired' },
            ]}
            onChange={(val) => setAttributes({ layout: val })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {items.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-dark/20 rounded-card text-center">
            <p className="font-mono text-sm text-dark/70 mb-4">[gallery: empty]</p>
            <Button variant="primary" onClick={addItem}>
              + Добавить первый экран
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item, idx) => (
              <div key={item.id || idx} className="p-4 bg-white/50 border border-dark/10 rounded-card relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-dark/60">[screen_0{idx + 1}]</span>
                  <Button isDestructive isSmall onClick={() => removeItem(idx)}>
                    Удалить
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={(media) => updateItem(idx, 'desktopUrl', media.url)}
                        allowedTypes={['image']}
                        value={item.desktopUrl}
                        render={({ open }) => (
                          <div
                            onClick={open}
                            className="cursor-pointer border border-dashed border-dark/20 rounded p-2 text-center bg-white min-h-[140px] flex items-center justify-center overflow-hidden"
                          >
                            {item.desktopUrl ? (
                              <img src={item.desktopUrl} alt="Desktop preview" className="max-h-32 object-contain" />
                            ) : (
                              <span className="font-mono text-xs text-dark/60">+ Десктопный макет</span>
                            )}
                          </div>
                        )}
                      />
                    </MediaUploadCheck>
                  </div>

                  {layout === 'slider-paired' && (
                    <div>
                      <MediaUploadCheck>
                        <MediaUpload
                          onSelect={(media) => updateItem(idx, 'mobileUrl', media.url)}
                          allowedTypes={['image']}
                          value={item.mobileUrl}
                          render={({ open }) => (
                            <div
                              onClick={open}
                              className="cursor-pointer border border-dashed border-dark/20 rounded p-2 text-center bg-white min-h-[140px] flex items-center justify-center overflow-hidden"
                            >
                              {item.mobileUrl ? (
                                <img src={item.mobileUrl} alt="Mobile preview" className="max-h-32 object-contain" />
                              ) : (
                                <span className="font-mono text-xs text-dark/60">+ Мобильный макет</span>
                              )}
                            </div>
                          )}
                        />
                      </MediaUploadCheck>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Инженерная подпись к экрану..."
                  value={item.caption || ''}
                  onChange={(e) => updateItem(idx, 'caption', e.target.value)}
                  className="mt-3 w-full font-mono text-xs px-2 py-1 border border-dark/20 rounded bg-white"
                />
              </div>
            ))}

            <Button variant="secondary" onClick={addItem} className="w-full justify-center">
              + Добавить экран в слайдер
            </Button>
          </div>
        )}
      </div>
    </>
  );
}