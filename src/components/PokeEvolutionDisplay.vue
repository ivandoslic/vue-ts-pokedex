<template>
    <div class="poke-evolution-container">
        <div class="poke-evolution-header">
            <span class="material-symbols-outlined"> track_changes </span>
            <p>Evolutions</p>
        </div>
        <PokeEvolutionCarousel
            v-for="evolutionChainEntry of evolutionsCollection?.entries"
            :key="evolutionChainEntry.evolutionLevel"
            :evolutionChainEntry="evolutionChainEntry"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, type Ref } from 'vue';
import { fetchEvolutions } from '../services/pokemonService';
import type { EvolutionChainResult } from '../types/Pokemon';
import PokeEvolutionCarousel from './PokeEvolutionCarousel.vue';

export default defineComponent({
    name: 'PokeEvolutionDisplay',
    props: {
        pokemonId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const evolutionsCollection: Ref<EvolutionChainResult | null> = ref(null);

        const getEvolutions = async () => {
            const evolutions = await fetchEvolutions(props.pokemonId);
            evolutionsCollection.value = evolutions;
        };

        onMounted(() => {
            getEvolutions();
        });

        return {
            evolutionsCollection
        };
    },
    components: {
        PokeEvolutionCarousel
    }
});
</script>

<style scoped>
.poke-evolution-container {
    display: flex;
    width: var(--card-width);
    padding: 15px;
    background: white;
    border-radius: 25px;
    flex-direction: column;
}

.poke-evolution-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--app-orange);
    font-size: 1.3rem;
    padding-inline: 10px;
    padding-bottom: 10px;
    margin-bottom: 5px;
    border-bottom: 3px solid var(--app-primary-surface);
}

.poke-evolution-header span {
    font-size: 2rem;
}

.poke-evolution-header p {
    margin-bottom: 0;
    font-weight: bold;
    color: var(--app-on-primary-surface);
    padding-left: 10px;
}
</style>
