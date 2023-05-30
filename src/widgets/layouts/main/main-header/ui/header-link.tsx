import Link from 'next/link';
import { ClassAttributes, HTMLAttributes, memo } from 'react';
import { HeaderLinkWrapper } from './header-link-wrapper';

export interface HeaderLinkProps {
  href?: string;
  type?: 'link' | 'button' | 'icon';
  text: string;
  strict?: boolean;
}

type HTMLProps<T> = ClassAttributes<T> & HTMLAttributes<T>;

export interface HeaderLinkWrapperProps extends HTMLProps<HTMLDivElement> {
  href?: string;
  type?: 'link' | 'button' | 'icon';
  strict?: boolean;
}

export const HeaderLink = memo(
  ({ href, text, strict, type = 'link', ...props }: HeaderLinkProps) => {
    return (
      <HeaderLinkWrapper
        strict={strict}
        href={href}
        className='flex h-full w-full '
      >
        {type === 'link' && href ? (
          <Link
            className='flex h-full items-center lg:px-2 2xl:px-3'
            href={href}
            {...props}
          >
            {text}
          </Link>
        ) : (
          <div className='flex h-full items-center uppercase lg:px-2 2xl:px-3'>
            {text}
          </div>
        )}
      </HeaderLinkWrapper>
    );
  }
);
