import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { steps } = attributes;
  const blockProps = useBlockProps.save({ className: 'stepper-flow-block my-16' });

  if (!steps || !steps.length) return null;

  return (
    <div {...blockProps}>
      <div className="stepper-steps-list">
        {steps.map((step, idx) => {
          const isEven = idx % 2 !== 0;
          const isNotLast = idx < steps.length - 1;

          return (
            <div key={idx} className={`stepper-row ${isEven ? 'is-even' : ''}`}>
              <div className="stepper-media-col">
                {step.imgUrl && (
                  <img
                    src={step.imgUrl}
                    alt={step.tag || `Шаг ${idx + 1}`}
                    className="stepper-img"
                    data-zoomable
                  />
                )}
              </div>

              <div className="stepper-text-col">
                {step.tag && (
                  <div>
                    <span className="geek-badge">[{step.tag}]</span>
                  </div>
                )}

                {step.text && (
                  <p className="stepper-text">
                    <RichText.Content value={step.text} />
                  </p>
                )}
              </div>

              {isNotLast && (
                <div
                  className={`stepper-arrow-connector ${isEven ? 'to-left' : 'to-right'}`}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}