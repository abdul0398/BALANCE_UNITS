import { MyContext } from "@/context/context";
import { useContext } from "react";
import { data } from "@/data/data";
import { PropertyTypeEnum } from "@/types/context";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/styles/select";

export default function PropertyTypeEnumComponent() {
  const { selectedType, setSelectedType, selectedDistrict, selectedProject } =
    useContext(MyContext);

  // Initialize filtered types with CCR, OCR, and RCR
  let filteredType: string[] = [
    PropertyTypeEnum.CCR,
    PropertyTypeEnum.OCR,
    PropertyTypeEnum.RCR,
  ];
  let typeSet = new Set<string>();

  data.forEach((item: any) => {
    if (selectedDistrict == item.district || selectedProject == item.project) {
      typeSet.add(item.marketSegment);
    }
  });

  if (selectedDistrict !== "" || selectedProject !== "") {
    filteredType = Array.from(typeSet);
  }

  // Handle button click event
  const handleSelect = (event: any) => {
    const value = event.value;
    const enumValue = PropertyTypeEnum[value as keyof typeof PropertyTypeEnum];

    if (enumValue) {
      if (selectedType == enumValue) {
        setSelectedType(PropertyTypeEnum.ALL);
      } else {
        setSelectedType(enumValue);
      }
    } else {
      console.error(`Invalid value: ${value}`);
    }
  };

  const options = filteredType.map((item) => {
    return {
      value: item,
      label: item,
    };
  });

  return (
    <WindowedSelect
      placeholder="Select Region"
      options={options}
      value={selectedType ? { value: selectedType, label: selectedType } : null}
      windowThreshold={50}
      styles={customStyles}
      menuPortalTarget={document.querySelector("body")}
      onChange={(e: any) => handleSelect(e)}
    />
  );
}
