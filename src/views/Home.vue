<template>
    <section class="home">
        <div v-if=getAthlete>
            <Profile :athlete=getAthlete />
            <pre class="user">{{ JSON.stringify(getAthlete, null, 2) }}</pre>
        </div>
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
