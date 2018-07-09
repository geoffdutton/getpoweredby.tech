<template>
    <div class="hero">
        <div class="auth hero-body">
            <div class="ui-status">
                <button @click="login" class="button is-large is-success is-outlined">Log In To Strava.com
                </button>
            </div>
            <div class="ui-status">
                <div v-if="authStatus === 'redirecting'" class="notification is-info">
                    Redirecting you to Strava.com...
                </div>
            </div>
            <b-loading :active.sync="isApiLoading"></b-loading>
        </div>
    </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import {
    AUTH_REQUEST,
    AUTH_LOGOUT
  } from '../store/mutationTypes'

  export default {
    name: 'auth',
    computed: {
      ...mapGetters(['isAuthenticated', 'authStatus', 'isApiLoading'])
    },
    methods: {
      login () {
        return this.$store.dispatch(AUTH_REQUEST)
          .then(() => this.$router.push('/'))
      },
      logout () {
        return this.$store.dispatch(AUTH_LOGOUT)
          .then(() => this.$router.push('/auth'))
      }
    },
    created () {
      console.log(this.$route.query)
      const code = this.$route.query.code
      if (code) {
        return this.$store.dispatch(AUTH_REQUEST, code)
          .then(() => this.$router.push('/'))
      }

    }
  }
</script>

<style>
    .ui-status {
        padding: 1rem 0;
        margin: 1rem 0;
    }
    .auth {
        text-align: center;
    }
</style>
