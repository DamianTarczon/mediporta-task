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
    collectives?: Collective[];
};

export type FetchApiData = {
    has_more?: boolean;
    items: Tag[];
    page?: number;
    page_size?: number;
    quota_max?: number;
    quote_remaining?: number;
    total: number;
}