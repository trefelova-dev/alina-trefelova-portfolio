import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    theme,
    mode,
    step1Badge, step1Title, step1Text,
    step2Badge, step2Title, step2Text,
    step3Badge, step3Title, step3Text,
  } = attributes;

  const isDark = theme === 'dark';
  const isThreeSteps = mode === '3-steps';

  const blockProps = useBlockProps.save({
    className: `challenge-solution-box theme-${theme} my-12`,
  });

  return (
    <div {...blockProps}>
      <div
        className={`grid gap-6 md:gap-4 lg:gap-8 items-start ${
          isThreeSteps
            ? 'grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr]'
            : 'grid-cols-1 md:grid-cols-[1fr_auto_1fr]'
        }`}
      >
        <div className="challenge-step-card">
          <div className="geek-badge self-start mb-2">
            [{step1Badge}]
          </div>
          <h4 className={`font-sans font-bold text-xl md:text-2xl mb-2.5 ${isDark ? 'text-accentSecond' : 'text-accent'}`}>
            <RichText.Content value={step1Title} />
          </h4>
          <p className="challenge-text font-sans text-sm md:text-base leading-relaxed">
            <RichText.Content value={step1Text} />
          </p>
        </div>

        <div className="challenge-step-divider pt-8" />

        <div className="challenge-step-card">
          <div className="geek-badge self-start mb-2">
            [{step2Badge}]
          </div>
          <h4 className={`font-sans font-bold text-xl md:text-2xl mb-2.5 ${isDark ? 'text-accentSecond' : 'text-accent'}`}>
            <RichText.Content value={step2Title} />
          </h4>
          <p className="challenge-text font-sans text-sm md:text-base leading-relaxed">
            <RichText.Content value={step2Text} />
          </p>
        </div>

        {isThreeSteps && (
          <>
            <div className="challenge-step-divider pt-8" />
            <div className="challenge-step-card">
              <div className="geek-badge self-start mb-2">
                [{step3Badge}]
              </div>
              <h4 className={`font-sans font-bold text-xl md:text-2xl mb-2.5 ${isDark ? 'text-accentSecond' : 'text-accent'}`}>
                <RichText.Content value={step3Title} />
              </h4>
              <p className="challenge-text font-sans text-sm md:text-base leading-relaxed">
                <RichText.Content value={step3Text} />
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}