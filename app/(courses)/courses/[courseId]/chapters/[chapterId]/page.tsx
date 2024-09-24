// ChapterIdPage.tsx

import { redirect } from "next/navigation";
import { File } from "lucide-react";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { currentUser } from "@/lib/auth";
import { CourseProgressButton } from "./_components/course-progress-button";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { getChapter } from "@/actions/Courses/get-chapter";
import { checkPurchase } from "@/actions/Courses/get-purchase";
import { getQuizData } from "@/actions/Courses/get-quiz";
import { getQuizAttempt } from "@/actions/Courses/get-quiz-attempt"; // Import getQuizAttempt function
import { VideoPlayer } from "./_components/video-player";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const user = await currentUser();
  let userId = user?.id ?? "";

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const purchased = await checkPurchase(userId, params.courseId);
  const isLocked = !purchased;
  const completeOnEnd = !userProgress?.isCompleted;

  // Fetch quiz data using getQuizData function
  const quizzes = await getQuizData({ chapterId: params.chapterId });

  // Filter out completed quizzes
  const incompleteQuizzes = [];
  for (const quiz of quizzes) {
    const quizAttempt = await getQuizAttempt({ userId, quizId: quiz.id });
    if (!quizAttempt) {
      incompleteQuizzes.push(quiz);
    }
  }

  // Determine the timeline for the first incomplete quiz
  const quizTimelineSeconds = incompleteQuizzes.length > 0 ? incompleteQuizzes[0].timeline : 0;

  return (
    <div>
      <div>
        {userProgress?.isCompleted && (
          <Banner variant="success" label="You already completed this chapter." />
        )}
        {isLocked && (
          <Banner
            variant="warning"
            label="You need to enroll in this course to watch this chapter."
          />
        )}
        <div className="flex flex-col max-w-4xl mx-auto pb-20 p-4 space-y-6 lg:mr-72">
          <div className="p-4">
            <VideoPlayer
              chapterId={params.chapterId}
              title={chapter.title}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              videoUrl={chapter.videoUrl!}
              isLocked={isLocked}
              completeOnEnd={completeOnEnd}
              quizTimelineSeconds={quizTimelineSeconds}
              quizzes={incompleteQuizzes}
            />
          </div>
          <div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
              {purchase ? (
                <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              ) : (
                <CourseEnrollButton courseId={params.courseId} />
              )}
            </div>
            <Separator />
            <div>
              <Preview value={chapter.description!} />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block fixed right-0 top-[80px] bottom-0 w-64 pt-4 space-y-4 md:w-72 bg-white shadow-lg">
        <div className="flex flex-col">
          <h2 className="text-lg font-medium ml-4 pb-4">Attachments</h2>
          {!!attachments.length && (
            <>
              {attachments.map((attachment) => (
                <div key={attachment.id}>
                  <div className="pb-2 w-full">
                    <a
                      href={attachment.url}
                      target="_blank"
                      className="flex items-center p-3 w-full border text-slate-500 text-sm font-[500] rounded-md hover:underline transition-all hover:text-input-border hover:bg-slate-300/20"
                    >
                      <File />
                      <p className="line-clamp-1">{attachment.name}</p>
                    </a>
                  </div>
                  <Separator />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
