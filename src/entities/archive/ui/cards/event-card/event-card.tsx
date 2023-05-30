import { EventEntity } from '@/shared/api/graphql/__generated__/schema.graphql';
import { setSeoAltText } from '@/shared/lib/set-seo-alt-text';
import { Card } from '@/shared/ui/card';

export const EventCard = (event: EventEntity) => {
  const { attributes } = event;

  const altText = setSeoAltText({
    title: attributes?.name,
    date: attributes?.eventInfo.date?.eventDate,
  });
  return (
    <Card
      sizeVariant='standard'
      cardDate={{
        text: attributes?.eventInfo.location?.locationName,
        link: attributes?.eventInfo.location?.locationLink,
      }}
      href={`/events/${attributes?.slug}`}
      variant='event'
      date={attributes?.eventInfo.date?.eventDate}
      image={{
        src: attributes?.image.data?.attributes?.url ?? '',
        alt: altText,
      }}
      headingText={attributes?.name}
    />
  );
};
