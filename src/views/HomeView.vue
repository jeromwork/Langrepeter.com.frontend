<template>
  <div>  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/repeaters">Repeaters</router-link> |
    <router-link to="/table">Table</router-link> |
    <router-link to="/audio">Audio</router-link>
  </nav>

    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>


    <control-panel></control-panel>

  </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>
