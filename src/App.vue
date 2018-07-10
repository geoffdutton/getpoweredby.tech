<template>
    <div id="app">
        <header id="nav" class="navbar header has-shadow">
            <div class="container">
                <div class="navbar-brand">
                    <div class="navbar-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                            <path d="M0 0h48v48h-48z" fill="none"/>
                            <path class="logo" d="M32 9.6c1.98 0 3.6-1.61 3.6-3.6s-1.62-3.6-3.6-3.6c-1.99 0-3.6 1.61-3.6 3.6s1.61 3.6 3.6 3.6zm6 14.4c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 17c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-8.4-21h8.4v-3.6h-6.4l-3.87-6.53c-.59-1-1.68-1.67-2.93-1.67-.94 0-1.79.38-2.4 1l-7.4 7.39c-.62.62-1 1.47-1 2.41 0 1.26.67 2.32 1.7 2.94l6.7 4.06v10h3.6v-12.96l-4.5-3.34 4.64-4.66 3.46 4.96zm-19.6 4c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 17c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                        </svg>

                    </div>
                    <div class="navbar-item">
                        Powered By Tech
                    </div>
                    <div class="navbar-item">
                        <router-link to="/">Home</router-link>
                    </div>
                    <div class="navbar-item" v-if=!isAuthenticated>
                        <router-link to="/auth">Login</router-link>
                    </div>
                    <div class="navbar-item" v-if=isAuthenticated>
                        <router-link to="/logout">Logout</router-link>
                    </div>
                </div>
            </div>
        </header>
        <router-view/>
        <footer class="footer">
            <Footer msg="Welcome to GetPoweredBy.Tech"/>
        </footer>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Footer from '@/components/Footer.vue'

  export default {
    components: {
      Footer
    },
    computed: {
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      },
      ...mapGetters(['getApiError'])
    },
    mounted () {
      this.$store.watch(
        () => this.$store.getters.getApiError,
        e => {
          let lastToast
          if (e) {
            console.error(e)
            lastToast = this.$toast.open({
              message: e.message,
              type: 'is-danger',
              duration: 30 * 1000
            })
          } else if (lastToast) {
            lastToast()
            lastToast = null
          }
        })
    }
  }
</script>

<style>
    .logo {
        fill: #42b983;
    }
    #nav {
        border-bottom: 5px solid #42b983;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #2c3e50;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
