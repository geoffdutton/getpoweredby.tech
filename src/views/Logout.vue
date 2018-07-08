<template>
    <section class="auth">
        Logging out...
    </section>
</template>

<script>
  import {
    AUTH_LOGOUT
  } from '../store/mutationTypes'

  export default {
    name: 'logout',
    created () {
      return this.$store.dispatch(AUTH_LOGOUT)
        .then(() => this.$router.push('/auth'))
    }
  }
</script>

<style>
    .ui-status {
        padding: 1rem 0;
        margin: 1rem 0;
    }
</style>
