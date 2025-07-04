"use client";

import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User as StreamUser,
  VideoPreview,
} from "@stream-io/video-react-sdk";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { Chat } from "stream-chat-react";
import { StreamChat } from "stream-chat";



const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const chatApiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();

  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [chatClient, setChatClient] = useState<StreamChat>();

  useEffect(() => {
    if (!isLoaded || !user) {
      return;
    }

    if (!apiKey) {
      throw new Error("Stream API key missing");
    }

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      },
      tokenProvider,
    });

    client.createGuestUser

    console.log("Checkpoint 8: StreamVideoClient instance created", client);

    setVideoClient(client);
    console.log("Checkpoint 9: videoClient state updated");

    // if (!chatApiKey) {
    //   throw new Error("Stream Chat API key missing");
    // }

    if (!chatApiKey) {
      throw new Error("Stream Chat API key missing");
    }

    const chatClient = StreamChat.getInstance(chatApiKey);
    chatClient.connectUser(
      {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      },
      tokenProvider // Assuming the same token provider works for chat
    );

    setChatClient(chatClient);
  }, [user, isLoaded]);

  if (!videoClient || !chatClient) {
    return <Loader />;
  }

  return (
    <StreamVideo client={videoClient}>
        {children}
      {/* <Chat client={chatClient}>{children}</Chat> */}
      {/* <VideoPreview /> */}
    </StreamVideo>
  );
};

export default StreamVideoProvider;
