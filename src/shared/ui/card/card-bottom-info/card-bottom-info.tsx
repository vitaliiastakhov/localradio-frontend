import { clsxm } from '@/shared/lib/clsxm';
import { formatDate } from '@/shared/lib/format-date';
import { GenreList } from '@/shared/ui/genres/genre-list/genre-list';
import { CardProps } from '../card/card';
import { CardDate } from '../card-date';
import { CardHeading } from '../card-heading';

type CardBottomInfoProps = Pick<
  CardProps,
  | 'sizeVariant'
  | 'variant'
  | 'date'
  | 'genres'
  | 'headingText'
  | 'href'
  | 'cardDate'
  | 'children'
>;

export const CardBottomInfo = ({
  sizeVariant,
  variant,
  date,
  genres,
  headingText,
  href,
  cardDate,
  children,
}: CardBottomInfoProps) => {
  const formattedDate = formatDate(date);
  return (
    <div
      className={clsxm(
        'relative flex h-full flex-col justify-between [&>*]:border-black  group-hover:[&>*]:border-black  group-hover:[&>*]:text-black',

        {
          '[&>*]:p-[clamp(0.15rem,1.5vw,0.375rem)]': sizeVariant === 'standard',
        },
        {
          '[&>*]:bg-primary/75  [&>*]:backdrop-blur-[20px] [&>*]:backdrop-saturate-150  [&>*]:transition-colors   group-hover:[&>*]:bg-opacity-[0.75]':
            variant === 'mix' && sizeVariant === 'standard',
        }
      )}
    >
      <div
        className={clsxm(
          'flex flex-1 flex-col   ',
          { 'border-b border-black': genres?.data.length },
          {
            'gap-0.5': variant === 'mix' && sizeVariant === 'standard',
          },
          { 'justify-between': sizeVariant === 'standard' }
        )}
      >
        <CardHeading sizeVariant={sizeVariant} text={headingText} href={href} />
        <CardDate
          sizeVariant={sizeVariant}
          type={variant}
          formattedDate={formattedDate}
          link={cardDate?.link}
          text={cardDate?.text}
        />
      </div>
      {variant === 'mix' && (
        <GenreList
          variant='solid'
          colorVariant='primary'
          sizeVariant='small'
          genres={genres?.data}
        />
      )}
      {variant === 'release' && children}
    </div>
  );
};
