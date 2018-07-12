<template>
    <div class="box">
        <div class="columns">
            <div class="column">
                <p class="title">{{ name }}</p>
                <p class="subtitle">Distance: {{ distance | metersToMiles }} miles</p>
                <p>Time: {{ movingTime | secondsToHuman }}</p>
            </div>
            <div class="column geo-plot"></div>
        </div>
    </div>
</template>

<script>
  import polylineHelper from '@mapbox/polyline'
  import * as d3 from 'd3'

  export default {
    name: 'Activity',
    props: {
      name: String,
      distance: Number,
      totalElevationGain: Number,
      movingTime: Number,
      kilojoules: Number,
      averageHeartrate: Number,
      mapPolyline: String
    },
    mounted () {
      // reverse coords
      if (!this.mapPolyline) {
        return
      }

      const height = 250
      const width = 250
      const projection = d3.geoMercator()
      projection.scale(1000)

      const coords = polylineHelper.decode(this.mapPolyline).reduce((all, coord) => {
        coord = projection([coord[1], coord[0]])
        all.push(coord)
        return all
      }, [])

      const allX = coords.map(c => c[0])
      const allY = coords.map(c => c[1])

      const xScale = d3.scaleLinear()
        .domain([d3.min(allX), d3.max(allX)])
        .range([0, width])

      const yScale = d3.scaleLinear()
        .domain([d3.min(allY), d3.max(allY)])
        .range([0, height])

      const slice = d3.line()
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1]))

      const svg = d3.select(this.$el.querySelector('.geo-plot'))
        .append('svg')
        .attr('height', height)
        .attr('width', width)
        // .attr('viewBox', `0 0 ${height} ${width}`)
        // .attr('preserveAspectRatio', 'xMinYMin meet')


      svg.append('path')
        .attr('class', 'line')
        .attr('d', slice(coords))
        .style('fill', 'none')
        .style('stroke', '#23d160')
        .style('stroke-width', 2)

    }
  }
</script>

<style scoped>

</style>

