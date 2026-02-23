"use client";

import { useState } from "react";
import {
  GraduationCap,
  Award,
  Briefcase,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

type RoadmapStatus = "completed" | "in_progress" | "not_started";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
}

interface GradeData {
  grade: number;
  label: string;
  icon: React.ElementType;
  color: string;
  items: RoadmapItem[];
}

// 데모 데이터
const MOCK_GRADES: GradeData[] = [
  {
    grade: 1,
    label: "1학년 - 기초 다지기",
    icon: GraduationCap,
    color: "bg-green-accent",
    items: [
      {
        id: "1-1",
        title: "ITQ 한글/엑셀 자격증 취득",
        description: "기본적인 문서 작성 및 스프레드시트 활용 능력 확보",
        status: "completed",
      },
      {
        id: "1-2",
        title: "HTML/CSS 기초 학습",
        description: "웹 개발의 기초인 마크업 언어와 스타일시트 학습",
        status: "completed",
      },
      {
        id: "1-3",
        title: "Git & GitHub 사용법 익히기",
        description: "버전 관리 시스템의 기본 사용법 학습",
        status: "completed",
      },
      {
        id: "1-4",
        title: "JavaScript 기초 문법 학습",
        description: "프로그래밍 언어의 기본 문법과 알고리즘 이해",
        status: "in_progress",
      },
    ],
  },
  {
    grade: 2,
    label: "2학년 - 역량 확장",
    icon: Award,
    color: "bg-navy-500",
    items: [
      {
        id: "2-1",
        title: "정보처리기능사 필기/실기 합격",
        description: "국가공인 IT 자격증 취득으로 기본 역량 인증",
        status: "in_progress",
      },
      {
        id: "2-2",
        title: "React 프레임워크 학습",
        description: "현대적인 프론트엔드 개발 프레임워크 학습",
        status: "not_started",
      },
      {
        id: "2-3",
        title: "팀 프로젝트 1회 이상 수행",
        description: "협업 경험을 통한 커뮤니케이션 역량 강화",
        status: "not_started",
      },
      {
        id: "2-4",
        title: "교내 해커톤/공모전 참가",
        description: "실전 경험을 통한 문제 해결 능력 향상",
        status: "not_started",
      },
    ],
  },
  {
    grade: 3,
    label: "3학년 - 취업 준비",
    icon: Briefcase,
    color: "bg-navy-700",
    items: [
      {
        id: "3-1",
        title: "포트폴리오 사이트 완성",
        description: "개인 프로젝트를 정리한 취업용 포트폴리오 제작",
        status: "not_started",
      },
      {
        id: "3-2",
        title: "기업 인턴십/현장실습 참여",
        description: "실무 경험을 통한 직무 적합성 확인",
        status: "not_started",
      },
      {
        id: "3-3",
        title: "이력서 및 자기소개서 작성",
        description: "취업 서류 준비 및 면접 대비",
        status: "not_started",
      },
      {
        id: "3-4",
        title: "취업 박람회 참석 및 지원",
        description: "원하는 기업에 적극적으로 지원",
        status: "not_started",
      },
    ],
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: "완료",
    variant: "success" as const,
    dotColor: "bg-green-accent",
  },
  in_progress: {
    icon: Clock,
    label: "진행 중",
    variant: "warning" as const,
    dotColor: "bg-amber-400",
  },
  not_started: {
    icon: Circle,
    label: "미시작",
    variant: "default" as const,
    dotColor: "bg-gray-300",
  },
};

export default function RoadmapPage() {
  const [expandedGrade, setExpandedGrade] = useState<number | null>(2);

  function getGradeProgress(items: RoadmapItem[]) {
    const completed = items.filter((i) => i.status === "completed").length;
    return Math.round((completed / items.length) * 100);
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Career Roadmap</h1>
          <p className="mt-1 text-sm text-muted">
            고교 3년간의 성장 여정을 계획하세요.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-navy-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-700">
          <Plus className="h-4 w-4" />
          목표 추가
        </button>
      </div>

      {/* 전체 진행률 */}
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <ProgressBar
              value={
                MOCK_GRADES.reduce(
                  (acc, g) =>
                    acc + g.items.filter((i) => i.status === "completed").length,
                  0
                )
              }
              max={MOCK_GRADES.reduce((acc, g) => acc + g.items.length, 0)}
              label="전체 로드맵 진행률"
              barColor="bg-green-accent"
            />
          </div>
        </div>
      </Card>

      {/* 타임라인 */}
      <div className="relative space-y-4">
        {/* 타임라인 세로선 */}
        <div className="absolute left-[23px] top-0 hidden h-full w-0.5 bg-border md:block" />

        {MOCK_GRADES.map((grade) => {
          const isExpanded = expandedGrade === grade.grade;
          const progress = getGradeProgress(grade.items);
          const Icon = grade.icon;

          return (
            <div key={grade.grade} className="relative">
              {/* 타임라인 노드 */}
              <div className="hidden md:block">
                <div
                  className={cn(
                    "absolute left-[12px] top-6 z-10 h-[22px] w-[22px] rounded-full border-4 border-white",
                    grade.color
                  )}
                />
              </div>

              {/* 카드 */}
              <Card className="md:ml-12">
                <button
                  onClick={() =>
                    setExpandedGrade(isExpanded ? null : grade.grade)
                  }
                  className="flex w-full items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "rounded-lg p-2 text-white md:hidden",
                        grade.color
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{grade.label}</CardTitle>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm text-muted">
                          달성률 {progress}%
                        </span>
                        <Badge
                          variant={
                            progress === 100
                              ? "success"
                              : progress > 0
                              ? "warning"
                              : "default"
                          }
                        >
                          {grade.items.filter((i) => i.status === "completed")
                            .length}
                          /{grade.items.length}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted" />
                  )}
                </button>

                {/* 확장된 항목 리스트 */}
                {isExpanded && (
                  <div className="mt-4 space-y-3 border-t border-border pt-4">
                    {grade.items.map((item) => {
                      const config = statusConfig[item.status];
                      const StatusIcon = config.icon;

                      return (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-navy-50/50"
                        >
                          <StatusIcon
                            className={cn(
                              "mt-0.5 h-5 w-5 shrink-0",
                              item.status === "completed"
                                ? "text-green-accent"
                                : item.status === "in_progress"
                                ? "text-amber-400"
                                : "text-gray-300"
                            )}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p
                                className={cn(
                                  "text-sm font-medium",
                                  item.status === "completed" &&
                                    "text-muted line-through"
                                )}
                              >
                                {item.title}
                              </p>
                              <Badge variant={config.variant}>
                                {config.label}
                              </Badge>
                            </div>
                            <p className="mt-1 text-xs text-muted">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
