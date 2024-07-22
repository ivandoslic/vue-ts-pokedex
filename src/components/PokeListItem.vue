<template>
    <div
        v-if="pokemonData"
        class="container-item"
        @click="$router.push(`/pokemon/${pokemonData.name}`)"
    >
        <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`"
        />
        <div class="description-container">
            <p class="id-label">{{ pokemonIndex }}</p>
            <p class="name-label">{{ uppercaseName }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType, ref } from 'vue';
import { type PokemonReference } from '../types/Pokemon';

export default defineComponent({
    name: 'PokeListItem',
    props: {
        pokemonData: {
            type: Object as PropType<PokemonReference>,
            reqzuired: true
        }
    },
    setup(props) {
        const pokemonIndex = ref('0' as string | undefined);
        pokemonIndex.value =
            props.pokemonData?.url.split('/')[props.pokemonData?.url.split('/').length - 2];

        const uppercaseName = computed(() => {
            if (props.pokemonData && props.pokemonData != undefined) {
                return (
                    props.pokemonData.name.charAt(0).toUpperCase() + props.pokemonData.name.slice(1)
                );
            } else {
                return '';
            }
        });

        return {
            pokemonIndex,
            uppercaseName
        };
    }
});
</script>

<style scoped>
.container-item {
    display: flex;
    width: 100%;
    min-height: 100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--app-primary-surface);
    user-select: none;
    cursor: pointer;
}

.container-item:hover {
    opacity: 0.8;
}

.container-item:active {
    opacity: 0.9;
}

.container-item:last-of-type {
    border-bottom: none;
}

.description-container {
    display: flex;
    flex-direction: column;
    width: 60%;
}

.id-label {
    color: var(--app-gray);
    font-size: 0.8rem;
    margin-bottom: 0;
}

.name-label {
    font-weight: bold;
}
</style>
