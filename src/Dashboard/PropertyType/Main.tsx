import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { useContext } from "react";
import { data } from "@/data/data";
import { PropertyType } from "@/types/context";

export default function PropertyTypeComponent() {
    const { selectedType, setSelectedType, selectedDistricts, selectedProjects, setSelectedDistricts, setSelectedProjects } = useContext(MyContext);

    // Initialize filtered types with CCR, OCR, and RCR
    let filteredType: string[] = [PropertyType.CCR, PropertyType.OCR, PropertyType.RCR];
    let typeSet = new Set<string>();

    data.forEach((item: any) => {
        if (selectedDistricts.includes(item.district) || selectedProjects.includes(item.project)) {
            typeSet.add(item.marketSegment);
        }
    });

    // If selectedDistricts, selectedProjects, and selectedType are set and selectedType is not "ALL",
    // update filteredType to include all unique market segments
    console.log(typeSet);
    if (selectedDistricts.length !== 0 || selectedProjects.length !== 0) {
        filteredType = Array.from(typeSet);
    }

    const handleReset = () => {
        setSelectedType(PropertyType.ALL);
        setSelectedDistricts([]);
        setSelectedProjects([]);
    };

    // Handle button click event
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        const value = event.currentTarget.textContent || ""; // Get button text content
        const enumValue = PropertyType[value as keyof typeof PropertyType];
        
        if (enumValue) {
            if (selectedType == enumValue) {
                setSelectedType(PropertyType.ALL);
            } else {
                setSelectedType(enumValue);
            }
        } else {
            console.error(`Invalid value: ${value}`);
        }
    };
   
    return (
        <div className="flex flex-row pt-5">
            <div className="flex flex-row justify-between w-1/2 px-2">
                {filteredType.map((item: string) => (
                    <Button key={item} onClick={handleButtonClick} variant={selectedType === item ? 'default' : 'outline'}>
                        {item}
                    </Button>
                ))}
            </div>
            <div className="w-fit mx-auto">
                <Button variant="outline" onClick={handleReset}>
                    Reset
                </Button>
            </div>
        </div>
    );
}

