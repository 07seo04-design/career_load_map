import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Job Navigator - 나의 성장을 시각화한다",
  description:
    "특성화고 학생을 위한 취업 및 진로 관리 플랫폼. 로드맵, 일일 목표, 포트폴리오를 한 곳에서.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        <Sidebar />
        <main className="min-h-screen md:ml-64">
          <div className="mx-auto max-w-6xl px-4 py-6 pt-16 md:px-8 md:pt-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
