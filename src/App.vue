<template>
    <div id="app">
        <header id="nav" class="navbar header has-shadow">
            <div class="container">
                <div class="navbar-brand">
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
