"use client";

// VideoPlayer.tsx
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useConfettiStore } from "@/hooks/use-confetti-store";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface VideoPlayerProps {
  videoUrl: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  quizTimelineSeconds: number; // New prop for quiz timeline
}

export const VideoPlayer = ({
  videoUrl,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
  quizTimelineSeconds,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const [showQuizBlocker, setShowQuizBlocker] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();
  const playerRef = useRef<any>(null);

  const handleEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch (error) {
      console.error("Failed to update progress:", error);
      toast.error("Something went wrong");
    }
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  const startQuiz = () => {
    if (!quizCompleted) {
      toast.error("Finish the quiz to view further");
    } else {
      // Navigate or show further content
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <>
          <Skeleton className="absolute inset-0 flex items-center justify-center" />
          <Loader2 className="h-8 w-8 animate-spin absolute text-secondary top-[46%] left-[46%] text-gray-800" />
        </>
      )}
      {showQuizBlocker && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p className="text-sm">Finish the quiz to view further</p>
            <button
              onClick={startQuiz}
              className="mt-4 px-4 py-2 bg-custom-primary text-white rounded-md hover:bg-custom-primary/90 transition-colors"
            >
              Start the Quiz
            </button>
          </div>
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            This chapter is locked
          </p>
        </div>
      )}
      {!isLocked && !showQuizBlocker && (
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          controls
          width="100%"
          height="100%"
          onProgress={(progress) => {
            if (!quizCompleted && progress.playedSeconds >= quizTimelineSeconds) {
              setShowQuizBlocker(true);
              playerRef.current?.pause(); // Pause the video
            }
          }}
          onEnded={handleEnd}
          onCanPlay={() => setIsReady(true)}
          onContextMenu={handleRightClick}
          className="react-player"
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
        />
      )}
    </div>
  );
};
