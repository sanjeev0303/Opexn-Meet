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

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

// const cloudinaryUrl =
//   "https://res.cloudinary.com/dng61q3lg/image/upload/v1741110942/exhibitor-images/uivs1nphtjpz67vgbsoz.jpg";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");

  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipents, setShowParticipents] = useState(false);

  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  const router = useRouter();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CustomParticipantViewUI = () => {
    const { participant } = useParticipantViewContext();

    return (
      <div className="border-[5px] lg:border-[10px] md:border-[10px] absolute w-full h-full rounded-lg">
        <div className="bg-white w-full lg:h-9 md:h-9 h-4  p-2 flex justify-between items-center text-black lg:p-2 md:p-2 rounded-t-[3px] lg:rounded-t-none md:rounded-t-none">
          <div>
            <Image
              src="/images/opexn_logo.png"
              alt="logo"
              width={50}
              height={50}
              className="rounded-full lg:size-full md:size-full size-5 sm:w-5 sm:h-5"
            />
          </div>

          <div>
            <h1 className="uppercase lg:text-md md:text-md text-xs">
              {participant.name}
            </h1>
          </div>

          <div className="flex gap-1 items-center">
            <Image
              src="/images/incubation.png"
              alt="award"
              width={30}
              height={30}
              className="rounded-full lg:size-8 md:size-8 sm:w-4 sm:h-4 mt-[4px]"
            />
            <h1 className="lg:text-md md:text-md font-semibold text-xs">
              Narayani Award
            </h1>
          </div>
        </div>
      </div>
    );
  };

  const CustomParticipantViewUIBar = () => {
    const { participant } = useParticipantViewContext();

    return (
      <div className="border-[5px] lg:border-[5px] md:border-[5px] absolute w-full h-full rounded-lg">
        <div className="bg-white w-full h-4  p-2 flex justify-between items-center text-black lg:p-2 md:p-2 rounded-t-[3px] lg:rounded-t-none md:rounded-t-none">
          <div>
            <Image
              src="/images/opexn_logo.png"
              alt="logo"
              width={50}
              height={50}
              className="rounded-full lg:size-8 md:size-8 size-4 sm:w-4 sm:h-4"
            />
          </div>

          <div>
            <h1 className="uppercase text-[10px]">
              {participant.name}
            </h1>
          </div>

          <div className="flex gap-[2px] items-center">
            <Image
              src="/images/incubation.png"
              alt="award"
              width={30}
              height={30}
              className="rounded-full sm:w-4 sm:h-4 "
            />
            <h1 className=" font-semibold text-[10px] text-nowrap">
              Narayani Award
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const CallLayout = () => {
    switch (layout) {
        case "grid":
          return (
            <PaginatedGridLayout ParticipantViewUI={CustomParticipantViewUI} />
          );

      case "speaker-left":
        return (
          <SpeakerLayout
            participantsBarPosition="left"
            ParticipantViewUIBar={CustomParticipantViewUIBar}
            ParticipantViewUISpotlight={CustomParticipantViewUI}
          />
        );

      //   case "speaker-right":
      //     return (
      //       <SpeakerLayout
      //         participantsBarPosition="right"
      //         ParticipantViewUIBar={CustomParticipantViewUI}
      //         ParticipantViewUISpotlight={CustomParticipantViewUI}

      //       />
      //     );

      default:
        return (
          <PaginatedGridLayout ParticipantViewUI={CustomParticipantViewUI} />
        );
        break;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[url('https://res.cloudinary.com/dng61q3lg/image/upload/v1741110942/exhibitor-images/uivs1nphtjpz67vgbsoz.jpg')] bg-cover bg-center text-white">
      <div className="relative top-0 flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] p-2 ">
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
            className="border-dark-1 bg-bark-1
           text-white"
          >
            {["Grid", "Speaker-Left"].map((item, index) => (
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
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
