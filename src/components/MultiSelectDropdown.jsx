import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
const MultiSelectDropdown = ({ options, selectedOptions, onChange, placeholder = "Seleccionar Marcas..." }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const handleOptionToggle = (option) => {
        const newSelection = selectedOptions.includes(option)
            ? selectedOptions.filter(item => item !== option)
            : [...selectedOptions, option];
        onChange(newSelection);
    };
    const handleSelectAll = () => {
        if (selectedOptions.length === options.length) {
            onChange([]);
        } else {
            onChange(options);
        }
    };
    const displayValue = selectedOptions.length > 0
        ? `${selectedOptions.length} marca(s) seleccionada(s)`
        : placeholder;
    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full md:w-64 px-3 py-1.5 border border-gray-600 rounded-lg bg-gray-700 flex justify-between items-center text-sm">
                <span>{displayValue}</span>
                <ChevronRight className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} size={16} />
            </button>
            {isOpen && (
                <div className="absolute z-10 top-full mt-1 w-full md:w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2 border-b border-gray-600">
                        <label className="flex items-center space-x-2 px-2 py-1 text-sm hover:bg-gray-700 rounded cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedOptions.length === options.length}
                                onChange={handleSelectAll}
                                className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500"
                            />
                            <span>Seleccionar Todo</span>
                        </label>
                    </div>
                    <div className="p-1">
                        {options.map(option => (
                            <label key={option} className="flex items-center space-x-2 px-3 py-1.5 text-sm hover:bg-gray-700 rounded cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleOptionToggle(option)}
                                    className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
export default MultiSelectDropdown;
