import Link from 'next/link';
import { LocalSocialIcons } from '@/shared/ui/socials-list/socials-icons';
import { localSocialsNav } from '../lib/local-socials-nav';

interface LocalSocialsListProps {
  type: 'header' | 'footer';
}

export const LocalSocialsList = ({ type }: LocalSocialsListProps) => {
  switch (type) {
    case 'header':
      return (
        <ul className='flex  flex-wrap items-center  gap-10  px-1.5 py-3 sm:gap-12 md:gap-20'>
          {localSocialsNav.map(({ ariaLabel, type, href }) => (
            <li key={'header ' + type}>
              {href && (
                <Link aria-label={ariaLabel} href={href}>
                  <LocalSocialIcons type={type} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      );
    case 'footer':
      return (
        <ul className='flex  flex-wrap items-center gap-1.5'>
          {localSocialsNav.map(({ ariaLabel, type, href }) => (
            <li key={'footer ' + type}>
              {href && (
                <Link
                  aria-label={ariaLabel}
                  className='flex h-[26px] w-[26px] items-center justify-center rounded-md bg-white fill-black transition-all duration-100 hover:bg-white lg:h-[32px] lg:w-[32px]   lg:bg-black lg:fill-white lg:hover:fill-black'
                  href={href}
                >
                  <LocalSocialIcons type={type} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};
