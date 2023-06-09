import type { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import type { Maybe } from 'yup';
import type { GenreRelationResponseCollection } from '@/shared/api/graphql/__generated__/schema.graphql';
import type { EntityVariant } from '@/shared/types/entity-variants.interface';
import type { SizeVariant } from '@/shared/types/size-variant.interface';

interface CardBaseProps {
  date: string | any;
  text?: Maybe<string>;
  sizeVariant?: SizeVariant;
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
  variant?: EntityVariant;
  mixButtons?: ReactNode;
  bottomInfo?: ReactNode;
}

export type CardProps = JSX.IntrinsicElements['a'] &
  CardBaseProps & {
    href?: string;
  } & LinkProps;
