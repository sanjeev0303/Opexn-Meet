import { useParticipantViewContext } from "@stream-io/video-react-sdk";
import Image from "next/image";

export const CustomParticipantViewUIBar = () => {
    const { participant } = useParticipantViewContext();

    return (
      <div className="border-[5px] lg:border-[5px] md:border-[5px] absolute w-full h-full rounded-lg">
        <div className="bg-white  h-4  p-2 flex justify-between items-center text-black lg:p-2 md:p-2 rounded-t-[3px] lg:rounded-t-none md:rounded-t-none">
          <div>
            <Image
              src="/images/opexn_logo.png"
              alt="logo"
              width={50}
              height={50}
              className="rounded-full lg:size-8 md:size-8 max-sm:size-6"
            />
          </div>

          <div>
            <h1 className="uppercase text-[0.6rem]">
              {participant.name}
            </h1>
          </div>

          <div className="flex gap-[2px] items-center">
            <Image
              src="/images/incubation.png"
              alt="award"
              width={30}
              height={30}
              className="rounded-full max-sm:size-4 max-sm:mt-[2px] lg:size-4 "
            />
            <h1 className=" font-semibold text-[0.7rem] text-nowrap pr-[3px]">
              Narayani Award
            </h1>
          </div>
        </div>
      </div>
    );
  }
