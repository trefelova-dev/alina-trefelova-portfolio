import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const {
    theme,
    mode,
    step1Badge, step1Title, step1Text,
    step2Badge, step2Title, step2Text,
    step3Badge, step3Title, step3Text,
  } = attributes;

  const isDark = theme === 'dark';
  const isThreeSteps = mode === '3-steps';

  const blockProps = useBlockProps({
    className: `challenge-solution-box theme-${theme} my-12`,
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Настройки отображения">
          <SelectControl
            label="Цветовая тема"
            value={theme}
            options={[
              { label: 'Светлая (с кастомной рамкой)', value: 'light' },
              { label: 'Темная (органическая подложка)', value: 'dark' },
            ]}
            onChange={(val) => setAttributes({ theme: val })}
          />
          <SelectControl
            label="Формат кейса"
            value={mode}
            options={[
              { label: '3 шага (Проблема -> Решение -> Результат)', value: '3-steps' },
              { label: '2 шага (Факап -> Фикс)', value: '2-steps' },
            ]}
            onChange={(val) => {
              if (val === '2-steps') {
                setAttributes({
                  mode: val,
                  step1Badge: '01_issue',
                  step2Badge: '02_fix',
                });
              } else {
                setAttributes({
                  mode: val,
                  step1Badge: '01_challenge',
                  step2Badge: '02_solution',
                });
              }
            }}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div
          className={`grid gap-6 md:gap-8 items-start ${
            isThreeSteps
              ? 'grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr]'
              : 'grid-cols-1 md:grid-cols-[1fr_auto_1fr]'
          }`}
        >
          <div className="challenge-step-card">
            <div className="geek-badge self-start mb-2">
              [
              <RichText
                tagName="span"
                value={step1Badge}
                onChange={(val) => setAttributes({ step1Badge: val })}
                placeholder="badge"
                allowedFormats={[]}
              />
              ]
            </div>
            <div className={`font-sans font-bold text-xl md:text-2xl mb-2.5 ${isDark ? 'text-accentSecond' : 'text-accent'}`}>
              <RichText
                tagName="h4"
                value={step1Title}
                onChange={(val) => setAttributes({ step1Title: val })}
                placeholder="Заголовок проблемы..."
              />
            </div>
            <div className="challenge-text font-sans text-sm md:text-base leading-relaxed">
              <RichText
                tagName="p"
                value={step1Text}
                onChange={(val) => setAttributes({ step1Text: val })}
                placeholder="Суть задачи или бага..."
              />
            </div>
          </div>

          <div className="challenge-step-divider pt-8" />

          <div className="challenge-step-card">
            <div className="geek-badge self-start mb-2">
              [
              <RichText
                tagName="span"
                value={step2Badge}
                onChange={(val) => setAttributes({ step2Badge: val })}
                placeholder="badge"
                allowedFormats={[]}
              />
              ]
            </div>
            <div className={`font-sans font-bold text-xl md:text-2xl mb-2.5 ${isDark ? 'text-accentSecond' : 'text-accent'}`}>
              <RichText
                tagName="h4"
                value={step2Title}
                onChange={(val) => setAttributes({ step2Title: val })}
                placeholder="Заголовок решения..."
              />
            </div>
            <div className="challenge-text font-sans text-sm md:text-base leading-relaxed">
              <RichText
                tagName="p"
                value={step2Text}
                onChange={(val) => setAttributes({ step2Text: val })}
                placeholder="Описание фикса или реализации..."
              />
            </div>
          </div>

          {isThreeSteps && (
            <>
              <div className="challenge-step-divider pt-8" />
              <div className="challenge-step-card">
                <div className="geek-badge self-start mb-2">
                  [
                  <RichText
                    tagName="span"
                    value={step3Badge}
                    onChange={(val) => setAttributes({ step3Badge: val })}
                    placeholder="badge"
                    allowedFormats={[]}
                  />
                  ]
                </div>
                <div className={`font-sans font-bold text-xl md:text-2xl mb-2.5 ${isDark ? 'text-accentSecond' : 'text-accent'}`}>
                  <RichText
                    tagName="h4"
                    value={step3Title}
                    onChange={(val) => setAttributes({ step3Title: val })}
                    placeholder="Заголовок результата..."
                  />
                </div>
                <div className="challenge-text font-sans text-sm md:text-base leading-relaxed">
                  <RichText
                    tagName="p"
                    value={step3Text}
                    onChange={(val) => setAttributes({ step3Text: val })}
                    placeholder="Какой импакт дало решение..."
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}