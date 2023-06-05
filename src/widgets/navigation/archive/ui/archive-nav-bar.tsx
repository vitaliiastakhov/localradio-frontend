import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { useScroll } from '@/shared/lib/hooks/use-scroll';
import SWRfetcher from '@/shared/lib/swr-fetcher';
import { Button } from '@/shared/ui/button/button';
import { ArchiveNavigationQuery } from '../api/navigation.graphql.interface';
import {
  $clickedArchiveNavType,
  $navHeight,
  clickArchiveNavType,
  setNavHeightEv,
} from '../model/archive-nav.model';
import styles from './archive-nav.module.css';
import { ArchiveNavItem } from './archive-nav-item';

export const ArchiveNavBar = () => {
  const { data: archiveNav } = useSWR<{ data: ArchiveNavigationQuery }>(
    '/api/archive-nav',
    SWRfetcher
  );

  const [hoveredEl, setHoveredEl] = useState<'mood' | 'genres' | null>(null);
  const { navHeight, clickedArchiveNavType, setNavHeight, clickArchiveNav } =
    useUnit({
      navHeight: $navHeight,
      clickedArchiveNavType: $clickedArchiveNavType,
      setNavHeight: setNavHeightEv,
      clickArchiveNav: clickArchiveNavType,
    });
  const toggleHover = (el: 'mood' | 'genres' | null) => {
    setHoveredEl(el);
    clickArchiveNav(null);
  };

  const { visible } = useScroll();

  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    elementRef.current && setNavHeight(elementRef.current.clientHeight);
  });

  const handleClick = (el: 'mood' | 'genres' | null) => {
    clickArchiveNav(el);
  };

  useEffect(() => {
    clickArchiveNav(null);
  }, [clickArchiveNav]);

  return (
    <nav
      ref={elementRef}
      className={`sticky z-10 w-full text-[0.8rem] font-semibold uppercase transition-all duration-300 xl:text-[0.95rem]  2xl:text-[1rem]  ${
        !visible
          ? 'top-[calc(30px+2px)] xxs:top-[calc(60px+2px)] lg:top-0 '
          : 'top-[calc(var(--header-height)+30px+3px)] xxs:top-[calc(var(--header-height)+60px+3px)] lg:top-[var(--header-height)]'
      }`}
    >
      <ul className={styles.navList}>
        <ArchiveNavItem text='All' link='/archive' />
        <ArchiveNavItem text='Residents' link='/archive/residents' />

        <li onClick={() => handleClick('mood')} className={styles.moodItem}>
          <div className='relative items-center justify-center tracking-[0.01em]  md:flex md:h-full md:w-full'>
            Moods
          </div>
        </li>

        {archiveNav?.data.moodsArray &&
          archiveNav.data.moodsArray.length > 0 && (
            <div
              onMouseEnter={() => toggleHover('mood')}
              onMouseLeave={() => toggleHover(null)}
              style={{ top: navHeight - 2 }}
              className={clsx(styles.moodList, {
                [styles.active]:
                  hoveredEl === 'mood' || clickedArchiveNavType === 'mood',
              })}
            >
              {archiveNav.data.moodsArray.map((moodArray, i) => {
                return (
                  <ul
                    key={
                      moodArray && moodArray[0]?.slug && moodArray[0].slug + i
                    }
                    className='flex flex-col justify-center gap-1'
                  >
                    {moodArray?.map((mood) => (
                      <li key={mood?.name}>
                        <Button
                          className='h-full whitespace-nowrap  py-0.5 font-semibold tracking-[0.01em] transition-none'
                          href={`/archive/mood/${mood?.slug}`}
                        >
                          {mood?.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>
          )}
        <li onClick={() => handleClick('genres')} className={styles.genresItem}>
          <div className='relative items-center justify-center tracking-[0.01em]  md:flex md:h-full md:w-full'>
            Genres
          </div>
        </li>
        {archiveNav?.data.genresArray &&
          archiveNav.data.genresArray.length > 0 && (
            <div
              style={{ top: navHeight - 2 }}
              onMouseEnter={() => toggleHover('genres')}
              onMouseLeave={() => toggleHover(null)}
              className={clsx(styles.genresList, {
                [styles.active]:
                  hoveredEl === 'genres' || clickedArchiveNavType === 'genres',
              })}
            >
              {archiveNav.data.genresArray.map((genreArray, i) => {
                return (
                  <ul
                    key={
                      genreArray &&
                      genreArray[0]?.slug &&
                      genreArray[0].slug + i
                    }
                    className='flex   flex-col gap-0'
                  >
                    {genreArray?.map((genre) => (
                      <li key={genre?.name} className=' flex whitespace-nowrap'>
                        <Button
                          className='h-full py-0.5 font-semibold tracking-[0.01em] transition-none'
                          href={`/archive/genres/${genre?.slug}`}
                        >
                          {genre?.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>
          )}
        <ArchiveNavItem
          text='Shows'
          link='/archive/shows'
          className='order-3 md:order-5'
        />
      </ul>
    </nav>
  );
};
