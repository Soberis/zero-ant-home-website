// 关于我们页面数据模块，导出 timelineData 和 honors，支持国际化

/**
 * 时间线事件接口
 */
export interface TimelineEvent {
  year: string;
  events: string[];
}

/**
 * 团队信息接口
 */
export interface TeamInfo {
  size: number;
  masterRatio: string;
  avgAge: number;
  background: string;
}

/**
 * 核心团队成员接口
 */
export interface CoreTeamMember {
  name: string;
  position: string;
  background: string;
}

/**
 * 国际化函数类型
 */
type TranslationFunction = (key: string) => string;

/**
 * 获取时间线数据
 */
export function getTimelineData(t: TranslationFunction): TimelineEvent[] {
  return [
    {
      year: '2017',
      events: [t('about.timeline.2017')],
    },
    {
      year: '2020',
      events: [t('about.timeline.2020')],
    },
    {
      year: '2022',
      events: [t('about.timeline.2022')],
    },
    {
      year: '2024',
      events: [t('about.timeline.2024')],
    },
    {
      year: '2025',
      events: [t('about.timeline.2025')],
    },
  ];
}

/**
 * 获取荣誉列表
 */
export function getHonors(t: TranslationFunction): string[] {
  return [
    t('about.honor1'),
    t('about.honor2'),
    t('about.honor3'),
    t('about.honor4'),
    t('about.honor5'),
    t('about.honor6'),
    t('about.honor7'),
    t('about.honor8'),
  ];
}

/**
 * 获取团队信息
 */
export function getTeamInfo(): TeamInfo {
  return {
    size: 18,
    masterRatio: '94%',
    avgAge: 30,
    background: '90%双一流高校背景'
  };
}

/**
 * 获取核心团队信息
 */
export function getCoreTeam(t: TranslationFunction): CoreTeamMember[] {
  return [
    {
      name: t('about.team.ceo.name'),
      position: t('about.team.ceo.position'),
      background: t('about.team.ceo.background')
    },
    {
      name: t('about.team.cto.name'),
      position: t('about.team.cto.position'),
      background: t('about.team.cto.background')
    },
    {
      name: t('about.team.productDirector.name'),
      position: t('about.team.productDirector.position'),
      background: t('about.team.productDirector.background')
    },
    {
      name: t('about.team.operationDirector.name'),
      position: t('about.team.operationDirector.position'),
      background: t('about.team.operationDirector.background')
    }
  ];
}