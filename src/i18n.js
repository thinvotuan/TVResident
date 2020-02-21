import i18n from 'i18n-js';

import vi from './locales/vi.json';
import en from './locales/en.json';

i18n.defaultLocale = 'vi';
i18n.locale = 'vi';
i18n.fallbacks = true;
i18n.translations = { vi , en  };

export default i18n;
