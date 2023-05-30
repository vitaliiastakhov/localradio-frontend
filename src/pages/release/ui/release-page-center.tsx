import { formatDate } from '@/shared/lib/format-date';
import { formatLinksWithAdditionalInfo } from '@/shared/lib/format-links-with-additional-info';
import { Button } from '@/shared/ui/button/button';
import { CardDate } from '@/shared/ui/card/card-date';
import { NextImage } from '@/shared/ui/next-image/next-image';
import { ReleasePageProps } from './release-page';

export const ReleasePageCenter = ({
  releases,
}: Pick<ReleasePageProps, 'releases'>) => {
  const { attributes } = releases.data[0];
  const formattedDate = formatDate(attributes?.date);
  const releaseTitle = attributes?.artistName + ' - ' + attributes?.releaseName;
  const releaseLinks = formatLinksWithAdditionalInfo({
    links: attributes?.links,
    variant: 'release',
  });

  return (
    <div className='order-1 h-full border-black px-1.5 sm:px-3 lg:border-x-2 '>
      <div className='flex flex-col sm:pt-3 '>
        <div className='flex aspect-square  max-h-[80vh] border-l-2 border-black  2xl:max-h-full'>
          <div className='relative w-full min-w-max  border-y-2 border-r-2  border-black transition-all duration-300 hover:w-[1200%]'>
            {attributes?.cover.data?.attributes?.url && (
              <NextImage
                alt={attributes.artistName + '-' + attributes.releaseName}
                src={attributes.cover.data.attributes.url}
                fill
                style={{ objectFit: 'cover' }}
              />
            )}
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-1 py-2 text-[0.8rem] font-medium uppercase md:text-[0.85rem]  '>
        <CardDate
          formattedDate={formattedDate}
          text={attributes?.type}
          type='page'
        />
      </div>
      <div className='pb-2'>
        <div className=' flex  md:pb-0 '>
          <div className='relative w-full'>
            {attributes?.links && (
              <ul className='flex flex-wrap  items-center gap-1 font-medium uppercase leading-none'>
                {releaseLinks?.map((link) => {
                  return (
                    <li key={link.type}>
                      <Button
                        aria-label={`Listen ${releaseTitle} On ${link.title}`}
                        title={`Listen ${releaseTitle} On ${link.title}`}
                        colorVariant='primary'
                        sizeVariant='standard'
                        style={{ color: link.color }}
                        className='bg-current hover:!bg-current lg:!bg-transparent'
                        href={link.href ?? ''}
                      >
                        {link.icon}

                        <span className='whitespace-nowrap text-black'>
                          {link.title}
                        </span>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
