import { memo } from 'react';
import {
  HandleGlobalPlayerResponse,
  useHandleGlobalPlayer,
} from '@/entities/archive/hooks/use-handle-global-player';
import {
  Maybe,
  Mix,
  MixEntity,
} from '@/shared/api/graphql/__generated__/schema.graphql';
import { clsxm } from '@/shared/lib/clsxm';
import { setSeoAltText } from '@/shared/lib/set-seo-alt-text';
import type { SizeVariant } from '@/shared/types/size-variant.interface';
import { Card } from '@/shared/ui/card';
import { MixSCButton } from './mix-sc-button';
import { MixYoutubeButton } from './mix-youtube-button';

interface MixCardProps extends MixEntity {
  sizeVariant: SizeVariant;
}

export interface MixButtonProps {
  sizeVariant: SizeVariant;
  attributes: Maybe<Mix> | undefined;
  handlePlay: HandleGlobalPlayerResponse['handlePlay'];
}

export const MixCard = memo((mix: MixCardProps) => {
  const { handlePlay } = useHandleGlobalPlayer({ id: mix.id });

  const { attributes, sizeVariant } = mix;
  const soundcloudLink = mix.attributes?.linksToMixes?.soundcloudLink;
  const youtubeLink = mix.attributes?.linksToMixes?.youtubeLink;
  const locationName = mix.attributes?.locationName;
  const locationLink = mix.attributes?.locationLink;
  const altText = setSeoAltText({
    title: attributes?.name,
    date: attributes?.date,
  });

  return (
    <Card
      date={attributes?.date}
      image={{
        src:
          attributes?.image.data?.attributes?.formats?.medium?.url ||
          attributes?.image.data?.attributes?.url,
        alt: altText,
      }}
      sizeVariant={sizeVariant}
      variant='mix'
      href={`/archive/${attributes?.slug}`}
      headingText={attributes?.name}
      cardDate={{ link: locationLink, text: locationName }}
      genres={attributes?.genres}
    >
      {(youtubeLink || soundcloudLink) && (
        <div
          className={clsxm('flex', {
            'gap-1 self-end p-1 lg:gap-1.5': sizeVariant === 'standard',
            'absolute inset-0 flex-col': sizeVariant === 'small',
          })}
        >
          {sizeVariant === 'standard' && youtubeLink && (
            <MixYoutubeButton
              handlePlay={handlePlay}
              attributes={attributes}
              sizeVariant={sizeVariant}
            />
          )}
          {soundcloudLink && (
            <MixSCButton
              handlePlay={handlePlay}
              attributes={attributes}
              soundcloudLink={soundcloudLink}
              sizeVariant={sizeVariant}
            />
          )}
        </div>
      )}
    </Card>
  );
});
