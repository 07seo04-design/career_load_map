"use client";

import { useMemo } from "react";

// 최근 20주 (약 5개월) 잔디 데이터 생성
function generateMockData() {
  const weeks = 20;
  const data: { date: string; level: number }[][] = [];

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - weeks * 7);

  // 시작일을 일요일로 맞춤
  startDate.setDate(startDate.getDate() - startDate.getDay());

  for (let w = 0; w < weeks; w++) {
    const week: { date: string; level: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + w * 7 + d);

      // 미래 날짜면 level 0
      if (currentDate > today) {
        week.push({ date: currentDate.toISOString().split("T")[0], level: 0 });
        continue;
      }

      // 랜덤으로 잔디 레벨 (0~3) 할당 - 데모용
      const rand = Math.random();
      let level = 0;
      if (rand > 0.3) level = 1;
      if (rand > 0.55) level = 2;
      if (rand > 0.8) level = 3;

      week.push({ date: currentDate.toISOString().split("T")[0], level });
    }
    data.push(week);
  }

  return data;
}

const levelColors = [
  "bg-gray-100",       // level 0: 없음
  "bg-green-200",      // level 1: 1개 달성
  "bg-green-400",      // level 2: 2개 달성
  "bg-green-accent",   // level 3: 3개 모두 달성
];

const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

export default function ContributionGraph() {
  const data = useMemo(() => generateMockData(), []);

  return (
    <div>
      <div className="flex gap-1">
        {/* 요일 라벨 */}
        <div className="mr-1 flex flex-col gap-1 pt-0">
          {dayLabels.map((label, i) => (
            <div
              key={i}
              className="flex h-3 w-6 items-center text-[10px] text-muted"
            >
              {i % 2 === 1 ? label : ""}
            </div>
          ))}
        </div>

        {/* 잔디 셀 그리드 */}
        {data.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={`${wi}-${di}`}
                className={`contribution-cell ${levelColors[day.level]}`}
                title={`${day.date}: ${day.level === 0 ? "활동 없음" : `${day.level}개 달성`}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* 범례 */}
      <div className="mt-3 flex items-center justify-end gap-1 text-xs text-muted">
        <span>Less</span>
        {levelColors.map((color, i) => (
          <div key={i} className={`contribution-cell ${color}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
