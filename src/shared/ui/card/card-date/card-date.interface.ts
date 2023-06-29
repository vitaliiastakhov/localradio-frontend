import { Maybe } from 'yup';
import { EntityVariant } from '@/shared/types/entity-variants.interface';
import { SizeVariant } from '@/shared/types/size-variant.interface';

export interface CardDateProps {
  date?: string | Date;
  link?: Maybe<string>;
  text?: Maybe<string>;
  sizeVariant?: SizeVariant;
  variant?: EntityVariant | 'page';
}
