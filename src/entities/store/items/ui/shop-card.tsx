import { useState } from 'react';
import { ShopItemEntity } from '@/shared/api/graphql/__generated__/schema.graphql';
import { clsxm } from '@/shared/lib/clsxm';
import { setSeoAltText } from '@/shared/lib/set-seo-alt-text';
import { CardImage } from '@/shared/ui/card/card-image';
import { CardWrapper } from '@/shared/ui/card/card-wrapper';
import { ShopSubmitElement } from './big-shop-button';

export const ShopCard = (product: ShopItemEntity) => {
  const { attributes } = product;
  const imagesList = attributes?.images.data;
  const sizes = attributes?.attributes?.size;
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isSelectedSize, setIsSelectedSize] = useState<boolean>(false);
  const altText = setSeoAltText({
    title: attributes?.title,
    date: attributes?.createdAt,
  });

  return (
    <CardWrapper type='shop'>
      <div className='relative  flex h-full flex-col justify-items-stretch border-2 border-black text-[0.7rem] font-medium uppercase'>
        <div>
          <div className='relative flex  aspect-square w-full justify-center'>
            {imagesList?.map(
              ({ attributes: imgA }, id) =>
                id < 2 && (
                  <CardImage
                    key={imgA?.url}
                    className={clsxm(
                      'opacity-100 transition-opacity  duration-[250ms]',
                      { 'opacity-0 hover:opacity-100': id === 1 }
                    )}
                    type='shop'
                    href={`/shop/products/${attributes?.slug}`}
                    alt={altText + ' ' + id}
                    src={imgA?.url}
                  />
                )
            )}
          </div>
        </div>
        <div className='group relative flex  h-10 overflow-hidden border-t-2 border-black text-[0.95rem] font-medium   xxs:h-12 sm:text-[1rem] 2xl:h-14'>
          <div
            className={`absolute  left-0 top-0 flex h-full w-full items-center bg-secondary-dark leading-none `}
          >
            <div
              className={clsxm(
                'flex h-full flex-col  justify-center border-r-2 border-black pl-3 pr-3 ',
                { 'w-full ': !sizes },
                {
                  'items-start':
                    !sizes &&
                    attributes?.shop_category?.data?.attributes?.slug ===
                      'records',
                }
              )}
            >
              {sizes && <p>size</p>}
              {!sizes && <p>{attributes?.title}</p>}
              {!sizes &&
                attributes?.shop_category?.data?.attributes?.slug ===
                  'records' &&
                attributes.title
                  .split('-')
                  .map((word) => <p key={word}>{word}</p>)}
            </div>
            {sizes && (
              <div className='flex h-full justify-center pr-3'>
                <ul className='flex h-full items-center gap-1 px-1.5 sm:px-3 xl:gap-3'>
                  {sizes?.map((size: string) => (
                    <li
                      key={size}
                      className={clsxm('w-full transition-opacity', {
                        'opacity-30': selectedSize !== size && isSelectedSize,
                      })}
                    >
                      <button
                        aria-label={'Select size ' + size}
                        type='button'
                        onClick={() => {
                          setIsSelectedSize(
                            (prev) => !(selectedSize === size && prev !== false)
                          );
                          setSelectedSize(size);
                        }}
                        className={clsxm(
                          'px-1 py-1 text-center  sm:px-2',
                          'before:invisible before:absolute before:left-0 before:top-0  before:h-full before:w-full before:border-2 before:border-black before:transition-all before:duration-[50ms] before:content-[""] hover:before:visible ',
                          { 'before:visible': selectedSize === size }
                        )}
                      >
                        {size}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className={`absolute inset-0 flex  h-full w-full bg-black  font-semibold uppercase text-white transition-all duration-500  ${
                !sizes || isSelectedSize
                  ? 'visible border-black '
                  : 'border-transparen invisible translate-x-full'
              } transition-all`}
            >
              {sizes && (
                <button
                  type='button'
                  onClick={() => setIsSelectedSize(false)}
                  className='border-r-2 border-black bg-secondary-dark  px-3'
                >
                  <div className=' relative w-6'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className=' stroke-black '
                      width='100%'
                      height='100%'
                      viewBox='0 0 24 24'
                      strokeWidth='2'
                      stroke=''
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <line x1='5' y1='12' x2='19' y2='12' />
                      <line x1='5' y1='12' x2='11' y2='18' />
                      <line x1='5' y1='12' x2='11' y2='6' />
                    </svg>
                  </div>
                </button>
              )}

              <ShopSubmitElement
                selectedSize={selectedSize}
                disabled={
                  (sizes?.length > 0 && !selectedSize) ??
                  attributes?.soldout ??
                  false
                }
                type='card'
                product={product}
                price={attributes?.price}
              />
            </div>
          </div>
          <div
            className={clsxm(
              'isolate flex w-full flex-1   ',
              'bg-secondary-dark transition-transform duration-500 group-hover:-translate-x-[110%]',
              { 'bg-gray-color text-primary': attributes?.soldout }
            )}
          >
            <div className=' flex w-full items-center  justify-between px-1.5 sm:px-3'>
              <div>
                {attributes?.shop_category?.data?.attributes?.slug ===
                'records' ? (
                  attributes.title.split('-').map((word) => (
                    <h3 key={word} className='grid leading-none'>
                      {word}
                    </h3>
                  ))
                ) : (
                  <h3 className='grid leading-none'>{attributes?.title}</h3>
                )}
              </div>

              {!attributes?.soldout ? (
                <div>
                  {attributes?.price} <span>₽</span>
                </div>
              ) : (
                <div>Soldout</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};
