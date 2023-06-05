import type {
  ComponentLinksToSocialsLinksToSocials,
  Maybe,
} from '@/shared/api/graphql/__generated__/schema.graphql';
import type { Description } from '@/shared/types/description.interface';
import { Icon } from '@/shared/ui/icons';
import { DescriptionGroup } from '../../shared/ui/description/description-group';
import { NextImage } from '../../shared/ui/next-image/next-image';
import { SocialsList } from '../../shared/ui/socials-list/socials-list-mix-page';

interface PageExtraContentWrapperProps {
  title?: string;
  image?: string;
  description?: Description;
  socials?: Maybe<ComponentLinksToSocialsLinksToSocials>;
}

export const PageExtraContent = ({
  image,
  description,
  title,
  socials,
}: PageExtraContentWrapperProps) => {
  return (
    <section>
      <div className='grid w-full grid-cols-1 gap-y-2 px-1.5 md:grid-cols-2 md:gap-y-2 lg:grid-cols-3  lg:gap-y-3  lg:px-2 xl:px-3.5'>
        <div>
          {image ? (
            <NextImage
              alt='name'
              className='sticky top-[calc(var(--header-height)+30px+3px+0.5rem)] aspect-square  w-full lg:top-[calc(var(--header-height))] '
              src={image}
              fill
              sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
              useSkeleton={true}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className=' relative flex aspect-square h-full  w-full items-center justify-center bg-black'>
              <Icon.LogoShortIcon className='w-[80%] fill-primary' />
            </div>
          )}
        </div>

        <div className='lg:col-span-2  '>
          <div className='flex flex-wrap items-end justify-between gap-x-1 border-b-black text-[1.25rem] font-semibold uppercase  leading-none  md:px-1.5 lg:px-2 lg:text-3xl  xl:px-3.5'>
            <h2 className='leading-none'> {title}</h2>
            {socials && (
              <ul className='flex items-center gap-2'>
                <SocialsList socials={{ ...socials }} />
              </ul>
            )}
          </div>
          <DescriptionGroup
            sizeVariant='large'
            html={{
              descriptionRu: description?.descriptionRu,
              descriptionEn: description?.descriptionEn,
            }}
          />
        </div>
      </div>
    </section>
  );
};
