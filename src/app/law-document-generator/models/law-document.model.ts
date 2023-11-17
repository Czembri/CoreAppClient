import { Moment } from "moment";
import { LawDocumentTypeEnum } from "../enums/law-document.enum";

export interface DocumentPostInfo {
  title: string;
  content: string;
  city: string;
  date?: Moment;
  scale?: number;
  footer?: string;
  header?: string;
  type: string;
  sender?: string;
  senderAddress?: string;
  recipient?: string;
  recipientAddress?: string;
}

export interface DocumentType {
  translation: string;
  type: LawDocumentTypeEnum;
}

export interface DocumentResponse {
  response: ResponseModel;
}

export interface ResponseModel {
  content: string;
  role: string;
}
