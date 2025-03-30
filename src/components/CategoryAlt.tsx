
import { Category as CategoryType } from "@/types";
import Link from "next/link";
import { useMemo } from "react";

interface ModifiedCategoryType extends CategoryType {
    selectedCategories: string;
    closeDialog: () => void;
}

export default function CategoryAlt({ _id, name, selectedCategories, closeDialog }: ModifiedCategoryType) {
    const isSelected = useMemo(() => selectedCategories.includes(_id), [selectedCategories, _id]);
    const newSelectedCategories = useMemo(() => (
        selectedCategories.split(" ").length < 1 ?
        [_id] :
        isSelected ? 
        [...(selectedCategories.split(" "))].filter((item) => !item.includes(_id)).join(" ") :
        [...(selectedCategories.split(" ")), _id].join(" ")
    ), [selectedCategories, _id, isSelected]);

    return (
        <Link 
            onClick={closeDialog}
            href={`/artworks?categories=${newSelectedCategories}`} 
            className={`w-full flex items-center justify-center gap-1 whitespace-nowrap px-3 h-8 text-xs rounded-full border ${isSelected ? 'dark:border-transparent bg-gray-300/50 dark:bg-white/20 text-black dark:text-white/60' : 'border-gray-300 dark:border-white/10 text-gray-600 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/10 hover:border-transparent'}`}
        >
            <span className="text-xs whitespace-nowrap">{name}</span>
        </Link>
    )
}