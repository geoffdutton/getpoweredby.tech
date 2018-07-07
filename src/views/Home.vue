<template>
    <section class="home">
        <Profile :athlete=getAthlete />
        <pre v-if=getAthlete class="user">{{ JSON.stringify(getAthlete, null, 2) }}</pre>
        <HelloWorld msg="Welcome to GetPoweredBy.Tech"/>
    </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import Profile from '@/components/Profile.vue'

  export default {
    name: 'home',
    computed: {
      ...mapGetters(['getAthlete'])
    },
    components: {
      HelloWorld,
      Profile
    }
  }
</script>

<style scoped>
    .user {
        text-align: left;
    }
</style>
