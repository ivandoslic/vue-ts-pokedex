<template>
    <div class="poke-stats-container">
        <div class="poke-stats-header">
            <span class="material-symbols-outlined"> equalizer </span>
            <p>Base Stats</p>
        </div>
        <div>
            <StatBarInfo v-for="(stat, index) in $props.statsData" :key="index" :stat="stat" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { type PokemonStat } from '../types/lokshunhung/pokeapi-types/pokemon';
import StatBarInfo from './StatInfoBar.vue';

export default defineComponent({
    name: 'PokemonStats',
    props: {
        statsData: {
            type: Object as PropType<PokemonStat[]>,
            required: true
        }
    },
    components: {
        StatBarInfo
    }
});
</script>

<style scoped>
.poke-stats-container {
    display: flex;
    width: var(--card-width);
    padding: 15px;
    background: white;
    border-radius: 25px;
    flex-direction: column;
    height: fit-content;
}

.poke-stats-header {
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

.poke-stats-header span {
    font-size: 2rem;
    transform: rotate(90deg);
}

.poke-stats-header p {
    margin-bottom: 0;
    font-weight: bold;
    color: var(--app-on-primary-surface);
    padding-left: 10px;
}
</style>
