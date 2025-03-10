import { PropsWithChildren, useEffect } from 'react';
import {
  CancelCallButton,
  combineComparators,
  Comparator,
  conditional,
  DefaultParticipantViewUI,
  dominantSpeaker,
  hasScreenShare,
  ParticipantView,
  pinned,
  publishingAudio,
  publishingVideo,
  reactionType,
  ScreenShareButton,
  screenSharing,
  speaking,
  SpeakingWhileMutedNotification,
  StreamVideoParticipant,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  useCall,
  useCallStateHooks,
  VisibilityState,
} from '@stream-io/video-react-sdk';

import './SpeakerView.scss';
import { getCustomSortingPreset } from '@/hooks/getCustomSorting';
import { CustomParticipantViewUIBar } from '@/components/custom/CustomParticipantViewUIBar';
import { CustomParticipantViewUI } from '@/components/custom/CustomParticipantViewUI';
import clsx from 'clsx';
import { cn } from '@/lib/utils';

export const SpeakerView = () => {
  const call = useCall();
  const { useParticipants } = useCallStateHooks();
  const [participantInSpotlight, ...otherParticipants] = useParticipants();

  // determine whether the call is a 1:1 call
  const isOneToOneCall = otherParticipants.length === 1;
  useEffect(() => {
    if (!call) return;
    const customSortingPreset = getCustomSortingPreset(isOneToOneCall);
    call.setSortParticipantsBy(customSortingPreset);
  }, [call, isOneToOneCall]);

  return (
   <div className='w-full'>
     <div className={cn("speaker-view", "max-sm:h-[80%]")}>
      {call && otherParticipants.length > 0 && (
        <div className="participants-bar">
          {otherParticipants.map((participant) => (
            <div className="participant-tile " key={participant.sessionId}>
              <ParticipantView
                participant={participant}
                ParticipantViewUI={CustomParticipantViewUIBar}
              />
            </div>
          ))}
        </div>
      )}

      <div className="spotlight">
        {call && participantInSpotlight && (
          <ParticipantView
            participant={participantInSpotlight}
            trackType={
              hasScreenShare(participantInSpotlight)
                ? 'screenShareTrack'
                : 'videoTrack'
            }
            ParticipantViewUI={CustomParticipantViewUI}
          />
        )}
      </div>
    </div>
   </div>
  );
};
