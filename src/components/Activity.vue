<template>
 <div class="box">
     <p class="title">{{ name }}</p>
     <p class="subtitle">Distance: {{ distance }}</p>
     <p>Time: {{ movingTime | secondsToHuman }}</p>
 </div>
</template>
<script>
    export default {
        name: 'Activity',
        props: {
          name: String,
          distance: Number,
          totalElevationGain: Number,
          movingTime: Number,
          kilojoules: Number,
          averageHeartrate: Number
        }
    }
</script>

