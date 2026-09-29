import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { badge, value, description, theme, layout } = attributes;

  const isDark = theme === 'dark';
  const isStacked = layout === 'stacked';

  const blockProps = useBlockProps({
    className: `stat-card-custom theme-${theme} my-12 w-full transition-all ${
      isStacked
        ? 'flex flex-col gap-4'
        : 'flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10'
    }`,
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Настройки карточки">
          <SelectControl
            label="Цветовая тема"
            value={theme}
            options={[
              { label: 'Светлая (минимал)', value: 'light' },
              { label: 'Темная (органическая подложка)', value: 'dark' },
            ]}
            onChange={(val) => setAttributes({ theme: val })}
          />
          <SelectControl
            label="Расположение элементов"
            value={layout}
            options={[
              { label: 'В ряд (цифра слева, текст справа)', value: 'inline' },
              { label: 'Колонка (для длинных мыслей/цитат)', value: 'stacked' },
            ]}
            onChange={(val) => setAttributes({ layout: val })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div
          className={`font-sans font-bold text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none shrink-0 select-none ${
            isDark ? 'text-accentSecond' : 'text-accent'
          }`}
        >
          <RichText
            tagName="span"
            value={value}
            onChange={(val) => setAttributes({ value: val })}
            placeholder="45%"
            allowedFormats={[]}
          />
        </div>

        <div className="flex flex-col items-start justify-center gap-2.5 py-1">
          <div className="geek-badge">
            [
            <RichText
              tagName="span"
              value={badge}
              onChange={(val) => setAttributes({ badge: val })}
              placeholder="metric: name"
              allowedFormats={[]}
            />
            ]
          </div>

          <div className="stat-desc font-sans text-base md:text-lg leading-relaxed">
            <RichText
              tagName="p"
              value={description}
              onChange={(val) => setAttributes({ description: val })}
              placeholder="Оптимизация рендеринга и нормализация..."
            />
          </div>
        </div>
      </div>
    </>
  );
}