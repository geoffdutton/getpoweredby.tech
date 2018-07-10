<template>
    <div>
        <div class="box" v-bind:class="{
            premium: athlete.premium,
            profile: !athlete.premium
        }">
            <div class="columns">
                <div class="column is-narrow">
                    <img class="square-img" v-bind:src="athlete.profile">
                    <br>
                    <button class="button" @click="refreshData">
                        Refresh Data
                    </button>
                </div>
                <div class="column is-narrow">
                    <ul>
                        <li><label>Name:</label> {{ athlete.firstname }} {{ athlete.lastname }}</li>
                        <li><label>Sex:</label> Still Exploring</li>
                    </ul>
                </div>
                <div class="column">
                    <div class="tile is-ancestor">
                        <div class="tile is-parent">
                            <div class="tile is-child is-warning notification">
                                <p class="title">{{ wattsPerKg | round(3) }}</p>
                                <p class="subtitle">Watts / KG</p>
                            </div>
                        </div>
                        <div class="tile is-parent">
                            <div class="tile is-child is-warning notification">
                                <p class="title">{{ totalRides }}</p>
                                <p class="subtitle">Total Rides</p>
                            </div>
                        </div>
                        <div class="tile is-parent">
                            <div class="tile is-child is-warning notification">
                                <p class="title">{{ totalRidesDistance | metersToMiles | round }}</p>
                                <p class="subtitle">Total Miles</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box notification is-success has-shadow">
            <p class="title">Activities ({{ activities.length }})</p>
            <ul>
                <li class="activity-item" v-for="activity in activities">
                    <Activity :key="'activity-id-' + activity.id"
                              :name="activity.name"
                              :distance="activity.distance"
                              :moving-time=activity.movingTime
                              :map-polyline=activity.map.summaryPolyline
                    />
                </li>
            </ul>
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
    computed: {
      wattsPerKg () {
        return this.$store.getters.getAverageWattsPerKilogram || '--'
      },
      totalRides () {
        const stats = this.$store.getters.getAllRideTotals
        if (!stats) {
          return '--'
        }
        return stats.count
      },
      totalRidesDistance () {
        const stats = this.$store.getters.getAllRideTotals
        if (!stats) {
          return '--'
        }
        return stats.distance
      }
    },
    data () {
      return {
        isRefreshing: false
      }
    },
    methods: {
      refreshData () {
        this.isRefreshing = true
        return this.$store.dispatch(ME_REQUEST)
          .then(() => {
            return this.$store.dispatch(ACTIVITIES_REQUEST)
          })
          .then(() => {
            this.isRefreshing = false
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .square-img {
        max-width: 100px;
    }

    .user {
        max-width: 289px;
    }

    label {
        font-weight: bold;
    }
    .activity-item {
        margin-bottom: 2rem;
    }
</style>
