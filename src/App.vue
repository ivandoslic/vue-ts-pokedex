<template>
    <div class="app">
        <PokeSidebar />
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PokeSidebar from './components/PokeSidebar.vue';

export default defineComponent({
    name: 'HomePage',
    components: {
        PokeSidebar
    }
});
</script>

<style scoped>
.app {
    box-sizing: none;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
}
</style>
