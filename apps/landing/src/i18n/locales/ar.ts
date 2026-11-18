import type { Messages } from '../messages';
import { arBenefits, arSign, arVisit } from './ar-sections';
import { arDashboard, arInstallation } from './ar-how';
import { arVoice } from './ar-voice';

export const ar: Messages = {
  languageName: 'العربية',
  siteName: 'وصول',
  skipToContent: 'الانتقال إلى المحتوى',
  nav: {
    menu: 'القائمة',
    features: 'الميزات',
    signLanguage: 'لغة الإشارة',
    installation: 'كيف يعمل',
    dashboard: 'لوحة التحكم',
    liveDemo: 'التجربة الحيّة',
    demo: 'تجربة وصول الآن',
    contact: 'تواصل معنا',
    label: 'التنقل الرئيسي',
  },
  meta: {
    title: 'وصول | أداة إمكانية الوصول للمواقع، مع لغة الإشارة',
    description:
      'وصول أداة إمكانية الوصول والنفاذ الرقمي للمواقع والخدمات الإلكترونية: ضبط النص والألوان والصوت والتنقّل، ومترجم لغة إشارة عبر MetaSign.',
  },
  hero: {
    title: 'مع وصول، الموقع أقرب إلى الجميع',
    lede: 'وصول أداة متخصصة في إمكانية الوصول الرقمي، تجعل المواقع والخدمات الإلكترونية أسهل استخدامًا للجميع، ومنهم الأشخاص ذوو الإعاقة وكبار السن. ولأن ما يناسب زائرًا قد لا يناسب آخر، تترك لكل زائر ضبط النص والألوان والصوت والتنقّل، والتواصل مع مترجم لغة إشارة. وتستند ميزاتها إلى حاجات تصفها إرشادات WCAG 2.2.',
  },
  preview: {
    textSize: 'تكبير النص',
    textSizeHint: 'حجم النص التالي: {next}.',
    title: 'صفحة تناسبك.',
    body: 'نص أكبر وتباعد أوسع لقراءة مريحة',
    label: 'معاينة لميزات وصول: تكبير النص، والقراءة الصوتية، ومكالمة بلغة الإشارة',
    voice: arVoice,
    signTitle: 'مكالمة مباشرة',
    signBody: 'مترجم لغة إشارة عبر MetaSign',
  },
  visit: arVisit,
  sign: arSign,
  benefits: arBenefits,
  installation: arInstallation,
  dashboard: arDashboard,
  final: {
    title: 'تبدأ الرحلة مع وصول من هنا',
    body: 'يتعرّف فريق وصول على حاجات الجهة ومواقعها، ويردّ خلال يوم عمل واحد.',
    email: 'البريد الإلكتروني:',
    subject: 'طلب تواصل بخصوص وصول',
  },
  footer: {
    about: 'وصول · أداة إمكانية الوصول للمواقع، مع لغة الإشارة عبر MetaSign.',
    navLabel: 'روابط التذييل',
    badge: 'بلا تتبّع ولا ملفات تعريف ارتباط',
    note: 'وصول أداة تفضيلات للزوّار، ولا يجعل الموقع متوافقًا مع قانون أو معيار بمفرده.',
    byline: 'وصول من MetaSign',
    copyright: '© 2026 وصول',
  },
};
