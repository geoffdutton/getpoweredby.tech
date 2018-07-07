<template>
    <div id="app" class="container">
        <div class="column is-three-fifths is-offset-one-fifth">
            <img src="./assets/splash-logo.jpg">
        </div>
        <div class="column is-three-fifths is-offset-one-fifth">
            <div id="nav">
                <router-link to="/">Home</router-link>
                |
                <router-link v-if=!isAuthenticated to="/auth">Login</router-link>
                <router-link v-if=isAuthenticated to="/logout">Logout</router-link>
            </div>
            <router-view/>
        </div>
    </div>
</template>

<script>
  export default {
    computed: {
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      }
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
