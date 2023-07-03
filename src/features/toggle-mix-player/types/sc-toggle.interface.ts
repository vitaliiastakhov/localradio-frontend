import { HTMLAttributes } from 'react';
import { Maybe } from 'yup';
import {
  Mix,
  MixEntity,
} from '@/shared/api/graphql/__generated__/schema.graphql';

export interface PlayerElementProps {
  mix?: Maybe<MixEntity>;
  mixLink?: Maybe<string>;
  page: 'mix' | 'home';
}

export interface PlayerButtonProps
  extends Pick<PlayerElementProps, 'mixLink'>,
    HTMLAttributes<HTMLButtonElement> {
  attributes: Maybe<Mix>;
  mixId?: Maybe<string>;
}
