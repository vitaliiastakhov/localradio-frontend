import { useEffect, useState } from 'react';
import { CardDate } from '@/shared/ui/card/card-date';
import { GenreListWithMemo } from '@/shared/ui/genres/genre-list/genre-list';
import { MixNavigation } from './navigation/mix-navigation';
import { MixPageProps } from './types/mix-page.interface';

type MixPageCenterProps = Pick<MixPageProps, 'mixes' | 'mixPrev' | 'mixNext'>;

const MixPageCenter = ({ mixes, mixNext, mixPrev }: MixPageCenterProps) => {
  const { attributes: project } = mixes.data[0];
  const [SCAudioLink, setSCAudioLink] = useState<string>('');
  const [youtubeVideoLink, setYoutubeVideoLink] = useState<string>('');
  useEffect(() => {
    project?.linksToMixes?.soundcloudLink &&
      setSCAudioLink(project.linksToMixes.soundcloudLink);
    project?.linksToMixes?.youtubeLink &&
      setYoutubeVideoLink(project.linksToMixes.youtubeLink);
  }, [
    project?.linksToMixes?.soundcloudLink,
    project?.linksToMixes?.youtubeLink,
  ]);
  return (
    <div className='h-full border-black px-1.5 lg:border-x-2 lg:border-t-0 lg:px-2 xl:px-3.5'>
      <MixNavigation
        mix={mixes.data[0]}
        links={{ youtube: youtubeVideoLink, soundcloud: SCAudioLink }}
        siblingsSlug={{
          next: mixNext && mixNext[0]?.attributes?.slug,
          prev: mixPrev && mixPrev[0]?.attributes?.slug,
        }}
      />

      <div className='flex flex-col gap-1.5 py-2 text-[0.8rem] font-medium uppercase md:text-[0.85rem]'>
        <CardDate
          date={project?.date}
          link={project?.locationLink}
          text={project?.locationName}
          variant='page'
        />
        <GenreListWithMemo
          colorVariant='primary'
          variant='solid'
          genres={project?.genres?.data}
          sizeVariant='standard'
        />
      </div>
    </div>
  );
};
export default MixPageCenter;
