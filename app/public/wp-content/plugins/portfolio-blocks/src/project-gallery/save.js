import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { layout, items } = attributes;
  const blockProps = useBlockProps.save({
    className: 'project-gallery-block my-12',
    'data-gallery-layout': layout,
  });

  if (!items || items.length === 0) return null;

  if (layout === 'masonry') {
    return (
      <div {...blockProps}>
        <div className="gallery-layout-masonry">
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.desktopUrl && (
                <div className="gallery-masonry-item">
                  <img src={item.desktopUrl} alt={item.desktopAlt || ''} />
                </div>
              )}
              {item.mobileUrl && (
                <div className="gallery-masonry-item">
                  <img src={item.mobileUrl} alt={item.mobileAlt || ''} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div {...blockProps}>
      <div className="gallery-slider-wrapper">
        <div className="embla">
          <div className="embla__container">
            {items.map((item, idx) => (
              <div key={idx} className="embla__slide">
                {layout === 'slider-single' && (
                  <div className="flex flex-col items-center">
                    <div className="w-full rounded-card overflow-hidden">
                      <img src={item.desktopUrl} alt={item.desktopAlt || ''} className="w-full block" />
                    </div>
                    {item.caption && (
                      <p className="font-sans font-medium text-base md:text-lg text-dark/90 mt-5 text-center">
                        {item.caption}
                      </p>
                    )}
                  </div>
                )}

                {layout === 'slider-paired' && (
                  <div className="flex flex-col items-center">
                    <div className="paired-mockup-wrapper">
                      {item.desktopUrl && (
                        <div className="paired-desktop">
                          <img src={item.desktopUrl} alt={item.desktopAlt || ''} />
                        </div>
                      )}
                      {item.mobileUrl && (
                        <div className="paired-mobile">
                          <img src={item.mobileUrl} alt={item.mobileAlt || ''} />
                        </div>
                      )}
                    </div>
                    {item.caption && (
                      <p className="font-sans font-medium text-base md:text-lg text-dark/90 mt-6 text-center">
                        {item.caption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-nav-controls-mobile">
          <button type="button" className="gallery-nav-btn prev" aria-label="Назад" />
          <button type="button" className="gallery-nav-btn next" aria-label="Вперед" />
        </div>
      </div>
    </div>
  );
}