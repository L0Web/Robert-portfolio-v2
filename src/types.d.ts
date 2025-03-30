

export interface ProfilePicture {
    _id: string;
    image: { 
        _id: string;
        publicUrl: string;
    }
}

export interface Social {
    _id: string;
    platform: "Email" | "Instagram" | "Twitter" | "LinkedIn" | "Behance" | "Facebook" | "Other";
    url_link: string;
}

export interface Category {
    _id: string;
    name: string;
};

export interface ArtworkImage {
    _id: string;
    image: {
        _id: string;
        publicUrl: string;
    }
};

export interface About {
    _id: string;
    title: string;
    text: string;
};

export interface IntroText {
    _id: string;
    content: string;
    highlitedWordsInContent: string;
}

export interface Artwork {
    _id: string;
    title: string;
    desc?: string;
    categories: Category[] & string[];
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
    profilePicture: ProfilePicture;
    introText: IntroText;
    limit: number;
    page: number;
    total: number;
    filter: {
        category: string[];
    }
}