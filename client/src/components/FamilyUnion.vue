<template>
  <svg viewBox="0 0 100 126" preserveAspectRatio="xMidYMin meet" x="0%" width="100%">
    <path d="M 30,40 L 70,40 M 30,60 L 70,60" class="marriage-mark" />
    <g v-if="divorced">
      <path d="M 30,70 L 70,30" stroke-width="6" stroke="#fafafa" />
      <path d="M 30,70 L 70,30" class="divorce-mark" />
    </g>
  </svg>
</template>
<script>
export default {
  name: 'FamilyUnion',
  data () {
    return {}
  },
  props: {
    divorced: Boolean
  }
}
</script>

<style>
.marriage-mark {
  fill: none;
  stroke: black;
  stroke-width: 6;
  stroke-linecap: round;
}
.divorce-mark {
  stroke: black;
  stroke-width: 3;
  stroke-linecap: round;
}
</style>
