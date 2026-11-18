import type { Messages } from '../messages';

export const arVoice: Messages['preview']['voice'] = {
  play: 'تشغيل المقطع',
  stop: 'أوقف القراءة',
  loading: 'جارٍ تجهيز الصوت…',
  speaking: 'تُقرأ العيّنة الآن…',
  finished: '',
  unavailable: 'لا يتوفر صوت عربي على هذا الجهاز.',
  failed: 'تعذّر تشغيل المقطع. حاول مجددًا.',
  sample: 'أهلًا بك في وصول. قراءة أوضح، وتجربة أكثر راحة. تصفّح الويب بطريقتك.',
};
