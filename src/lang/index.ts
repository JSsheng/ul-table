import { createI18n } from "vue-i18n"

import enLocale from "./en"

const message = {
  en: {
    ...enLocale
  }
}

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: message
})

export default i18n