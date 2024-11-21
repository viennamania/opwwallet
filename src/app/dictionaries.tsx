const dictionaries: any = {
    kr: () => import("./dictionaries/kr.json").then((module) => module.default),
    en: () => import("./dictionaries/en.json").then((module) => module.default),
    zh: () => import("./dictionaries/zh.json").then((module) => module.default),
    ja: () => import("./dictionaries/ja.json").then((module) => module.default),
    ar: () => import("./dictionaries/ar.json").then((module) => module.default),
    de: () => import("./dictionaries/de.json").then((module) => module.default),
    es: () => import("./dictionaries/es.json").then((module) => module.default),
    fr: () => import("./dictionaries/fr.json").then((module) => module.default),
};

export const getDictionary = async (locale: any) => dictionaries[locale]();