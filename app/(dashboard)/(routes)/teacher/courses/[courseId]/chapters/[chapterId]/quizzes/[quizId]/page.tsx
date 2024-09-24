import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CircleHelp, LayoutDashboard } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { QuizTitleForm } from "./_components/quiz-title-form";
import { QuizTimelineForm } from "./_components/quiz-timeline-form";
import { QuizQuestionsForm } from "./_components/quiz-question-form";
import { currentUser } from "@/lib/auth";
import { QuizActions } from "./_components/quiz-actions";

const QuizIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string; quizId: string }
}) => {
  const user = await currentUser();
  let userId = user?.id ?? "";

  if (!userId) {
    return redirect("/");
  }

  const quiz = await db.quiz.findUnique({
    where: {
      id: params.quizId,
    },
    include: {
      questions: true,
    },
  });

  if (!quiz) {
    return redirect("/")
  }

  const requiredFields = [
    quiz.title,
    quiz.timeline,
    quiz.questions.length > 0
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!quiz.isPublished && (
        <Banner
          variant="warning"
          label="This quiz is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}/chapters/${params.chapterId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to chapter setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Quiz Editing
                </h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <QuizActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                quizId={params.quizId}
                isPublished={quiz.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Customize your quiz
                </h2>
              </div>
              <QuizTitleForm
                initialData={quiz}
                courseId={params.courseId}
                chapterId={params.chapterId}
                quizId={params.quizId}
              />
              <QuizTimelineForm
                initialData={quiz}
                courseId={params.courseId}
                chapterId={params.chapterId}
                quizId={params.quizId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleHelp} />
              <h2 className="text-xl">
                Add Questions
              </h2>
            </div>
            <QuizQuestionsForm
              initialData={quiz.questions}
              courseId={params.courseId}
              chapterId={params.chapterId}
              quizId={params.quizId}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizIdPage;
