

export interface Social {
    id: string;
    platform: "Email" | "Instagram" | "Twitter" | "LinkedIn" | "Behance" | "Facebook" | "Other"
    url_link: string;
}

export interface Category {
    id: string;
    name: string;
};

export interface ArtworkImage {
    id: string;
    image: {
        publicUrl: string;
    }
};

export interface About {
    id: string;
    title: string;
    text: string;
};

export interface IntroText {
    id: string;
    content: string;
    highlitedWordsInContent: string;
}

export interface Artwork {
    id: string;
    title: string;
    desc?: string;
    categories: Category[];
    images: ArtworkImage[];
    name?: string;
    role?: string;
    platform?: string;
    url_link?: string;
    createdAt?: string;
    highlightArtWork?: boolean;
}

export type QueryResult = {
    artworks: Artwork[];
    artwork: Artwork;
    categories: Category[];
    abouts: About[];
    socials: Social[];
    profilePicture: ArtworkImage;
    introTexts: IntroText[];
    artworksCount: number;
    categoriesCount: number;
    aboutsCount: number;
    socialsCount: number;
}