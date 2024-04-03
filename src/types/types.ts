export type Collective = {
    tags: string[];
    externalLinks: { type: string; link: string }[];
    description: string;
    link: string;
    name: string;
    slug: string;
};

export type Tag = {
    hasSynonyms: boolean;
    isModeratorOnly: boolean;
    isRequired: boolean;
    count: number;
    name: string;
    collectives?: Collective[];
};

export type FetchApiData = {
    hasMore?: boolean;
    items: Tag[];
    page?: number;
    pageSize?: number;
    quotaMax?: number;
    quoteRemaining?: number;
    total: number;
}