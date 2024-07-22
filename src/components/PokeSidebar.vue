<template>
    <div :class="{ 'sidebar-parent': true, collapsed: isCollapsed }">
        <div v-if="!isCollapsed" class="opened-sidebar">
            <div class="sidebar-header">
                <div class="sidebar-header-info">
                    <span class="material-symbols-outlined"> help </span>
                    <p>{{ noOfPokemon }} Pokémon</p>
                </div>
            </div>
            <div class="sidebar-list">
                <PokeList @update-pokemon-number="updatePokemonNumber" />
            </div>
            <div class="sidebar-footer">
                <label for="pokemon-category-radio" class="category-radio">
                    <input type="radio" name="category" id="pokemon-category-radio" checked />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2rem"
                        height="2rem"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2c-4.08 0-7.45 3.05-7.94 7h4.07c.44-1.73 2.01-3 3.87-3s3.43 1.27 3.87 3h4.07c-.49-3.95-3.86-7-7.94-7m0 16c4.08 0 7.45-3.05 7.94-7h-4.07c-.44 1.73-2.01 3-3.87 3s-3.43-1.27-3.87-3H4.06c.49 3.95 3.86 7 7.94 7m0-10a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
                        />
                    </svg>
                    Pokémon
                </label>
                <label for="type-category-radio" class="category-radio">
                    <input type="radio" name="category" id="type-category-radio" />
                    <span class="material-symbols-outlined custom-radio-icon">
                        brightness_empty
                    </span>
                    Type
                </label>
                <label for="settings-category-radio" class="category-radio">
                    <input type="radio" name="category" id="settings-category-radio" />
                    <span class="material-symbols-outlined custom-radio-icon"> settings </span>
                    Settings
                </label>
            </div>
        </div>
        <span @click="toggleSidebar()" class="material-symbols-outlined sidebar-icon">
            side_navigation
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';
import PokeList from './PokeList.vue';

export default defineComponent({
    name: 'PokeSidebar',
    setup() {
        const isCollapsed: Ref<boolean> = ref(false);
        const noOfPokemon: Ref<number | string> = ref(0);

        const toggleSidebar = () => {
            isCollapsed.value = !isCollapsed.value;
        };

        const updatePokemonNumber = (n: number | string) => {
            noOfPokemon.value = n;
        };

        return {
            isCollapsed,
            toggleSidebar,
            noOfPokemon,
            updatePokemonNumber
        };
    },
    components: {
        PokeList
    }
});
</script>

<style scoped>
.sidebar-parent {
    display: flex;
    position: relative;
    flex-direction: column;
    height: 100vh;
    width: var(--sidebar-width);
    border-right: 1px solid var(--app-primary-surface);
    transition: width 0.5s;
}

.collapsed {
    width: var(--collapsed-sidebar-width);
}

.opened-sidebar {
    display: flex;
    position: relative;
    flex-direction: column;
    height: 100%;
    padding: 10px 0px 10px 10px;
}

.sidebar-header {
    margin-top: 20px;
}

.sidebar-list {
    flex: 1;
    overflow-y: auto;
}

.sidebar-footer {
    padding-top: 10px;
    margin-bottom: 20px;
    border-top: 2px solid var(--app-primary-surface);
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-inline: 10px;
    justify-content: space-between;
    align-items: center;
}

.sidebar-icon {
    z-index: 1;
    position: absolute;
    right: -45px;
    bottom: 10px;
    font-size: 2rem;
    user-select: none;
    cursor: pointer;
    color: var(--app-orange);
}

.sidebar-header-info {
    width: 100%;
    display: flex;
    flex-direction: row;
}

.sidebar-header-info span {
    flex: 1;
    color: var(--app-medium-red);
    font-size: 1.8rem;
    font-weight: 500;
    user-select: none;
}

.sidebar-header-info p {
    font-weight: bold;
    flex: 10;
    display: flex;
    justify-content: center;
}

.category-radio {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
}

.category-radio:hover {
    color: var(--app-medium-red);
}

.category-radio input[type='radio']:checked + svg,
.category-radio input[type='radio']:checked + .custom-radio-icon {
    color: var(--app-medium-red);
}

.category-radio input[type='radio'] {
    display: none;
}

.custom-radio-icon {
    font-size: 2rem;
}
</style>
