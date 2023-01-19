/**
 * Type describing Ptv language
 */
export type PtvLanguage = "fi" | "sv" | "en";

/**
 * Interface describing Ptv service location entrance data
 */
export interface PtvEntranceData {
  accessibilitySentences?: PtvAccessibilitySentence[];
  coordinates: PtvEntranceCoordinates;
}

/**
 * Interface describing Ptv service location entrance coordinates
 */
export interface PtvEntranceCoordinates {
  latitude: string;
  longitude: string;
}

/**
 * Interface describing Ptv accessibility sentence
 */
export interface PtvAccessibilitySentence {
  sentenceGroup?: PtvLocalizedValue[];
  sentences?: PtvLocalizedAccessibilitySentence[];
}

/**
 * Interface describing Ptv localized accessibility sentence
 */
export interface PtvLocalizedAccessibilitySentence {
  sentence: PtvLocalizedValue[];
}

/**
 * Interface describing Ptv localized value
 */
export interface PtvLocalizedValue {
  value: string;
  language: PtvLanguage;
}

export type SearchResultType = "page" | "post" | "attachment" | "mikkeli";