<template>
    <div>
        <div class="columns" v-bind:class="{
        premium: athlete.premium,
        profile: !athlete.premium
    }">
            <div class="column is-narrow">
                <img class="square-img" v-bind:src="athlete.profile">
                <button class="button" @click="refreshAthlete">
                    Refresh
                </button>
            </div>
            <div class="column">
                <ul>
                    <li><label>Name:</label> {{ athlete.firstname }} {{ athlete.lastname }}</li>
                    <li><label>State:</label> {{ athlete.state || '--' }}</li>
                    <li><label>Sex:</label> Still Exploring</li>
                </ul>
            </div>
        </div>
        <div class="tile is-ancestor">
            <div class="tile is-vertical is-8">
                <div class="tile">
                    <div class="tile is-parent is-vertical">
                        <article class="tile is-child notification is-primary">
                            <p class="title">Watts / KG</p>
                            <p class="subtitle">Top tile</p>
                            <button class="button" @click="refreshActivities">
                                Refresh
                            </button>
                        </article>
                        <article class="tile is-child notification is-warning">
                            <p class="title">Athlete Response</p>
                            <pre class="user">{{ JSON.stringify(athlete, null, 2) }}</pre>
                        </article>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child notification is-info">
                            <p class="title">Activities Response</p>
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Distance</th>
                                    <th>Avg Heartrate</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="activity in activities">
                                    <td><Activity
                                        name="activity.name"
                                        distance="activity.distance"
                                        moving-time="activity.movingTime"
                                    /></td>
                                </tr>
                                </tbody>
                            </table>
                        </article>
                    </div>
                </div>
            </div>
        </div>
        <b-loading :active.sync="isRefreshing"></b-loading>
    </div>
</template>

<script>
    import Activity from './Activity'
  import { ME_REQUEST, ACTIVITIES_REQUEST } from '../store/mutationTypes'

  export default {
    name: 'Profile',
    components: {
      Activity
    },
    props: {
      athlete: Object,
      activities: Array
    },
    data () {
      return {
        isRefreshing: false
      }
    },
    methods: {
      refreshAthlete () {
        this.isRefreshing = true
        return this.$store.dispatch(ME_REQUEST)
          .then(() => {
            this.isRefreshing = false
          })
      },
      refreshActivities () {
        this.isRefreshing = true
        return this.$store.dispatch(ACTIVITIES_REQUEST)
          .then(() => {
            this.isRefreshing = false
          })
      }
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

    .user {
        max-width: 289px;
    }

    label {
        font-weight: bold;
    }
</style>
