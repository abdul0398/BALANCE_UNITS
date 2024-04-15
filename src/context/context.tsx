'use client'
import { PropertyType } from '@/types/context';
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the type for your context value
interface MyContextValue {
    selectedType: PropertyType;
    setSelectedType: Dispatch<SetStateAction<PropertyType>>;
    selectedDistricts: string[];
    setSelectedDistricts: Dispatch<SetStateAction<string[]>>;
    selectedProjects: string[];
    setSelectedProjects: Dispatch<SetStateAction<string[]>>;
}

// Create the context with the correct type
export const MyContext = createContext<MyContextValue>({
    selectedType: PropertyType.ALL,
    setSelectedType: () => {},
    selectedDistricts: [],
    setSelectedDistricts: () => {},
    selectedProjects: [],
    setSelectedProjects: () => {},
});

// Define your ContextProvider component
const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState<PropertyType>(PropertyType.ALL);

    // Provide the context value to children
    const contextValue: MyContextValue = {
        selectedType,
        setSelectedType,
        selectedDistricts,
        setSelectedDistricts,
        selectedProjects,
        setSelectedProjects,
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};

export default ContextProvider;
