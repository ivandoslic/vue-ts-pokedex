<template>
    <div class="poke-carousel-container">
        <h4>{{ `Stage ${$props.evolutionChainEntry.evolutionLevel}` }}</h4>
        <div v-if="$props.evolutionChainEntry.pokemon.length === 1">
            <a :href="`/pokemon/${$props.evolutionChainEntry.pokemon[0].name}`">
                <img :src="currentImage" :alt="$props.evolutionChainEntry.pokemon[0].name" />
            </a>
            <p>{{ currentPokemon.toUpperCase() }}</p>
        </div>
        <div v-else>
            <div class="poke-carousel">
                <button @click="prev">{{ '<' }}</button>
                <div class="poke-carousel-item left">
                    <img v-if="leftImage" :src="leftImage" @click="prev" alt="leftImage" />
                </div>
                <div v-if="currentImage" class="poke-carousel-item active">
                    <a :href="`/pokemon/${currentPokemon}`">
                        <img :src="currentImage" :alt="currentPokemon" />
                    </a>
                    <p>{{ currentPokemon.toUpperCase() }}</p>
                </div>
                <div class="poke-carousel-item right">
                    <img v-if="rightImage" :src="rightImage" @click="next" alt="rightImage" />
                </div>
                <button @click="next">{{ '>' }}</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type PropType } from 'vue';
import { type EvolutionChainEntry } from '../types/Pokemon';

export default defineComponent({
    name: 'PokeEvolutionCarousel',
    props: {
        evolutionChainEntry: {
            type: Object as PropType<EvolutionChainEntry>,
            required: true
        }
    },
    setup(props) {
        const currentIndex = ref(0);

        const currentPokemonIndex = computed(() => {
            const tempLength =
                props.evolutionChainEntry.pokemon[currentIndex.value].url.split('/').length;
            return props.evolutionChainEntry.pokemon[currentIndex.value].url.split('/')[
                tempLength - 2
            ];
        });

        const currentImage = computed(
            () =>
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemonIndex.value}.png`
        );

        const currentPokemon = computed(
            () => props.evolutionChainEntry.pokemon[currentIndex.value].name
        );

        const leftImage = computed(() => {
            const tmpIdx =
                (currentIndex.value - 1 + props.evolutionChainEntry.pokemon.length) %
                props.evolutionChainEntry.pokemon.length;
            const tempLength = props.evolutionChainEntry.pokemon[tmpIdx].url.split('/').length;
            const id = props.evolutionChainEntry.pokemon[tmpIdx].url.split('/')[tempLength - 2];

            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        });

        const rightImage = computed(() => {
            const tmpIdx = (currentIndex.value + 1) % props.evolutionChainEntry.pokemon.length;
            const tempLength = props.evolutionChainEntry.pokemon[tmpIdx].url.split('/').length;
            const id = props.evolutionChainEntry.pokemon[tmpIdx].url.split('/')[tempLength - 2];

            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        });

        const next = () => {
            currentIndex.value =
                (currentIndex.value + 1) % props.evolutionChainEntry.pokemon.length;
        };

        const prev = () => {
            currentIndex.value =
                (currentIndex.value - 1 + props.evolutionChainEntry.pokemon.length) %
                props.evolutionChainEntry.pokemon.length;
        };

        return {
            currentIndex,
            currentImage,
            currentPokemon,
            leftImage,
            rightImage,
            next,
            prev
        };
    }
});
</script>

<style scoped>
.poke-carousel-container {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: fit-content;
}

.poke-carousel-container h4 {
    width: 100%;
    text-align: start;
    margin-bottom: 5px;
    font-weight: bold;
}

.poke-carousel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.poke-carousel-item {
    flex: 1;
    min-width: 96px;
    min-height: 96px;
    transition:
        transform 0.5s ease,
        opacity 0.5s ease;
}

.center {
    opacity: 1;
    scale: 1;
}

.left,
.right {
    opacity: 0.8;
    scale: 0.8;
    cursor: pointer;
}

.poke-carousel button {
    background-color: #f0f0f0;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin: 0 10px;
}

.poke-carousel-container p {
    font-weight: bold;
    text-align: center;
}
</style>
