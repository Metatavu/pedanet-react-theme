/**
 * Type describing Ptv language
 */
type PtvLanguage = "fi" | "sv" | "en";

/**
 * Interface describing Ptv service location entrance data
 */
interface PtvEntranceData {
  accessibilitySentences?: PtvAccessibilitySentence[];
  coordinates: PtvEntranceCoordinates;
}

/**
 * Interface describing Ptv service location entrance coordinates
 */
interface PtvEntranceCoordinates {
  latitude: string;
  longitude: string;
}

/**
 * Interface describing Ptv accessibility sentence
 */
interface PtvAccessibilitySentence {
  sentenceGroup?: PtvLocalizedValue[];
  sentences?: PtvLocalizedAccessibilitySentence[];
}

/**
 * Interface describing Ptv localized accessibility sentence
 */
interface PtvLocalizedAccessibilitySentence {
  sentence: PtvLocalizedValue[];
}

/**
 * Interface describing Ptv localized value
 */
interface PtvLocalizedValue {
  value: string;
  language: PtvLanguage;
}

type SearchResultType = "page" | "post" | "attachment" | "oppiminen";