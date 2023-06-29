import { useUnit } from 'effector-react';
import { ICECAST_URL } from '@/shared/config/environment';
import { useStreamAudioHook } from '../hooks/use-stream-audio.hook';
import { isStreamLoadedEv } from '../model/stream';

export const StreamPlayer = () => {
  const { isStreamLoadedEvent } = useUnit({
    isStreamLoadedEvent: isStreamLoadedEv,
  });
  const { audioPlayer } = useStreamAudioHook();
  return (
    <audio
      src={ICECAST_URL + '/live'}
      ref={audioPlayer}
      onLoadedMetadata={() => isStreamLoadedEvent(true)}
    >
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  );
};
