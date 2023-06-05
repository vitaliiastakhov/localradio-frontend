import { useUnit } from 'effector-react';
import Image from 'next/image';
import Link from 'next/link';
import Heart from '~/icons/heart.png';
import {
  $isOpenedCartModal,
  openCartModalEv,
} from '@/entities/store/cart/model/cart.model';
import { $totalQuantity } from '@/entities/store/items/model/shop.model';
import { openSearchModalEv } from '@/features/search/model/search.model';
import { clsxm } from '@/shared/lib/clsxm';
import { Icon } from '@/shared/ui/icons';
import { SearchIconX } from '@/shared/ui/icons/icons/search-icon';
import { HeaderStreamPlayer } from '@/widgets/players/stream/ui/header-stream-player';
import { $isOpenedMobileMenu, openMobileMenu } from '../model/header.model';
import { HeaderLink } from './header-link';
import { HeaderLinkWrapper } from './header-link-wrapper';

export const MainHeaderDesktop = () => {
  const {
    quantity,
    isOpenedMenu,
    isOpenedCartModal,
    openMenu,
    openCartModal,
    openSearchModal,
  } = useUnit({
    quantity: $totalQuantity,
    isOpenedMenu: $isOpenedMobileMenu,
    isOpenedCartModal: $isOpenedCartModal,
    openMenu: openMobileMenu,
    openCartModal: openCartModalEv,
    openSearchModal: openSearchModalEv,
  });

  return (
    <div className='grid h-[var(--header-height)] grid-cols-3 items-center justify-between gap-2 bg-primary uppercase md:justify-between lg:flex  lg:h-auto lg:bg-transparent lg:pl-3.5 2xl:pl-5'>
      <div className='flex h-full items-center   self-start group-hover:border-secondary-dark lg:hidden'>
        <button
          onClick={() => openMenu(!isOpenedMenu)}
          type='button'
          aria-label='Toggle navigation menu'
          className='flex h-[35px] w-[35px]  flex-col items-center  justify-center px-1.5   '
        >
          <div
            className={clsxm(
              'h-[2px] w-4  translate-y-[7px] rotate-0 bg-black transition-all duration-100',
              { 'translate-y-full -rotate-45': isOpenedMenu }
            )}
          />
          <div
            className={clsxm(
              'h-[2px] w-4  bg-black opacity-100 transition-all duration-100',
              { 'opacity-0': isOpenedMenu }
            )}
          />
          <div
            className={clsxm(
              'h-[2px] w-4  -translate-y-[7px] rotate-0 bg-black transition-all duration-100',
              { '-translate-y-full rotate-45': isOpenedMenu }
            )}
          />
        </button>
      </div>
      <Link
        href='/'
        className=' relative flex h-6  cursor-pointer px-1.5 md:px-3 lg:hidden '
        aria-label='Home'
      >
        <Icon.SmallLogo />
      </Link>

      <div className=' hidden items-center gap-1 rounded-lg      bg-primary   p-0.5 lg:flex'>
        <HeaderLink text='Archive' href='/archive' />
        <HeaderLink text='Releases' href='/releases' />
        <HeaderLink text='Events' href='/events' />
        <HeaderLink text='About' href='/about' />
        <HeaderLinkWrapper type='icon'>
          <button
            title='Search Button'
            type='button'
            onClick={() => openSearchModal(true)}
            className='flex h-full  flex-1  flex-col justify-center px-1.5 2xl:px-2    '
          >
            <Icon.SearchIconX className='h-[1rem] w-[1rem]    2xl:h-[1.15rem] 2xl:w-[1.15rem] ' />
          </button>
        </HeaderLinkWrapper>
      </div>
      <div className='hidden w-full lg:block'>
        <HeaderStreamPlayer />
      </div>
      <div className=' flex h-full items-center justify-end gap-2 lg:gap-[1rem] xl:gap-[1.2rem] 2xl:gap-[1.6rem]'>
        <div className=' flex h-full items-center gap-2 px-1.5 lg:hidden lg:gap-[1rem] xl:gap-[1.2rem] 2xl:gap-[1.6rem]'>
          <HeaderLinkWrapper>
            <button
              title='Search Button'
              type='button'
              onClick={() => openSearchModal(true)}
              className='justify-self-start rounded-full stroke-black lg:hidden lg:px-2  2xl:px-3 '
            >
              <SearchIconX className='h-[1.15rem] w-[1.15rem] 2xl:h-[1.35rem] 2xl:w-[1.35rem] ' />
            </button>
          </HeaderLinkWrapper>
          <HeaderLinkWrapper>
            <button
              title='Cart Button'
              type='button'
              onClick={() => openCartModal(!isOpenedCartModal)}
              className='relative aspect-square h-[18px] w-[18px] justify-self-start rounded-full stroke-black transition-colors lg:hidden lg:px-2 2xl:h-6 2xl:w-6 2xl:px-3 '
            >
              <Icon.CartIcon />
              <span className='absolute  -right-1 -top-1 text-[10px] font-medium'>
                {quantity}
              </span>
            </button>
          </HeaderLinkWrapper>
        </div>

        <div className='  hidden h-full items-center gap-2 lg:flex lg:gap-[1rem]   xl:gap-[1.2rem] 2xl:gap-[1.6rem]'>
          <div className=' hidden items-center gap-1 rounded-lg bg-primary  p-0.5 lg:flex'>
            <HeaderLinkWrapper>
              <Link
                href='https://bit.ly/lrsite'
                className='flex h-full items-center  uppercase lg:px-2 2xl:px-3 '
              >
                Donate
                <span className='relative mb-0.5 w-[1.1rem] pl-1 text-red-color'>
                  <Image
                    src={Heart}
                    alt=''
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </span>
              </Link>
            </HeaderLinkWrapper>

            <HeaderLink text='Shop' href='/shop' />

            <HeaderLinkWrapper>
              <button
                onClick={() => openCartModal(!isOpenedCartModal)}
                className='whitespace-nowrap uppercase lg:px-2  2xl:px-3'
              >
                Cart {quantity && `(${quantity})`}
              </button>
            </HeaderLinkWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};
