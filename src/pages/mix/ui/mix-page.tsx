import { PageWrapper } from '@/pages/ui/page-wrapper';
import { MixPageBottom } from './mix-page-bottom';
import MixPageCenter from './mix-page-center';
import { MixPageLeft } from './mix-page-left';
import { MixPageRight } from './mix-page-right';
import { MixPageProps } from './types/mix-page.interface';

export const MixPage = ({
  mixes,
  moreEpisodes,
  description,
  mixNext,
  mixPrev,
  tracklist,
  totalCount,
}: MixPageProps) => {
  const project = mixes?.data[0].attributes;

  const mixesGuestSlug = project?.guests?.data[0]?.attributes?.slug;
  const mixesGuestName = project?.guests?.data[0]?.attributes?.name;
  const guestSocials = project?.guests?.data[0]?.attributes?.socials;
  const guestsMixes = project?.guests?.data[0]?.attributes?.mixes?.data;

  const mixesShowSlug = project?.show?.data?.attributes?.slug;
  const mixesShowName = project?.show?.data?.attributes?.name;
  const showSocials = project?.show?.data?.attributes?.socials;
  const showMixes = project?.show?.data?.attributes?.mixes?.data;

  return (
    <PageWrapper
      isMix
      variant='mix'
      name={project?.name}
      left={
        <MixPageLeft
          mixesShowSlug={mixesShowSlug}
          description={description}
          mixesGuestName={mixesGuestName}
          mixesShowName={mixesShowName}
          showSocials={showSocials}
          mixesGuestSlug={mixesGuestSlug}
          guestSocials={guestSocials}
        />
      }
      center={
        <MixPageCenter mixes={mixes} mixPrev={mixPrev} mixNext={mixNext} />
      }
      right={project?.tracklist ? <MixPageRight tracklist={tracklist} /> : null}
      bottom={
        moreEpisodes && (
          <MixPageBottom
            totalCount={totalCount}
            showMixes={showMixes}
            moreEpisodes={moreEpisodes}
            mixesGuestName={mixesGuestName}
            mixesGuestSlug={mixesGuestSlug}
            guestsMixes={guestsMixes}
            mixesShowSlug={mixesShowSlug}
            genres={project?.genres}
            id={mixes?.data[0].id}
            mixesShowName={mixesShowName}
          />
        )
      }
    />
  );
};
