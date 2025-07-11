// 关于我们页面数据模块，导出 timelineData 和 honors，支持国际化
export function getTimelineData(t) {
  return [
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
  ];
}

export function getHonors(t) {
  return [
    t('about.honor1'),
    t('about.honor2'),
    t('about.honor3'),
    t('about.honor4'),
  ];
} 