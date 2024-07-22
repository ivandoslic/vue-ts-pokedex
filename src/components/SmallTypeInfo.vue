<template>
    <div class="small-type-container">
        <!-- TODO: Add type icon -->
        <p :style="{ color: getColor($props.typeData.name) }">{{ $props.typeData.name }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { type NamedAPIResource } from '../types/lokshunhung/pokeapi-types/utility';
import { getColor } from '../assets/colors';

export default defineComponent({
    name: 'SmallTypeInfo',
    props: {
        typeData: {
            type: Object as PropType<NamedAPIResource>,
            required: true
        }
    },
    setup() {
        return {
            getColor
        };
    }
});
</script>

<style scoped>
.small-type-container p {
    padding-inline: 5px;
    font-weight: bold;
}
</style>
