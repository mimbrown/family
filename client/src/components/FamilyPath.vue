<template>
  <svg
    viewBox="0 0 100 3"
    preserveAspectRatio="none"
    x="0%"
    y="0%"
    width="100%"
    height="100%"
    style="overflow: visible;"
  >
    <path
      class="family-connector"
      vector-effect="non-scaling-stroke"
      :d="buildPath()"
    />
  </svg>
</template>
<script>
export default {
  name: 'FamilyPath',
  data () {
    return {}
  },
  methods: {
    buildPath () {
      const { connections, currentConnections, pull } = this;
      const l0 = this.getY(0);
      const l1 = this.getY(1);
      const l2 = this.getY(2);
      const l3 = this.getY(3);
      let path;
      if (pull) {
        path = `M 25,${l3} L 25,${l2} L 50,${l2}`;
      } else if (currentConnections) {
        path = this.getConnectionPoints(currentConnections, l2, l3);
      } else {
        path = `M 50,${l3} L 50,${l2}`;
      }
      path += ` M 50,${l2} L 50,${l1} ${this.getConnectionPoints(connections, l1, l0)}`;
      return path;
    },
    getConnectionPoints (num, from, to) {
      if (num === 1) {
        return `M 50,${from} L 50,${to}`;
      }
      const length = 100 / num;
      const buffer = length / 2;
      let path = `M ${buffer},${from} L ${100 - buffer},${from}`;
      for (let i = 0; i < num; i++) {
        const x = (i + 0.5) * length;
        path += ` M ${x},${from} L ${x},${to}`;
      }
      return path;
    },
    getY (num) {
      return this.lower ? 3 - num : num;
    }
  },
  props: {
    connections: Number,
    currentConnections: Number,
    lower: Boolean,
    pull: Boolean
  }
}
</script>

<style>
.family-connector {
  stroke: black;
  fill: none;
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-linecap: round;
}
</style>

