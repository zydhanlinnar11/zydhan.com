// Use type safe message keys with `next-intl`
type Messages = typeof import('./src/messages/en.ts').default
declare interface IntlMessages extends Messages {}
