export enum PropertyType {
    OCR = "OCR",
    RCR = "RCR",
    CCR = "CCR",
    ALL = "ALL",
}






export interface MyContextValue {
    selectedType: PropertyType;
    setSelectedType: React.Dispatch<React.SetStateAction<PropertyType>>;
    selectedDistricts: string[];
    setSelectedDistricts: React.Dispatch<React.SetStateAction<string[]>>;
    selectedProjects: string[];
    setSelectedProjects: React.Dispatch<React.SetStateAction<string[]>>;
}