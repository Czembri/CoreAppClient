import { Moment } from "moment";
import { LawDocumentTypeEnum } from "../enums/law-document.enum";

export interface DocumentPostInfo {
  title: string;
  content: string;
  date?: Moment;
  scale?: number;
  footer?: string;
  header?: string;
  type: string;
}

export interface DocumentType {
  translation: string;
  type: LawDocumentTypeEnum;
}
