import React from "react";
import { useVoiceRecognition } from "../hooks/useVoiceRecognition";

const VoiceInputComponent = ({
  onReceiveText,
}: {
  onReceiveText: (text: string) => void;
}) => {
  const { startListening, isListening } = useVoiceRecognition(onReceiveText);

  return (
    <button onClick={startListening} disabled={isListening}>
      {isListening ? "Listening..." : "Start Voice Input"}
    </button>
  );
};

export default VoiceInputComponent;
