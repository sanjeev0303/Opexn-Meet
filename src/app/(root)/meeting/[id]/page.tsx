'use client';

// import Mee from "@/components/MeetingRoom";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { PaginatedGridLayout, StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { Chat, useCreateChatClient } from "stream-chat-react";
import { useState } from "react";

const MeetingPage = ({ params }: { params: { id: string } }) => {
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);
  const { id } = params;
  const { call, isCallLoading } = useGetCallById(id);

  if (isCallLoading) {
    return <div>Loading...</div>;
  }


  return (
    <main className="h-screen w-full text-white">
     <StreamCall call={call}>
        <StreamTheme>
          {!isSetupCompleted ? <MeetingSetup setIsSetupCompleted={setIsSetupCompleted} /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
