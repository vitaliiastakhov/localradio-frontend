import clsx from 'clsx';
import { useState } from 'react';
import type { Maybe } from 'yup';
import type { PopularityResponse } from '@/shared/api/graphql/__generated__/schema.graphql';
import { clsxm } from '@/shared/lib/clsxm';
import { isTodayOrTomorrow } from '@/shared/lib/is-today-or-tomorrow';
import { NextImage } from '@/shared/ui/next-image/next-image';
import { ScheduleItem } from './schedule-item';
import { ScheduleItemDate } from './schedule-item-date';
import { ScheduleLocation } from './schedule-location';

interface ScheduleGroupProps {
  isStreaming: Maybe<boolean>;
  schedule?: PopularityResponse;
  index: number;
}

export const ScheduleGroup = ({
  schedule,
  isStreaming,
  index,
}: ScheduleGroupProps) => {
  const [openedCover, setOpenedCover] = useState(false);
  const customDate = new Date(schedule?.date);
  const todayOrTomorrow = isTodayOrTomorrow(customDate);
  return (
    <div className='grid overflow-hidden rounded-lg border-2 border-black text-[0.75rem] leading-[0.8] md:text-[0.95rem] lg:leading-[0.85] xl:text-[1rem] 2xl:text-[1.05rem]'>
      <div
        className={clsxm(
          'sticky top-0 flex items-center bg-primary  px-[4px] py-[4px] font-medium text-black',
          { 'bg-[red]': isStreaming && todayOrTomorrow === 'today' }
        )}
      >
        <div className='flex w-full flex-wrap items-center justify-between gap-x-3  overflow-hidden lg:gap-x-3'>
          <div className='flex gap-0.5 py-[6px] pl-1.5 lg:pl-2 2xl:gap-1 2xl:pl-3'>
            <ScheduleItemDate
              todayOrTomorrow={todayOrTomorrow}
              isStreaming={isStreaming}
              fixedDate={schedule?.fixedDate}
            />
          </div>
          <ScheduleLocation
            locationName={schedule?.location?.locationName}
            locationLink={schedule?.location?.locationLink}
          />
        </div>
      </div>
      <div className=' bg-black px-[4px] py-1.5 2xl:py-2'>
        <div className='grid gap-1.5'>
          {schedule?.schedule?.map((schedule) => {
            return (
              <ScheduleItem
                key={String(schedule?.time) + schedule?.artist?.title}
                schedule={schedule}
              />
            );
          })}
          {schedule?.cover?.url && (
            <div
              className={clsx('relative hidden aspect-square lg:w-full', {
                'lg:block': todayOrTomorrow || openedCover || index === 0,
              })}
            >
              <NextImage
                alt=''
                style={{ objectFit: 'contain' }}
                fill
                src={schedule.cover.url}
              />
            </div>
          )}
        </div>
      </div>
      {!todayOrTomorrow && schedule?.cover?.url && index !== 0 && (
        <button
          aria-label={(openedCover ? 'Close' : 'Open') + ' cover'}
          type='button'
          onClick={() => {
            setOpenedCover((prev) => !prev);
          }}
          className={clsxm(
            'top-0  hidden items-center justify-center bg-primary px-[4px] py-[3px] text-sm font-medium uppercase text-black lg:flex',
            { 'bg-[red]': isStreaming && todayOrTomorrow === 'today' }
          )}
        >
          {openedCover ? 'Close' : 'Open'} Cover
        </button>
      )}
    </div>
  );
};
