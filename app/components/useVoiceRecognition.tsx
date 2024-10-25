import { useEffect, useState } from "react";

const useVoiceRecognition = (onReceiveText: (text: string) => void) => {
  const [isListening, setIsListening] = useState<boolean>(false);

  const startListening = () => {
    // Implementation for starting voice recognition
    setIsListening(true);
    // Here you would typically call the speech recognition API
  };

  useEffect(() => {
    // Cleanup or additional logic here
    return () => {
      // Logic to stop listening if needed
      setIsListening(false);
    };
  }, []);

  return { startListening, isListening };
};

export default useVoiceRecognition;
