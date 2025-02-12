import { useEffect, useState } from "react";

type UseStreamTextProps = {
  text: string;
  enabled?: boolean;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useStreamText = ({ text, enabled = true }: UseStreamTextProps) => {
  const [streamingText, setStreamingText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const isDone = currentIndex === text.length;

  useEffect(() => {
    if (!enabled) {
      setStreamingText("");

      return;
    }

    const messageInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setStreamingText((prevText) => prevText + (text[currentIndex] ?? ""));
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(messageInterval);
      }
    }, 30);

    return () => {
      clearInterval(messageInterval);
    };
  }, [text, currentIndex, enabled]);

  return { streamingText, isDone };
};
