"use client"
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  ParticipantView,
  SpeakerLayout,
  useCallStateHooks,
  useParticipantViewContext,
} from "@stream-io/video-react-sdk";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
import Image from "next/image";
import { IncomingVideoQualitySelector } from "./VideoQualitySelector";
import { SpeakerView } from "./test/screen-view/SpeakerView";
import { CustomParticipantViewUI } from "./custom/CustomParticipantViewUI";
import { CustomParticipantViewUIBar } from "./custom/CustomParticipantViewUIBar";

type CallLayoutType = "grid" | "speaker-center" | "speaker-right";


const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");

  const [layout, setLayout] = useState<CallLayoutType>("speaker-center");
  const [showParticipents, setShowParticipents] = useState(false);

  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  const router = useRouter();


  if (callingState !== CallingState.JOINED) return <Loader />;





  const CallLayout = () => {
    switch (layout) {
        case "grid":
          return (
             <PaginatedGridLayout ParticipantViewUI={CustomParticipantViewUI} mirrorLocalParticipantVideo={false} />
          );

      case "speaker-center":
        return (
        //   <SpeakerLayout
        //     participantsBarPosition="left"
        //     ParticipantViewUIBar={CustomParticipantViewUIBar}
        //     ParticipantViewUISpotlight={CustomParticipantViewUI}
        //     mirrorLocalParticipantVideo={false}
        //   />
        <SpeakerView />

        );

//         case "speaker-right":
//           return (
//             <SpeakerLayout
//               participantsBarPosition="right"
//               ParticipantViewUIBar={CustomParticipantViewUI}
//               ParticipantViewUISpotlight={CustomParticipantViewUI}
// mirrorLocalParticipantVideo={false}
//             />
//           );

      default:
        return (
          <SpeakerView />
        );
        break;
    }
  };

  return (
    <section className="relative h-dvh w-full text-white flex overflow-y-auto flex-col">
      <div className="top-0 flex size-full items-center justify-center">
        <div className="flex size-full lg:max-w-[1000px] p-2">
          <CallLayout />
        </div>
        <div
          className={cn(
            "h-[calc(100vh-86px)] hidden ml-2  w-[300px] border-4 border-red-400",
            {
              "show-block": showParticipents,
            }
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipents(false)} />
        </div>
      </div>

      <div className="max-md:pt-10">
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls
          onLeave={() => {
            router.push("/");
          }}
        />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent
            className="border-dark-1 bg-[#19232d]
           text-white"
          >
            {["Grid", "Speaker-Center"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setLayout(item.toLowerCase() as CallLayoutType);
                  }}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipents((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <User size={20} className="text-white" />
          </div>
        </button>

        <IncomingVideoQualitySelector />

         <EndCallButton />
      </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
