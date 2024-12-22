
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
            className={`w-full flex items-center justify-center gap-1 whitespace-nowrap px-3 h-8 text-xs rounded-full border ${isSelected ? 'dark:border-transparent bg-gray-300 dark:bg-white/20 text-black dark:text-white/60' : 'border-gray-300 dark:border-white/10 text-gray-600 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/10 hover:border-transparent'}`}
        >
            <span className="text-xs whitespace-nowrap">{name}</span>
        </Link>
    )
}