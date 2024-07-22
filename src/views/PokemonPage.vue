<template>
    <main class="home-page">
        <div class="banner-container">
            <img :src="bannerImage" />
        </div>
        <div class="basic-info-container">
            <p>{{ pokemonData?.id }}</p>
            <h1 :style="{ color: 'var(--app-on-primary-surface)' }">{{ uppercaseName }}</h1>
            <div class="types-list">
                <SmallTypeInfo
                    v-for="(typeObj, index) in typesList"
                    :key="index"
                    :type-data="typeObj"
                />
            </div>
            <div class="main-pokemon-div">
                <PokemonStats v-if="pokemonData?.stats" :statsData="pokemonData?.stats" />
                <PokeEvolutionDisplay
                    v-if="pokemonData?.id"
                    :pokemonId="pokemonData?.id"
                    :key="pokemonData?.id"
                />
            </div>
        </div>
    </main>
</template>

<style scoped>
.home-page {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: scroll;
}

.banner-container {
    margin-top: 50px;
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
}

.basic-info-container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.basic-info-container p {
    color: var(--app-gray);
    font-weight: bold;
    margin-bottom: 0;
}

.basic-info-container h1 {
    font-weight: bolder;
}

.types-list {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
}

.main-pokemon-div {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
}
</style>

<script lang="ts">
import { useRoute } from 'vue-router';
import { fetchPokemonData } from '../services/pokemonService';
import type { Pokemon } from '../types/lokshunhung/pokeapi-types/pokemon';
import { defineComponent, onMounted, ref, watch, computed } from 'vue';
import type { NamedAPIResource } from '../types/lokshunhung/pokeapi-types/utility';
import SmallTypeInfo from '../components/SmallTypeInfo.vue';
import PokemonStats from '../components/PokemonStats.vue';
import PokeEvolutionDisplay from '../components/PokeEvolutionDisplay.vue';

export default defineComponent({
    name: 'PokemonPage',
    setup() {
        const route = useRoute();
        const pokemonData = ref<Pokemon | null>(null);
        const getPokemonData = async () => {
            if (typeof route.params.id === 'string')
                pokemonData.value = await fetchPokemonData(route.params.id);
            else console.error('Id parameter not valid! Please check the URL.');
        };

        const uppercaseName = computed(() => {
            if (pokemonData.value && pokemonData.value != undefined) {
                return (
                    pokemonData.value.name.charAt(0).toUpperCase() + pokemonData.value.name.slice(1)
                );
            } else {
                return '';
            }
        });

        const bannerImage = computed(() => {
            if (
                pokemonData.value &&
                pokemonData.value.sprites.other &&
                pokemonData.value.sprites.other['official-artwork'] &&
                pokemonData.value.sprites.other['official-artwork'].front_default
            )
                return pokemonData.value.sprites.other['official-artwork'].front_default;
            else if (pokemonData.value && pokemonData.value.sprites.front_default)
                return pokemonData.value.sprites.front_default;
            return 'https://static.wikia.nocookie.net/bec6f033-936d-48c5-9c1e-7fb7207e28af/scale-to-width/755';
        });

        const typesList = computed(() => {
            if (!pokemonData.value || !pokemonData.value.types) return [];
            let tmpList: NamedAPIResource[] = [];
            pokemonData.value.types.forEach((typeObj) => {
                tmpList.push(typeObj.type);
            });
            return tmpList;
        });

        watch(
            () => route.params.id,
            async () => {
                getPokemonData();
            }
        );

        onMounted(() => {
            getPokemonData();
        });

        return {
            pokemonData,
            uppercaseName,
            bannerImage,
            typesList
        };
    },
    components: {
        SmallTypeInfo,
        PokemonStats,
        PokeEvolutionDisplay
    }
});
</script>
