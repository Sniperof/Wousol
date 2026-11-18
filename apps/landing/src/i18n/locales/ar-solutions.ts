import type { Messages } from '../messages';

export const arSolutions: Messages['solutions'] = {
  title: 'حلول تناسب موقعك.',
  intro: 'ابدأ بالأداة، وتوسّع عبر مواقعك، وأضف دعم الخبراء عندما تحتاجه.',
  illustrations: {
    widget: 'تفضيلات الزائر',
    services: 'رؤى المواقع',
    tailored: 'مراجعة الشيفرة',
  },
  cards: [
    {
      kind: 'widget',
      title: 'أداة للزوار',
      body: 'امنح زوّارك خيارات فورية لقراءة أوضح، وتباين أريح، وصوت، وتنقّل أسهل.',
      action: 'جرّب العرض المباشر',
    },
    {
      kind: 'services',
      title: 'باقات ورؤى المواقع',
      body: 'أدِر الأداة عبر مواقعك وتابع التغطية من لوحة واحدة.',
      action: 'استكشف الأسعار',
    },
    {
      kind: 'tailored',
      title: 'دعم وتدقيق الخبراء',
      body: 'تعاون مع فريقنا لمراجعة شيفرة موقعك، ومعالجة العوائق، وتصميم حل يناسبك.',
      action: 'تحدّث معنا',
    },
  ],
};
