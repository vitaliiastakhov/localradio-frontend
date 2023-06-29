import { CardListWithMemo } from '@/entities/archive/ui/card-list';
import { MixEntity } from '@/shared/api/graphql/__generated__/schema.graphql';

interface EventPageBottomProps {
  mixes: MixEntity[];
  title?: string;
}

export const EventPageBottom = ({ mixes, title }: EventPageBottomProps) => {
  return (
    <CardListWithMemo
      pageVariant='other'
      variant='mixes'
      data={mixes}
      text={'Episodes from ' + title}
    />
  );
};
