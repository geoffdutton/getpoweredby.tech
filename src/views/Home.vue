<template>
    <section class="home">
        <pre v-if=getAthlete class="user">{{ JSON.stringify(getAthlete, null, 2) }}</pre>
        <HelloWorld msg="Welcome to GetPoweredBy.Tech"/>
    </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    computed: {
      ...mapGetters(['getAthlete'])
    },
    components: {
      HelloWorld
    }
  }
</script>

<style scoped>
    .user {
        text-align: left;
    }
</style>
