import { Maybe } from 'yup';
import { PlayerButtonProps } from '../types/sc-toggle.interface';

export interface UsePlayerProps
  extends Pick<PlayerButtonProps, 'mixId' | 'mixLink'> {
  slug: Maybe<string>;
}
