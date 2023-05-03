export interface ICompanyInfo {
    id: number;
    companyName: string;
    companyType: CompanyType;
    address: string;
    city: string;
    postalCode: string;
    nip: string;
    created: Date;
}

export enum CompanyType {
    Individual = 1,
    Cooperative,
    CivilianCompany,
    OvertCompany,
    PartnerCompany,
    LimitedPartnershipCompany,
    LimitedJSPartnershipCompany,
    StockCompany,
    LimitedLiabilityCompany
}
