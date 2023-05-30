import { useState } from 'react';
import type { Maybe } from 'yup';
import { clsxm } from '@/shared/lib/clsxm';
import type { Description } from '@/shared/types/description.interface';
import type { SizeVariant } from '@/shared/types/size-variant.interface';
import { DescriptionButton } from './description-button';
import { DescriptionItem } from './description-item';

interface DescriptionGroupProps {
  html: Description;
  sizeVariant?: SizeVariant;
  bottom?: Maybe<JSX.Element>;
  top?: Maybe<JSX.Element>;
  className?: string;
}

export const DescriptionGroup = ({
  html,
  top,
  bottom,
  className,
  sizeVariant = 'small',
}: DescriptionGroupProps) => {
  const [descriptionLang, setDescriptionLang] = useState<'ru' | 'en'>('ru');
  return (
    <div
      className={clsxm(
        'w-full md:pr-1.5  lg:pr-2.5   xl:pr-3.5',
        {
          'md:pl-1.5 lg:pl-2 xl:pl-3.5': sizeVariant === 'large',
        },
        className
      )}
    >
      {sizeVariant === 'large' && top}
      <div
        className={clsxm(
          'gap-1.5  border-black py-1.5   md:gap-2.5  lg:border-t-0  xl:gap-3 ',
          { 'flex flex-col xl:py-2': sizeVariant === 'large' },
          {
            'flex flex-col justify-between border-t-2 lg:flex-row lg:py-2.5 2xl:py-3':
              sizeVariant !== 'large',
          }
        )}
      >
        {html.descriptionRu || html.descriptionEn ? (
          <div
            className={clsxm(
              'h-fit gap-1  border-black xl:gap-1.5',
              { 'flex flex-row': sizeVariant === 'large' },
              { 'flex flex-row lg:flex-col  lg:pb-0': sizeVariant !== 'large' }
            )}
          >
            <DescriptionButton
              title='Change Language to Russian'
              setDescriptionLang={setDescriptionLang}
              text='Ru'
              sizeVariant={sizeVariant}
              selectedLang={descriptionLang}
              lang='ru'
              disabled={!html.descriptionRu}
            />

            <DescriptionButton
              title='Change Language to English'
              setDescriptionLang={setDescriptionLang}
              text='En'
              selectedLang={descriptionLang}
              lang='en'
              sizeVariant={sizeVariant}
              disabled={!html.descriptionEn}
            />
          </div>
        ) : null}

        <div className='flex  w-full flex-col xl:gap-2'>
          {sizeVariant === 'small' && top}
          {descriptionLang === 'ru' && (
            <DescriptionItem
              sizeVariant={sizeVariant}
              html={html.descriptionRu}
            />
          )}
          {descriptionLang === 'en' && (
            <DescriptionItem
              sizeVariant={sizeVariant}
              html={html.descriptionEn}
            />
          )}
          {sizeVariant === 'small' && bottom}
        </div>
      </div>
    </div>
  );
};
