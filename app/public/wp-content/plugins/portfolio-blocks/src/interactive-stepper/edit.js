import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { steps } = attributes;
  const blockProps = useBlockProps({ className: 'stepper-flow-block my-16' });

  const updateStep = (index, field, value) => {
    const updated = steps.map((s, i) => (i === index ? { ...s, [field]: value } : s));
    setAttributes({ steps: updated });
  };

  const addStep = () => {
    setAttributes({
      steps: [
        ...steps,
        {
          tag: `0${steps.length + 1}_step`,
          text: '',
          imgUrl: '',
        },
      ],
    });
  };

  const removeStep = (index) => {
    if (steps.length <= 1) return;
    setAttributes({ steps: steps.filter((_, i) => i !== index) });
  };

  return (
    <div {...blockProps}>
      <div className="stepper-steps-list">
        {steps.map((step, idx) => {
          const isEven = idx % 2 !== 0;

          return (
            <div key={idx} className={`stepper-row ${isEven ? 'is-even' : ''}`}>
              <div className="stepper-media-col">
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => updateStep(idx, 'imgUrl', media.url)}
                    allowedTypes={['image']}
                    value={step.imgUrl}
                    render={({ open }) =>
                      step.imgUrl ? (
                        <div onClick={open} className="cursor-pointer group relative">
                          <img src={step.imgUrl} alt="Step screen" className="stepper-img" />
                          <span className="absolute inset-0 bg-black/40 text-white font-mono text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-card">
                            [сменить скрин]
                          </span>
                        </div>
                      ) : (
                        <div
                          onClick={open}
                          className="stepper-img-placeholder cursor-pointer border border-dashed border-dark/20"
                        >
                          <span className="font-mono text-xs text-dark/60">+ Скриншот шага</span>
                        </div>
                      )
                    }
                  />
                </MediaUploadCheck>
              </div>

              <div className="stepper-text-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="geek-badge">
                    [
                    <RichText
                      tagName="span"
                      value={step.tag}
                      onChange={(val) => updateStep(idx, 'tag', val)}
                      placeholder="tag"
                      allowedFormats={[]}
                    />
                    ]
                  </span>
                  {steps.length > 1 && (
                    <Button
                      isDestructive
                      isSmall
                      onClick={() => removeStep(idx)}
                      className="ml-auto"
                    >
                      ✕
                    </Button>
                  )}
                </div>

                <RichText
                  tagName="p"
                  className="stepper-text"
                  value={step.text}
                  onChange={(val) => updateStep(idx, 'text', val)}
                  placeholder="Текст пояснения к шагу (необязательно)..."
                />
              </div>
            </div>
          );
        })}

        <Button variant="secondary" onClick={addStep} className="w-full justify-center mt-6">
          + Добавить шаг флоу
        </Button>
      </div>
    </div>
  );
}