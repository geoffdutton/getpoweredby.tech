<template>
    <div class="home">
        <img src="../assets/splash-logo.jpg">
        <HelloWorld msg="Welcome to GetPoweredBy.Tech"/>
    </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld
    }
  }
</script>
