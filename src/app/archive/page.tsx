"use client";

import { useState } from "react";
import {
  FolderOpen,
  Plus,
  ExternalLink,
  Github,
  Search,
  LayoutGrid,
  List,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string | null;
  linkUrl: string | null;
  createdAt: string;
}

// 데모 데이터
const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "개인 포트폴리오 웹사이트",
    description:
      "Next.js와 Tailwind CSS를 활용하여 제작한 반응형 포트폴리오 웹사이트입니다. 프로젝트 소개, 기술 스택, 연락처 페이지를 포함합니다.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageUrl: null,
    linkUrl: "https://github.com",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: "할 일 관리 앱 (Todo App)",
    description:
      "React로 제작한 첫 번째 CRUD 프로젝트입니다. 할 일 추가, 삭제, 완료 처리, 필터링 기능을 구현했습니다.",
    techStack: ["React", "JavaScript", "CSS"],
    imageUrl: null,
    linkUrl: null,
    createdAt: "2024-11-20",
  },
  {
    id: "3",
    title: "정보처리기능사 공부 정리",
    description:
      "정보처리기능사 필기 시험을 준비하며 정리한 학습 노트와 기출문제 풀이를 정리한 아카이브입니다.",
    techStack: ["정보처리기능사", "자격증"],
    imageUrl: null,
    linkUrl: null,
    createdAt: "2025-02-01",
  },
  {
    id: "4",
    title: "학교 급식 알림 챗봇",
    description:
      "Python과 Discord API를 활용하여 만든 학교 급식 알림 디스코드 챗봇입니다. 매일 오전 자동으로 급식 메뉴를 알려줍니다.",
    techStack: ["Python", "Discord.py", "나이스 API"],
    imageUrl: null,
    linkUrl: "https://github.com",
    createdAt: "2024-09-10",
  },
  {
    id: "5",
    title: "HTML/CSS 수업 결과물",
    description:
      "1학년 웹 프로그래밍 수업에서 제작한 결과물입니다. 기본 레이아웃, Flexbox, Grid 등을 활용한 페이지를 만들었습니다.",
    techStack: ["HTML", "CSS"],
    imageUrl: null,
    linkUrl: null,
    createdAt: "2024-06-15",
  },
  {
    id: "6",
    title: "교내 해커톤 - 출석 체크 앱",
    description:
      "교내 해커톤에서 팀 프로젝트로 개발한 QR 기반 출석 체크 앱입니다. 프론트엔드 파트를 담당했습니다.",
    techStack: ["React", "Node.js", "QR Code"],
    imageUrl: null,
    linkUrl: "https://github.com",
    createdAt: "2025-01-28",
  },
];

const ALL_TAGS = Array.from(
  new Set(MOCK_PROJECTS.flatMap((p) => p.techStack))
).sort();

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = MOCK_PROJECTS.filter((project) => {
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag =
      !selectedTag || project.techStack.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Archive & Project
          </h1>
          <p className="mt-1 text-sm text-muted">
            나의 학습 기록과 프로젝트를 정리하세요.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-navy-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-700">
          <Plus className="h-4 w-4" />
          프로젝트 추가
        </button>
      </div>

      {/* 검색 및 필터 */}
      <Card>
        <div className="space-y-4">
          {/* 검색 바 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="프로젝트 검색..."
              className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-muted focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
            />
          </div>

          {/* 태그 필터 + 뷰 모드 */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  !selectedTag
                    ? "bg-navy-600 text-white"
                    : "bg-navy-50 text-navy-600 hover:bg-navy-100"
                )}
              >
                전체
              </button>
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    selectedTag === tag
                      ? "bg-navy-600 text-white"
                      : "bg-navy-50 text-navy-600 hover:bg-navy-100"
                  )}
                >
                  #{tag}
                </button>
              ))}
            </div>
            <div className="flex gap-1 rounded-lg border border-border p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "rounded-md p-1.5 transition-colors",
                  viewMode === "grid" ? "bg-navy-600 text-white" : "text-muted"
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "rounded-md p-1.5 transition-colors",
                  viewMode === "list" ? "bg-navy-600 text-white" : "text-muted"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* 프로젝트 카드 그리드 / 리스트 */}
      {filteredProjects.length === 0 ? (
        <Card className="py-12 text-center">
          <FolderOpen className="mx-auto h-12 w-12 text-muted" />
          <p className="mt-2 text-sm text-muted">
            검색 결과가 없습니다.
          </p>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      {/* 이미지 placeholder */}
      <div className="mb-4 flex h-36 items-center justify-center rounded-lg bg-gradient-to-br from-navy-100 to-navy-200">
        <FolderOpen className="h-10 w-10 text-navy-400" />
      </div>

      {/* 내용 */}
      <div className="flex flex-1 flex-col">
        <h3 className="text-sm font-semibold">{project.title}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-xs text-muted">
          {project.description}
        </p>

        {/* 태그 */}
        <div className="mt-3 flex flex-wrap gap-1">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="default">
              #{tech}
            </Badge>
          ))}
        </div>

        {/* 하단 (날짜, 링크) */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted">{project.createdAt}</span>
          {project.linkUrl && (
            <a
              href={project.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-navy-600 hover:text-navy-800"
            >
              <Github className="h-3.5 w-3.5" />
              Link
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

function ProjectListItem({ project }: { project: Project }) {
  return (
    <Card className="flex items-start gap-4 transition-shadow hover:shadow-md">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-navy-100 to-navy-200">
        <FolderOpen className="h-7 w-7 text-navy-400" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-semibold">{project.title}</h3>
          {project.linkUrl && (
            <a
              href={project.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-navy-600 hover:text-navy-800"
            >
              <Github className="h-3.5 w-3.5" />
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
        <p className="mt-1 line-clamp-1 text-xs text-muted">
          {project.description}
        </p>
        <div className="mt-2 flex items-center gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="default">
              #{tech}
            </Badge>
          ))}
          <span className="ml-auto text-xs text-muted">{project.createdAt}</span>
        </div>
      </div>
    </Card>
  );
}
