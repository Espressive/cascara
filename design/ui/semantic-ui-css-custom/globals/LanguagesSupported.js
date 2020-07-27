'use strict';

import {i18Locales}   from 'esp-util-intl';

/* All languages declared here will show up in any LanguageSelect component. */
/* For these languages to work, translation languages must also be added to  */
/* POEditor and workflows/card templates                                     */

/* NOTE: The first language in this array will automatically populate as the */
/* default selection in a LanguageSelect component.                          */

const LanguagesSupported = [
  {
    key   : 'en',
    value : i18Locales.en_us,
    text  : 'English (default)',
    flag  : 'us',
  },
  {
    key   : 'es',
    value : i18Locales.es_mx,
    text  : 'Spanish (Mexico)',
    flag  : 'mx',
  },
  {
    key   : 'fr',
    value : i18Locales.fr,
    text  : 'French',
    flag  : 'fr',
  },
];

export default LanguagesSupported;
