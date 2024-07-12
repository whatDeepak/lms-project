"use client"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Question } from "@prisma/client";
import QuizCard from "./quiz-card";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  timeline: number;
  isPublished: boolean;
  position: number;
  chapterId: string;
  createdAt: Date;
  updatedAt: Date;
  questions: Question[];
}

interface VideoPlayerProps {
  videoUrl: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  quizTimelineSeconds: number;
  quizzes: Quiz[];
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
  quizzes,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const [showQuizBlocker, setShowQuizBlocker] = useState(false);
  const [showQuizCard, setShowQuizCard] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [resumeTime, setResumeTime] = useState<number | null>(null);
  const [updatedVideoUrl, setUpdatedVideoUrl] = useState<string>(videoUrl);
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
    if (quizzes.length > 0) {
      setShowQuizBlocker(false);
      setShowQuizCard(true);
    } else {
      console.error("No quizzes found for this chapter");
    }
  };

  const handleQuizComplete = (quizTimeline: number) => {
    setQuizCompleted(true);
    setShowQuizCard(false);
    setCurrentQuizIndex(currentQuizIndex + 1);
    setResumeTime(quizTimeline);
    router.refresh();
  };

  useEffect(() => {
    if (currentQuizIndex < quizzes.length) {
      setQuizCompleted(false);
    }
  }, [currentQuizIndex]);

  useEffect(() => {
    if (resumeTime !== null && playerRef.current) {
      playerRef.current.seekTo(resumeTime, "seconds");
    }
  }, [resumeTime]);

  useEffect(() => {
    if (resumeTime !== null) {
      const newVideoUrl = `${videoUrl}#t=${resumeTime}`;
      setUpdatedVideoUrl(newVideoUrl);
    }
  }, [resumeTime, videoUrl]);

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
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && !showQuizBlocker && !showQuizCard && (
        <ReactPlayer
          ref={playerRef}
          url={updatedVideoUrl}
          controls
          width="100%"
          height="100%"
          onProgress={(progress) => {
            if (
              !quizCompleted &&
              currentQuizIndex < quizzes.length &&
              progress.playedSeconds >= quizzes[currentQuizIndex].timeline
            ) {
              setShowQuizBlocker(true);
              setResumeTime(progress.playedSeconds); // Store the resume time
              playerRef.current?.pause();
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
      {showQuizCard && currentQuizIndex < quizzes.length && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 text-white">
          <QuizCard
            questions={quizzes[currentQuizIndex].questions}
            onQuizComplete={handleQuizComplete}
            quizId={quizzes[currentQuizIndex].id}
            quizTimeline={quizzes[currentQuizIndex].timeline}
          />
        </div>
      )}
    </div>
  );
};
