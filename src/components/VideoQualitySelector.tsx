"use client"

import { useEffect, type FormEvent } from "react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import type { Call } from "@stream-io/video-react-sdk";


const incomingVideoSettings = ["auto", "1080p", "720p", "480p", "off"] as const;
type IncomingVideoSetting = (typeof incomingVideoSettings)[number];
type VideoDimension = { width: number; height: number };

function applyIncomingVideoSetting(call: Call, setting: IncomingVideoSetting) {
  if (setting === "auto") {
    call.setIncomingVideoEnabled(true);
  } else if (setting === "off") {
    call.setIncomingVideoEnabled(false);
  } else {
    call.setPreferredIncomingVideoResolution(
      incomingVideoSettingToResolution(setting),
    );
  }
}

function incomingVideoSettingToResolution(
  setting: Exclude<IncomingVideoSetting, "auto" | "off">,
): VideoDimension {
  switch (setting) {
    case "1080p":
      return { width: 1920, height: 1080 };
    case "720p":
      return { width: 1280, height: 720 };
    case "480p":
      return { width: 640, height: 480 };
  }
}

function incomingVideoResolutionToSetting(
  resolution: VideoDimension,
): IncomingVideoSetting {
  switch (true) {
    case resolution.height >= 1080:
      return "1080p";
    case resolution.height >= 720:
      return "720p";
    case resolution.height >= 480:
      return "480p";
    default:
      return "auto";
  }
}

export const IncomingVideoQualitySelector = () => {
  const call = useCall();
  const { useIncomingVideoSettings } = useCallStateHooks();
  const { enabled, preferredResolution } = useIncomingVideoSettings();
  let currentSetting: IncomingVideoSetting;

  if (!preferredResolution) {
    currentSetting = enabled ? "auto" : "off";
  } else {
    currentSetting = incomingVideoResolutionToSetting(preferredResolution);
  }

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    if (call) {
      const setting = event.currentTarget.value as IncomingVideoSetting;
      applyIncomingVideoSetting(call, setting);
    }
  };

const { useParticipants } = useCallStateHooks();
const participants = useParticipants();
const [dominantParticipant] = participants;

useEffect(() => {
  if (call && dominantParticipant) {
    call.setPreferredIncomingVideoResolution(
      incomingVideoSettingToResolution("1080p"),
      [dominantParticipant.sessionId],
    );
  }
}, [call, dominantParticipant]);

  return (
    <div className="flex items-center">
      <select
        className="cursor-pointer rounded-2xl bg-[#19232d] px-3 py-[6px] hover:bg-[#4c535b]"
        value={currentSetting}
        onChange={handleChange}
      >
        {incomingVideoSettings.map((setting) => (
          <option key={setting} value={setting}>
            {setting}
          </option>
        ))}
      </select>
    </div>
  );
};
