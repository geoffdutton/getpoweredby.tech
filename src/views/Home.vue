<template>
    <div class="hero">
        <div class="hero-body">
            <div class="container">
                <div class="profile" v-if=getAthlete>
                    <Profile :athlete=getAthlete :activities=getLimitedActivities />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // @ is an alias to /src
  import Profile from '@/components/Profile.vue'

  export default {
    name: 'home',
    computed: {
      ...mapGetters(['getAthlete', 'getActivities']),
      getLimitedActivities () {
        return this.getActivities.slice(0, 10)
      }
    },
    components: {
      Profile
    }
  }
</script>

<style scoped>
    .user {
        text-align: left;
    }
</style>
