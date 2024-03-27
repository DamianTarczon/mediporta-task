export type Collective = {
    tags: string[];
    external_links: { type: string; link: string }[];
    description: string;
    link: string;
    name: string;
    slug: string;
};

export type Tag = {
    has_synonyms: boolean;
    is_moderator_only: boolean;
    is_required: boolean;
    count: number;
    name: string;
    collectives?: Collective[]; // Optional because not all tags have this
};