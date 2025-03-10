import { combineComparators, Comparator, conditional, dominantSpeaker, pinned, publishingAudio, publishingVideo, reactionType, screenSharing, speaking, StreamVideoParticipant, VisibilityState } from "@stream-io/video-react-sdk";

export const getCustomSortingPreset = (
    isOneToOneCall: boolean = false,
  ): Comparator<StreamVideoParticipant> => {
    // 1:1 calls are a special case, where we want to always show the other
    // participant in the spotlight, and not show them in the participants bar.
    if (isOneToOneCall) {
      return (a: StreamVideoParticipant, b: StreamVideoParticipant) => {
        if (a.isLocalParticipant) return 1;
        if (b.isLocalParticipant) return -1;
        return 0;
      };
    }

    // a comparator decorator which applies the decorated comparator only if the
    // participant is invisible.
    // This ensures stable sorting when all participants are visible.
    const ifInvisibleBy = conditional(
       (a: StreamVideoParticipant, b: StreamVideoParticipant) =>
         a.viewportVisibilityState?.videoTrack === VisibilityState.INVISIBLE ||
         b.viewportVisibilityState?.videoTrack === VisibilityState.INVISIBLE,
     );

    // the custom sorting preset
    return combineComparators(
      screenSharing,
      dominantSpeaker,
      pinned,
      ifInvisibleBy(speaking),
      ifInvisibleBy(reactionType("raised-hand")),
      ifInvisibleBy(publishingVideo),
      ifInvisibleBy(publishingAudio),
    );
  };
