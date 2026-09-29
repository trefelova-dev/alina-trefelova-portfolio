import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { badge, value, description, theme, layout } = attributes;

  const isDark = theme === 'dark';
  const isStacked = layout === 'stacked';

  const rawText = (value || '').replace(/<[^>]*>?/gm, '').trim();
  const isLongText = rawText.length > 5;

  const blockProps = useBlockProps.save({
    className: `stat-card-custom theme-${theme} my-12 w-full ${
      isStacked
        ? 'flex flex-col gap-4'
        : 'flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10'
    }`,
  });

  return (
    <div {...blockProps}>
      <div
        className={`stat-card-value font-sans font-bold tracking-tight leading-none ${
          isLongText ? 'is-long-text' : 'is-short-stat'
        } ${isDark ? 'text-accentSecond' : 'text-accent'}`}
      >
        <RichText.Content tagName="span" value={value} />
      </div>

      <div className="flex flex-col items-start justify-center gap-2.5 py-1">
        {badge && (
          <div className="font-mono text-xs px-2 py-0.5 rounded-tag bg-surfaceDark text-[#e3e3e3] cursor-default transition-all duration-200 hover:invert select-none">
            [{badge}]
          </div>
        )}

        <div className="stat-desc font-sans text-base md:text-lg leading-relaxed">
          <RichText.Content tagName="p" value={description} />
        </div>
      </div>
    </div>
  );
}