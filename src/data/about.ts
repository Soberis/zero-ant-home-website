// 关于我们页面数据模块，导出 timelineData 和 honors，支持国际化

/**
 * 时间线事件接口
 */
export interface TimelineEvent {
  year: string;
  events: string[];
}

type TranslationFunction = (key: string) => string;

/**
 * 获取时间线数据
 */
export function getTimelineData(t: TranslationFunction): TimelineEvent[] {
  return [
    {
      year: "2017",
      events: [t("about.timeline.2017")],
    },
    {
      year: "2020",
      events: [t("about.timeline.2020")],
    },
    {
      year: "2022",
      events: [t("about.timeline.2022")],
    },
    {
      year: "2023",
      events: [t("about.timeline.2023")],
    },
    {
      year: "2024",
      events: [t("about.timeline.2024")],
    },
    {
      year: "2025",
      events: [t("about.timeline.2025")],
    },
  ];
}

/**
 * 获取荣誉列表
 */
export function getHonors(t: TranslationFunction): string[] {
  return [
    t("about.honor1"),
    t("about.honor2"),
    t("about.honor3"),
    t("about.honor4"),
    t("about.honor5"),
    t("about.honor6"),
  ];
}
