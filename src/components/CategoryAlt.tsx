
import { Category as CategoryType } from "@/types";
import Link from "next/link";
import { useMemo } from "react";

interface ModifiedCategoryType extends CategoryType {
    selectedCategories: string;
    closeDialog: () => void;
}

export default function CategoryAlt({ id, name, selectedCategories, closeDialog }: ModifiedCategoryType) {
    const isSelected = useMemo(() => selectedCategories.includes(id), [selectedCategories, id]);
    const newSelectedCategories = useMemo(() => (
        selectedCategories.split(" ").length < 1 ?
        [id] :
        isSelected ? 
        [...(selectedCategories.split(" "))].filter((item) => !item.includes(id)).join(" ") :
        [...(selectedCategories.split(" ")), id].join(" ")
    ), [selectedCategories, id, isSelected]);

    return (
        <Link 
            onClick={closeDialog}
            href={`/artworks?categories=${newSelectedCategories}`} 
            className={`w-full flex items-center justify-center gap-1 whitespace-nowrap px-3 h-8 text-xs rounded-full border ${isSelected ? 'bg-gray-300 text-black' : 'border-gray-300 text-gray-600 hover:bg-black/5 hover:border-transparent'}`}
        >
            <span className="text-xs whitespace-nowrap">{name}</span>
        </Link>
    )
}