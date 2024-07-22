import axios from 'axios';
import {
    type EvolutionChainResult,
    type PokemonListResponse,
    type PokemonReference
} from '../types/Pokemon';
import { type PokemonSpecies, type Pokemon } from '../types/lokshunhung/pokeapi-types/pokemon';
import { type ChainLink, type EvolutionChain } from '../types/lokshunhung/pokeapi-types/evolution';

const API_URL = 'https://pokeapi.co/api/v2/';

// TODO: Implement the LRU usage of local storage so that we don't exceed the memory limit

export const fetchPokemonList = async (
    limit: number,
    offset: number
): Promise<PokemonListResponse> => {
    const cacheKey = `pokemonList-${limit}-${offset}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        return JSON.parse(cachedData);
    }

    const response = await axios.get<PokemonListResponse>(
        `${API_URL}pokemon?limit=${limit}&offset=${offset}`
    );

    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    return response.data;
};

export const fetchPokemonData = async (name: string): Promise<Pokemon> => {
    const cacheKey = `pokemon-${name}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        return JSON.parse(cachedData);
    }

    const response = await axios.get<Pokemon>(`${API_URL}pokemon/${name}`);

    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    return response.data;
};

export const fetchEvolutions = async (pokemonId: number): Promise<EvolutionChainResult> => {
    const speciesResponse = await axios.get<PokemonSpecies>(
        `${API_URL}pokemon-species/${pokemonId}`
    );
    const evolutionChainURL = speciesResponse.data.evolution_chain.url;

    const evolutionChainResponse = await axios.get<EvolutionChain>(evolutionChainURL);
    const evolutionChain = evolutionChainResponse.data.chain;

    const result: EvolutionChainResult = {
        depth: 0,
        entries: []
    };

    recComputeChainLink(0, evolutionChain, result);

    return result;
};

const recComputeChainLink = (
    currentLevel: number,
    evolutionChain: ChainLink,
    evolutionChainResult: EvolutionChainResult
): void => {
    if (currentLevel + 1 > evolutionChainResult.depth)
        evolutionChainResult.depth = currentLevel + 1;

    if (evolutionChainResult.entries[currentLevel] === undefined) {
        evolutionChainResult.entries[currentLevel] = {
            evolutionLevel: currentLevel,
            pokemon: []
        };
    }

    evolutionChainResult.entries[currentLevel].evolutionLevel = currentLevel;
    evolutionChainResult.entries[currentLevel].pokemon.push({
        name: evolutionChain.species.name,
        url: evolutionChain.species.url
    });
    if (evolutionChain.evolves_to.length > 0) {
        for (const newChainLink of evolutionChain.evolves_to) {
            recComputeChainLink(currentLevel + 1, newChainLink, evolutionChainResult);
        }
    }
};

export const searchFor = async (searchText: string): Promise<PokemonReference[]> => {
    const cacheKey = 'all-pokemon';
    let cachedData = localStorage.getItem('all-pokemon');

    if (!cachedData) {
        const response = await axios.get<PokemonListResponse>(
            `${API_URL}pokemon?limit=100000&offset=0`
        );
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
    }

    cachedData = localStorage.getItem('all-pokemon');
    let list: PokemonListResponse;
    if (cachedData) {
        list = JSON.parse(cachedData);
        return list.results.filter((pokeRef) =>
            pokeRef.name.startsWith(searchText.toLocaleLowerCase())
        );
    }

    return [];
};
