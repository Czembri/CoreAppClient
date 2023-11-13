import { LawDocumentTypeEnum } from "../enums/law-document.enum";

export interface DocumentPostInfo {
  name: string;
  description: string;
  date: string;
  scale?: number;
  footer: string;
  documentType: string;
}

export interface DocumentType {
  translation: string;
  type: LawDocumentTypeEnum;
}
