<template>
  <svg viewBox="0 0 100 126" preserveAspectRatio="xMidYMin meet" @click="$emit('select', definition.id)" style="overflow: visible;">
    <polygon v-if="definition.gender === 'm'" points="0,100 50,0 100,100" :fill="color" />
    <circle v-else cx="50" cy="50" r="50" :fill="color" />
    <g v-if="definition.death_date">
      <path d="M 0,100 L 100,0" stroke-width="6" stroke="#fafafa" />
      <path d="M 0,100 L 100,0" class="death-mark" />
    </g>
    <text x="50" y="120" text-anchor="middle">{{ `${definition.nickname || definition.first_name} ${definition.last_name}` }}</text>
  </svg>
</template>
<script>
export default {
  name: 'FamilyMember',
  data () {
    return {}
  },
  computed: {
    color () {
      return this.ego ? 'gold' : 'black';
    }
  },
  props: {
    definition: Object,
    ego: Boolean
  }
}
</script>

<style>
.death-mark {
  stroke: black;
  stroke-width: 3;
  stroke-linecap: round;
}
</style>

