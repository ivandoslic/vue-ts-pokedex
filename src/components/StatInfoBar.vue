<template>
    <div class="stat-bar-container">
        <p>{{ statLabel }}</p>
        <div class="stat-bar-bar-container">
            <div
                class="stat-bar-bar-indicator"
                :style="{
                    width: ($props.stat.base_stat / 255) * 100 + '%'
                }"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue';
import { type PokemonStat } from '../types/lokshunhung/pokeapi-types/pokemon';

export default defineComponent({
    name: 'StatInfoBar',
    props: {
        stat: {
            type: Object as PropType<PokemonStat>,
            required: true
        }
    },
    setup(props) {
        const statLabel = computed(
            () => props.stat.stat.name.toUpperCase() + ': ' + props.stat.base_stat
        );

        return {
            statLabel
        };
    }
});
</script>

<style scoped>
.stat-bar-container {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}

.stat-bar-container p {
    flex: 1;
}

.stat-bar-bar-container {
    background-color: var(--app-primary-surface);
    flex: 1.5;
    height: 15px;
    border-radius: 25px;
}

.stat-bar-bar-indicator {
    height: 100%;
    background-color: var(--app-orange);
    border-radius: 25px;
    width: 0;
    transition-duration: 500ms;
}
</style>
