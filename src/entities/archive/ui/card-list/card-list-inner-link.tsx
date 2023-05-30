import Link, { LinkProps } from 'next/link';
import { FC } from 'react';

interface CardListInnerLink extends LinkProps, React.PropsWithChildren {}

export const CardListInnerLink: FC<CardListInnerLink> = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className='break-words text-gray-color hover:text-secondary-dark'
    >
      {children}
    </Link>
  );
};
