import React, { useState, useEffect } from "react";

const VoiceInputComponent = ({
  onReceiveText,
}: {
  onReceiveText: (text: string) => void;
}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognizer = new SpeechRecognition();
        recognizer.lang = "en-US";
        recognizer.continuous = false;
        recognizer.interimResults = false;

        recognizer.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          onReceiveText(transcript);
        };

        recognizer.onend = () => setIsListening(false);

        setRecognition(recognizer);
      }
    }
  }, [onReceiveText]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  };

  return <div></div>;
};

export default VoiceInputComponent;
