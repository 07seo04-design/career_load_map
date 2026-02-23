"use client";

import {
  Map,
  Target,
  FolderOpen,
  CalendarDays,
  TrendingUp,
  Flame,
  Clock,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import ContributionGraph from "@/components/dashboard/ContributionGraph";

// 데모 데이터 (Supabase 연동 전)
const MOCK_STATS = {
  roadmapProgress: 45,
  todayGoals: { completed: 1, total: 3 },
  totalProjects: 7,
  streak: 12,
};

const MOCK_RECENT_ACTIVITIES = [
  { id: 1, text: "Daily Quest 3개 모두 완료!", date: "오늘", type: "quest" as const },
  { id: 2, text: "프로젝트 '포트폴리오 사이트' 추가", date: "어제", type: "project" as const },
  { id: 3, text: "로드맵 '정보처리기능사 취득' 완료", date: "2일 전", type: "roadmap" as const },
  { id: 4, text: "Daily Quest 2개 완료", date: "3일 전", type: "quest" as const },
];

const MOCK_DDAYS = [
  { id: 1, label: "취업 박람회", dday: 30 },
  { id: 2, label: "정보처리기능사 실기", dday: 45 },
  { id: 3, label: "교내 프로젝트 발표", dday: 12 },
];

const activityTypeIcon = {
  quest: Target,
  project: FolderOpen,
  roadmap: Map,
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          나의 성장 현황을 한눈에 확인하세요.
        </p>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Map className="h-5 w-5" />}
          label="로드맵 달성률"
          value={`${MOCK_STATS.roadmapProgress}%`}
          color="bg-navy-600"
        />
        <StatCard
          icon={<Target className="h-5 w-5" />}
          label="오늘의 Quest"
          value={`${MOCK_STATS.todayGoals.completed}/${MOCK_STATS.todayGoals.total}`}
          color="bg-green-accent"
        />
        <StatCard
          icon={<FolderOpen className="h-5 w-5" />}
          label="총 프로젝트"
          value={`${MOCK_STATS.totalProjects}개`}
          color="bg-blue-500"
        />
        <StatCard
          icon={<Flame className="h-5 w-5" />}
          label="연속 달성"
          value={`${MOCK_STATS.streak}일`}
          color="bg-orange-500"
        />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 잔디 심기 그래프 (2칸) */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-green-accent" />
                <CardTitle>성실도 그래프</CardTitle>
              </div>
            </CardHeader>
            <ContributionGraph />
          </Card>
        </div>

        {/* D-Day 카운터 (1칸) */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-navy-500" />
              <CardTitle>D-Day</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-4">
            {MOCK_DDAYS.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
              >
                <span className="text-sm font-medium">{item.label}</span>
                <Badge variant={item.dday <= 14 ? "warning" : "info"}>
                  D-{item.dday}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 하단 영역 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 로드맵 진행률 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-navy-500" />
              <CardTitle>로드맵 진행률</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-4">
            <ProgressBar value={80} label="1학년 목표" barColor="bg-green-accent" />
            <ProgressBar value={45} label="2학년 목표" barColor="bg-navy-500" />
            <ProgressBar value={10} label="3학년 목표" barColor="bg-navy-300" />
          </div>
        </Card>

        {/* 최근 활동 */}
        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {MOCK_RECENT_ACTIVITIES.map((activity) => {
              const Icon = activityTypeIcon[activity.type];
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-lg border border-border px-4 py-3"
                >
                  <div className="mt-0.5 rounded-md bg-navy-50 p-1.5">
                    <Icon className="h-4 w-4 text-navy-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted">{activity.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`rounded-lg p-3 text-white ${color}`}>{icon}</div>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </Card>
  );
}
