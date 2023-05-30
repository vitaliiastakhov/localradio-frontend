import Link from 'next/link';
import { memo } from 'react';
import { clsxm } from '@/shared/lib/clsxm';
import { EntityVariant } from '@/shared/types/entity-variants.interface';
import { Icon } from '../icons';
import { NextImage } from '../next-image/next-image';

interface CardImageProps {
  href: string;
  src?: string;
  alt: string;
  type?: EntityVariant;
  className?: string;
}

export const CardImage = memo(
  ({ href, src, alt, type, className }: CardImageProps) => {
    return (
      <Link href={href}>
        {src ? (
          <NextImage
            className={clsxm(
              { 'relative  aspect-square w-full': type !== 'shop' },
              className
            )}
            sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
            useSkeleton={true}
            alt={alt}
            src={src}
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className=' relative  flex aspect-square w-full items-center justify-center bg-black uppercase text-white'>
            <Icon.LogoShortIcon className='w-[40%] fill-primary' />
          </div>
        )}
      </Link>
    );
  }
);
