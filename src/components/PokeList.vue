<template>
    <div ref="scrollContainer" class="container">
        <input
            class="sidebar-header-input"
            type="text"
            placeholder="Search Pokémon"
            v-model="searchText"
        />
        <div class="scrollable-div" v-if="searchResultList">
            <PokeListItem
                v-for="pokeRef in searchResultList"
                :key="pokeRef.name"
                :pokemonData="pokeRef"
            />
        </div>
        <div class="scrollable-div" v-else>
            <PokeListItem v-for="pokeRef in pokeList" :key="pokeRef.name" :pokemonData="pokeRef" />
            <div ref="bottomObserver" class="observer"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, type Ref, watch } from 'vue';
import PokeListItem from './PokeListItem.vue';
import { fetchPokemonList, searchFor } from '../services/pokemonService';
import { type PokemonReference, type PokemonListResponse } from '../types/Pokemon';

export default defineComponent({
    name: 'PokeList',
    components: {
        PokeListItem
    },
    emits: ['updatePokemonNumber'],
    setup(props, mx) {
        const limit = 100;
        const offset = ref(0);
        const pokeList = ref<PokemonReference[]>([]);
        const next = ref<string | null>(null);
        const previous = ref<string | null>(null);
        const noOfPokemon: Ref<number | string> = ref(0);
        const bottomObserver: Ref<Element | null> = ref(null);
        const scrollContainer = ref(null);

        const searchText = ref('');
        const searchResultList: Ref<PokemonReference[] | null> = ref(null);

        const loadPokemon = async (currentOffset: number) => {
            try {
                const data: PokemonListResponse = await fetchPokemonList(limit, currentOffset);
                if (pokeList.value.length == 0) pokeList.value = data.results;
                else pokeList.value.push(...data.results);
                next.value = data.next;
                previous.value = data.previous;
                offset.value = currentOffset;
                noOfPokemon.value = data.count;
            } catch (error) {
                console.error('Error fetching Pokemon:', JSON.stringify(error));
            }
        };

        const fetchNext = () => {
            if (next.value) {
                const url = new URL(next.value);
                const newOffset = parseInt(url.searchParams.get('offset') || '0');
                loadPokemon(newOffset);
            }
        };

        const fetchPrevious = () => {
            if (previous.value) {
                const url = new URL(previous.value);
                const newOffset = parseInt(url.searchParams.get('offset') || '0');
                loadPokemon(newOffset);
            }
        };

        const searchPokemon = async (input: string) => {
            const data = await searchFor(input);
            searchResultList.value = data;
        };

        const createObserver = () => {
            const options = {
                root: scrollContainer.value,
                rootMargin: '0px',
                threshold: 1.0
            };

            const observer = new IntersectionObserver(async (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    if (next.value) {
                        const url = new URL(next.value);
                        const newOffset = parseInt(url.searchParams.get('offset') || '0');
                        await loadPokemon(newOffset);
                    }
                }
            }, options);

            if (bottomObserver.value) observer.observe(bottomObserver.value);
        };

        onMounted(() => {
            loadPokemon(offset.value).then(() => {
                mx.emit('updatePokemonNumber', noOfPokemon.value);
                createObserver();
                watch(searchText, () => {
                    searchPokemon(searchText.value);
                });
            });
        });

        return {
            pokeList,
            searchResultList,
            searchText,
            searchPokemon,
            fetchNext,
            fetchPrevious,
            next,
            previous,
            scrollContainer,
            bottomObserver
        };
    }
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

.scrollable-div {
    overflow-y: auto;
}

.sidebar-header-input {
    background: var(--app-primary-surface);
    border: none;
    border-radius: 2px;
    box-shadow: none;
    width: 95%;
    margin-bottom: 10px;
    padding: 2%;
    padding-inline: 4%;
    border-bottom: 2px solid var(--app-primary-surface);
}

.sidebar-header-input:focus {
    outline: none;
}
</style>
