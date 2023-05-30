import Link from 'next/link';
import { memo } from 'react';
import { clsxm } from '@/shared/lib/clsxm';
import { CardDateProps } from './card-date.interface';

export const CardDate = memo(
  ({ formattedDate, link, text, type, sizeVariant }: CardDateProps) => {
    return (
      <div
        className={clsxm(
          'flex w-full flex-wrap justify-between text-[clamp(0.55rem,5vw,0.75rem)] font-medium uppercase',
          {
            'pt-4':
              type === 'release' ||
              type === 'guest' ||
              type === 'event' ||
              type === 'show',
          },
          {
            'text-[clamp(0.6rem,1.5vw,0.75rem)] xl:text-[0.875rem]':
              type === 'page',
          }
        )}
      >
        {(type === 'guest' || type === 'show') && (
          <div className='leading-none'> {text}</div>
        )}

        {type !== 'show' && type !== 'guest' && formattedDate && (
          <div
            className={clsxm('leading-none', {
              'text-[0.65rem]': sizeVariant === 'small',
            })}
          >
            {formattedDate}
          </div>
        )}

        {(type === 'page' || type === 'release') && !link && (
          <div className='leading-none '>{text}</div>
        )}

        {link && (
          <Link
            href={link}
            className={clsxm(
              'font-semibold leading-none hover:text-secondary-dark',
              { 'font-medium underline underline-offset-2': type === 'page' }
            )}
          >
            {type === 'show' || type === 'guest' ? formattedDate : text}
          </Link>
        )}
      </div>
    );
  }
);
