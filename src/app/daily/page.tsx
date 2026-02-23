"use client";

import { useState } from "react";
import {
  Target,
  Plus,
  Check,
  Trash2,
  Zap,
  Trophy,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

interface DailyGoal {
  id: string;
  content: string;
  isCompleted: boolean;
}

// 데모 데이터
const INITIAL_GOALS: DailyGoal[] = [
  { id: "1", content: "JavaScript 배열 메서드 정리 노트 작성", isCompleted: true },
  { id: "2", content: "정보처리기능사 기출문제 20문항 풀기", isCompleted: false },
  { id: "3", content: "포트폴리오 프로젝트 README 작성", isCompleted: false },
];

const XP_PER_GOAL = 50;
const MAX_DAILY_XP = 150;

export default function DailyQuestPage() {
  const [goals, setGoals] = useState<DailyGoal[]>(INITIAL_GOALS);
  const [newGoal, setNewGoal] = useState("");

  const completedCount = goals.filter((g) => g.isCompleted).length;
  const currentXP = completedCount * XP_PER_GOAL;
  const allCompleted = goals.length > 0 && completedCount === goals.length;

  function addGoal() {
    if (!newGoal.trim() || goals.length >= 3) return;
    setGoals([
      ...goals,
      { id: Date.now().toString(), content: newGoal.trim(), isCompleted: false },
    ]);
    setNewGoal("");
  }

  function toggleGoal(id: string) {
    setGoals(
      goals.map((g) =>
        g.id === id ? { ...g, isCompleted: !g.isCompleted } : g
      )
    );
  }

  function removeGoal(id: string) {
    setGoals(goals.filter((g) => g.id !== id));
  }

  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Daily Quest</h1>
        <div className="mt-1 flex items-center gap-2 text-sm text-muted">
          <Calendar className="h-4 w-4" />
          <span>{dateStr} {dayNames[today.getDay()]}</span>
        </div>
      </div>

      {/* 경험치 바 */}
      <Card className={cn(allCompleted && "ring-2 ring-green-accent")}>
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "rounded-lg p-3 text-white",
              allCompleted ? "bg-green-accent" : "bg-navy-600"
            )}
          >
            {allCompleted ? (
              <Trophy className="h-6 w-6" />
            ) : (
              <Zap className="h-6 w-6" />
            )}
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">
                {allCompleted
                  ? "오늘의 Quest 모두 완료!"
                  : `오늘의 경험치 ${currentXP} / ${MAX_DAILY_XP} XP`}
              </span>
              <span className="text-xs text-muted">
                {completedCount}/{goals.length} 완료
              </span>
            </div>
            <ProgressBar
              value={currentXP}
              max={MAX_DAILY_XP}
              showPercent={false}
              barColor={allCompleted ? "bg-green-accent" : "bg-navy-500"}
            />
          </div>
        </div>
      </Card>

      {/* Quest 목록 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-navy-500" />
            <CardTitle>오늘의 목표 (최대 3개)</CardTitle>
          </div>
        </CardHeader>

        <div className="space-y-3">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border border-border p-4 transition-all",
                goal.isCompleted && "border-green-200 bg-green-50/50"
              )}
            >
              {/* 체크 버튼 */}
              <button
                onClick={() => toggleGoal(goal.id)}
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  goal.isCompleted
                    ? "border-green-accent bg-green-accent text-white"
                    : "border-gray-300 hover:border-navy-400"
                )}
              >
                {goal.isCompleted && <Check className="h-3.5 w-3.5" />}
              </button>

              {/* 내용 */}
              <span
                className={cn(
                  "flex-1 text-sm",
                  goal.isCompleted && "text-muted line-through"
                )}
              >
                {goal.content}
              </span>

              {/* 경험치 뱃지 */}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  goal.isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-navy-100 text-navy-600"
                )}
              >
                +{XP_PER_GOAL} XP
              </span>

              {/* 삭제 버튼 */}
              <button
                onClick={() => removeGoal(goal.id)}
                className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {/* 목표 추가 입력 */}
          {goals.length < 3 && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addGoal()}
                placeholder="새로운 목표를 입력하세요..."
                className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-sm placeholder:text-muted focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
              />
              <button
                onClick={addGoal}
                disabled={!newGoal.trim()}
                className="flex items-center gap-1.5 rounded-lg bg-navy-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-700 disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                추가
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* 보상 안내 */}
      <Card className="bg-navy-50/50">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-navy-600 p-2 text-white">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-navy-800">Quest 보상 시스템</p>
            <ul className="mt-1 space-y-1 text-xs text-muted">
              <li>- 목표 1개 달성: +50 XP</li>
              <li>- 3개 모두 달성: +150 XP + 연속 달성 보너스</li>
              <li>- 7일 연속 달성: 특별 뱃지 획득</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
