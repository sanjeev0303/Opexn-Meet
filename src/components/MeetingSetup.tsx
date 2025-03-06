"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupCompleted,
}: {
  setIsSetupCompleted: (value: boolean) => void;
}) => {
  const [isMicCAmToggledOn, setIsMicCAmToggledOn] = useState(true);

  const call = useCall();

  if (!call) {
    throw new Error("useCall must be use within StremaCall component");
  }

  useEffect(() => {
    if (isMicCAmToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCAmToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
        <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3 ">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCAmToggledOn}
            onChange={(e) => setIsMicCAmToggledOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>

        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();

          setIsSetupCompleted(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
