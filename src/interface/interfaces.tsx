export interface Pokemon {
    abilities: Ability[];
    description: string;
    height: number;
    id: number;
    name: string;
    stats: Stat[];
    types: Type[];
    weight: number;
};

interface Stat {
    base_stat: string;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
};

interface Type {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}