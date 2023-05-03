import { ICompanyInfo } from "./company.model";

export interface IReceipt {
    id: number;
    receiptNumber: string;
    shop: ICompanyInfo;
    total: string;
    positions: Array<IReceiptPosition>;
    paymentInfo: PaymentInfo;
    created: Date;
}

export interface IReceiptPosition {
    id: number;
    name: string;
    description: string;
    amount: string;
    vat: VATRate;
    receiptId: number;
    quantity: number;
}

export interface VATRate {
    id: number;
    name: string;
    percent: number;
}

export interface PaymentInfo {
    id: number;
    paymentType: PaymentType;
}

export enum PaymentType {
    cash,
    blik,
    card
}
