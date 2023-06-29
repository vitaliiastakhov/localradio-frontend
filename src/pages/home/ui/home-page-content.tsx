import { CardListWithMemo } from '@/entities/archive/ui/card-list';
import { GenreItem } from '@/shared/ui/genres/genre-button/genre-item';
import { HomePageProps } from './home-page';

export const HomePageContent = ({
  latest,
  releases,
  shopItems,
  events,
  genres,
  moods,
}: Omit<HomePageProps, 'homePageRandomMix' | 'schedules' | 'streamIsLive'>) => {
  return (
    <div className='flex flex-col gap-5 pt-5 lg:pt-10'>
      <div>
        <CardListWithMemo
          pageVariant='home'
          data={latest}
          variant='mixes'
          text='Latest'
        />
        <div className=' hidden px-1.5 py-2 lg:block lg:px-2 xl:px-3.5'>
          <div className='flex flex-wrap gap-[5px] border-black bg-black p-[5px] text-[0.875rem] font-semibold uppercase text-primary lg:text-[0.8rem] xl:text-[0.875rem] 2xl:text-[0.95rem]'>
            <div className='px-1.5 lg:px-3'>genres</div>
            {genres.map(
              ({ attributes: a }) =>
                a?.slug && (
                  <GenreItem
                    key={a.name}
                    title={a.name}
                    slug={a.slug}
                    sizeVariant='large'
                    type='genre'
                    variant='borderless'
                    colorVariant='primary'
                  />
                )
            )}
            <div className='px-1.5 lg:px-3'>moods</div>
            {moods.map(
              ({ attributes: a }) =>
                a?.slug && (
                  <GenreItem
                    key={a.name}
                    title={a.name}
                    slug={a.slug}
                    sizeVariant='large'
                    type='genre'
                    variant='borderless'
                    colorVariant='primary'
                  />
                )
            )}
          </div>
        </div>
      </div>

      {releases.length > 0 && (
        <CardListWithMemo
          pageVariant='home'
          data={releases}
          variant='releases'
          text='Releases'
        />
      )}
      {shopItems.length > 0 && (
        <CardListWithMemo
          pageVariant='home'
          data={shopItems}
          variant='shop'
          text='Shop'
        />
      )}
      {events.length > 0 && (
        <CardListWithMemo
          pageVariant='home'
          data={events}
          text='Events'
          variant='events'
        />
      )}
    </div>
  );
};
