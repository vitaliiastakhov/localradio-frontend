import { LinkProps } from 'next/link';
import { memo } from 'react';
import {
  GenreRelationResponseCollection,
  Maybe,
} from '@/shared/api/graphql/__generated__/schema.graphql';
import { clsxm } from '@/shared/lib/clsxm';
import { EntityVariant } from '@/shared/types/entity-variants.interface';
import type { SizeVariant } from '@/shared/types/size-variant.interface';
import { CardBottomInfo } from '../card-bottom-info/cardBottomInfo';
import { CardImage } from '../card-image';
import { CardWrapper } from '../card-wrapper';

interface BaseProps {
  date: string | any;
  text?: Maybe<string>;
  sizeVariant: SizeVariant;
  headingText?: string | Maybe<string | undefined>[];
  image?: {
    alt?: string;
    src: string;
  };
  genres?: Maybe<GenreRelationResponseCollection>;
  cardDate?: {
    link?: Maybe<string>;
    text?: Maybe<string>;
  };
  variant: EntityVariant;
}

export type CardProps = JSX.IntrinsicElements['a'] &
  BaseProps & {
    href?: string;
  } & LinkProps;

export const Card = memo((props: CardProps) => {
  const { children, variant, href, image, sizeVariant = 'standard' } = props;
  const cardWrapperClasses = clsxm(
    { 'group  h-full overflow-hidden': sizeVariant === 'standard' },
    {
      'border-b-2 border-black p-1.5 last-of-type:border-none  md:p-2 xl:p-2.5':
        sizeVariant === 'small',
    }
  );
  const cardSubWrapperClasses = clsxm(
    {
      'group relative flex  flex-1 flex-col overflow-hidden':
        sizeVariant === 'standard',
    },
    {
      'grid grid-cols-[0.7fr,1fr]  gap-1.5 lg:gap-2 2xl:gap-3':
        sizeVariant === 'small',
    }
  );

  return (
    <CardWrapper
      sizeVariant={sizeVariant}
      className={cardWrapperClasses}
      type={variant}
    >
      <div className={cardSubWrapperClasses}>
        <div
          className={clsxm({
            'group relative  overflow-hidden': sizeVariant === 'small',
          })}
        >
          {image && (
            <CardImage href={href} alt={image.alt ?? ''} src={image.src} />
          )}
          {variant === 'mix' && sizeVariant === 'small' && children}
        </div>
        <div
          className={clsxm(
            'flex w-full   flex-col',
            {
              'absolute bottom-0 left-0':
                variant === 'mix' && sizeVariant === 'standard',
            },
            {
              'h-full': variant !== 'mix',
            }
          )}
        >
          {variant === 'mix' && sizeVariant === 'standard' && children}
          <CardBottomInfo {...props}>{children}</CardBottomInfo>
        </div>
      </div>
    </CardWrapper>
  );
});
