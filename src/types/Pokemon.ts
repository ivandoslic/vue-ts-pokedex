export interface PokemonReference {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonReference[];
}

export interface EvolutionChainEntry {
    evolutionLevel: number;
    pokemon: PokemonReference[];
}

export interface EvolutionChainResult {
    depth: number;
    entries: EvolutionChainEntry[];
}
