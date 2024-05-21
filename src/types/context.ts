export enum PropertyTypeEnum {
    OCR = "OCR",
    RCR = "RCR",
    CCR = "CCR",
    ALL = "ALL",
}






export interface MyContextValue {
    selectedType: PropertyTypeEnum;
    setSelectedType: React.Dispatch<React.SetStateAction<PropertyTypeEnum>>;
    selectedDistricts: string[];
    setSelectedDistricts: React.Dispatch<React.SetStateAction<string[]>>;
    selectedProjects: string[];
    setSelectedProjects: React.Dispatch<React.SetStateAction<string[]>>;
}