import { sample } from 'effector';
import { STREAM_ERROR_TITLE } from 'pages/api/icecast';
import type { ScheduleQuery } from '@/entities/schedule/api/schedule.graphql.interface';
import {
  STREAM_DISABLED_TITLE,
  STREAM_OFFLINE_TITLE,
} from '@/shared/lib/constants/common';
import { player } from '../../player-domain';
import { HeaderStreamTitle } from '../ui/header-stream-title';

const stream = player.domain('stream');

export const isStreamLoadedEv = stream.createEvent<boolean>();
export const $isStreamLoaded = stream.createStore<boolean>(false);
export const $isClickedStreamPlay = stream.createStore<boolean>(false);
export const $streamTitle = stream.createStore<string | JSX.Element>(
  STREAM_DISABLED_TITLE
);
export const $streamError = stream.createStore<boolean>(false);

export const $streamIsAvailable = stream.createStore<boolean>(false);
export const isClickedStreamPlayEv = stream.createEvent<boolean>();
sample({
  clock: isStreamLoadedEv,
  target: $isStreamLoaded,
});
sample({
  clock: isClickedStreamPlayEv,
  target: $isClickedStreamPlay,
});

export const fetchStreamTitleFx = stream.createEffect(async () => {
  try {
    const res = await fetch('/api/icecast');

    if (res.ok) {
      const data = await res.json();
      return data.title;
    }

    if (res.status === 404) {
      throw new Error();
    }
  } catch (error) {
    throw new Error();
  }
});
const fetchStreamTitleWithScheduleFx = stream.createEffect(
  async (title: string) => {
    const eventSchedulesFixed = await fetch('/api/schedule')
      .then((res) => res.json())
      .then((data: ScheduleQuery) => data.eventSchedulesFixed);

    if (title === STREAM_OFFLINE_TITLE) {
      return <HeaderStreamTitle eventSchedulesFixed={eventSchedulesFixed} />;
    }

    return title;
  }
);

sample({
  clock: fetchStreamTitleFx.doneData,
  target: fetchStreamTitleWithScheduleFx,
});
sample({
  clock: fetchStreamTitleFx.failData,
  fn: () => true,
  target: $streamError,
});

sample({
  clock: fetchStreamTitleFx.doneData,
  fn(title) {
    if (title === STREAM_ERROR_TITLE) return false;
    if (title !== STREAM_OFFLINE_TITLE) return true;
    return false;
  },
  target: $streamIsAvailable,
});

sample({
  clock: fetchStreamTitleWithScheduleFx.doneData,
  source: $streamError,
  filter: (err) => !err,
  fn: (_, clock) => clock,
  target: $streamTitle,
});
