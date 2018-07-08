<template>
    <section class="auth">
        <div class="ui-status">
            <button @click="login" class="button is-large is-success is-outlined">Log In To Strava.com
            </button>
        </div>
        <div class="ui-status">
            <div v-if="authStatus === 'loading'" class="loader">Loading...</div>
            <div v-if="authStatus === 'error'" class="notification is-danger">
                There was an error, but you should try again.
            </div>
            <div v-if="authStatus === 'redirecting'" class="notification is-info">
                Redirecting you to Strava.com...
            </div>
        </div>
    </section>
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
      ...mapGetters(['isAuthenticated', 'authStatus'])
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

    .loader,
    .loader:before,
    .loader:after {
        border-radius: 50%;
        width: 2.5em;
        height: 2.5em;
        animation-fill-mode: both;
        animation: load7 1.8s infinite ease-in-out;
    }

    .loader {
        color: #4d5d5c;
        font-size: 10px;
        margin: 80px auto;
        position: relative;
        text-indent: -9999em;
        transform: translateZ(0);
        animation-delay: -0.16s;
    }

    .loader:before,
    .loader:after {
        content: '';
        position: absolute;
        top: 0;
    }

    .loader:before {
        left: -3.5em;
        animation-delay: -0.32s;
    }

    .loader:after {
        left: 3.5em;
    }

    @-webkit-keyframes load7 {
        0%,
        80%,
        100% {
            box-shadow: 0 2.5em 0 -1.3em;
        }
        40% {
            box-shadow: 0 2.5em 0 0;
        }
    }

    @keyframes load7 {
        0%,
        80%,
        100% {
            box-shadow: 0 2.5em 0 -1.3em;
        }
        40% {
            box-shadow: 0 2.5em 0 0;
        }
    }
</style>
