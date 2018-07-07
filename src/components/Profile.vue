<template>
    <div class="columns" v-bind:class="{
        premium: athlete.premium,
        profile: !athlete.premium
    }">
        <div class="column is-narrow">
            <img class="square-img" v-bind:src="athlete.profile">
        </div>
        <div class="column">
            <ul>
                <li><label>Name:</label> {{ athlete.firstname }} {{ athlete.lastname }}</li>
                <li><label>State:</label> {{ athlete.state || '--' }}</li>
                <li><label>Sex:</label> Still Exploring</li>
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Profile',
    props: {
      athlete: Object
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .premium {
        border: 1px solid red;
    }

    .square-img {
        max-width: 100px;
    }

    .profile {
        border: 1px solid grey;
    }

    label {
        font-weight: bold;
    }
</style>
