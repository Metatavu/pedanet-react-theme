import LocalizedStrings, { LocalizedStringsMethods } from "localized-strings";

export interface IStrings extends LocalizedStringsMethods {
  currentNews: string,
  currentNewsSlug: string,
  donate: string,
  sponsors: string,
  error: string,
  moreCurrentNews: string,
  morePlus: string,
  pageNotFound: string,
  searchSite: string,
  somethingWentWrong: string,
  whoops: string
}

const strings: IStrings = new LocalizedStrings({
  en: require("./en.json"),
  fi: require("./fi.json")
});

export default strings;