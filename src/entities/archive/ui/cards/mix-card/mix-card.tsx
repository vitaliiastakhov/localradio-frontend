import { memo } from 'react';
import {
  GlobalPlayerAction,
  useGlobalPlayer,
} from '@/entities/archive/hooks/use-global-player.hook';
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
  play: GlobalPlayerAction['play'];
}

export const MixCard = (mix: MixCardProps) => {
  const { play } = useGlobalPlayer({ id: mix.id });
  const { attributes, sizeVariant } = mix;
  const linksToMixes = mix.attributes?.linksToMixes;
  const soundcloudLink = linksToMixes?.soundcloudLink;
  const youtubeLink = linksToMixes?.youtubeLink;
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
              play={play}
              attributes={attributes}
              sizeVariant={sizeVariant}
            />
          )}
          {soundcloudLink && (
            <MixSCButton
              play={play}
              attributes={attributes}
              soundcloudLink={soundcloudLink}
              sizeVariant={sizeVariant}
            />
          )}
        </div>
      )}
    </Card>
  );
};

export const MixCardWithMemo = memo(MixCard);
