import { memo } from 'react';
import { EntityVariant } from '@/shared/types/entity-variants.interface';
import type { SizeVariant } from '@/shared/types/size-variant.interface';

interface CardWrapperProps extends Omit<React.HTMLProps<HTMLElement>, 'size'> {
  children: React.ReactNode;
  type: EntityVariant;
  sizeVariant?: SizeVariant;
}

export const CardWrapper = memo(
  ({ children, sizeVariant = 'standard', type, ...rest }: CardWrapperProps) => {
    return (
      <article className='relative grid gap-y-1' {...rest}>
        {(type === 'mix' ||
          type === 'event' ||
          type === 'release' ||
          type === 'show' ||
          type === 'guest') &&
        sizeVariant === 'standard' ? (
          <div className='flex h-full  flex-col border-2 border-black'>
            {children}
          </div>
        ) : (
          children
        )}
      </article>
    );
  }
);
