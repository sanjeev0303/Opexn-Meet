import { useParticipantViewContext } from "@stream-io/video-react-sdk";
import Image from "next/image";

export const CustomParticipantViewUI = () => {
    const { participant } = useParticipantViewContext();

    return (
      <div className="border-[5px] lg:border-[10px] md:border-[10px] absolute w-full h-full rounded-lg">
        <div className="bg-white w-full lg:h-9 md:h-9 h-6  p-2 flex justify-between items-center text-black lg:p-2 md:p-2 rounded-t-[3px] lg:rounded-t-none md:rounded-t-none">
          <div>
            <Image
              src="/images/opexn_logo.png"
              alt="logo"
              width={50}
              height={50}
              className="rounded-full lg:size-16 md:size-16 size-10 sm:w-10 sm:h-10"
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
            <h1 className="lg:text-[1rem] md:text-[1rem] font-semibold sm:text-[0.7rem]">
              Narayani Award
            </h1>
          </div>
        </div>
      </div>
    );
  };
