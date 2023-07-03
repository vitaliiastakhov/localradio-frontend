import { FC } from 'react';
import { CardBaseProps } from '@/entities/archive/lib/card-list.interface';
import {
  GuestEntity,
  ShowEntity,
} from '@/shared/api/graphql/__generated__/schema.graphql';
import { Card } from '@/shared/ui/card';

type ShowResidentProps = CardBaseProps & (ShowEntity | GuestEntity);

type Variant = 'resident' | 'residents' | 'show' | 'shows';

export const ShowResidentCard: FC<ShowResidentProps> = (props) => {
  const { attributes, __typename, className } = props;
  const lastEpisodeDate = attributes?.mixes?.data[0]?.attributes?.date;
  const lastEpisodeSlug = attributes?.mixes?.data[0]?.attributes?.slug;
  const imageUrl = attributes?.image?.data?.attributes?.url;

  const getCardVariant = (isPlural: boolean): Variant => {
    if (isPlural) {
      return __typename === 'GuestEntity' ? 'residents' : 'shows';
    }
    return __typename === 'GuestEntity' ? 'resident' : 'show';
  };

  const imageAltTitle =
    'Local Radio ' +
    getCardVariant(false) +
    ' ' +
    (__typename === 'GuestEntity' ? attributes?.name : `"${attributes?.name}"`);

  const href = `/archive/${getCardVariant(true)}/${attributes?.slug}`;

  return (
    <Card
      sizeVariant='standard'
      variant='show'
      cardDate={{
        text: 'Last Episode:',
        link: lastEpisodeSlug ? '/archive/' + lastEpisodeSlug : null,
      }}
      date={lastEpisodeDate}
      headingText={attributes?.name}
      href={href}
      className={className}
      image={{
        alt: imageAltTitle,
        src:
          attributes?.image?.data?.attributes?.formats?.medium?.url || imageUrl,
      }}
    />
  );
};
