<template>
  <g>
    <FamilyMember
      v-for="(member, index) in members"
      :definition="member"
      :key="member.id"
      :x="`${(100 / members.length) * index}%`"
      :y="y"
      :width="`${100 / members.length}%`"
      :height="height"
      :ego="firstIsEgo && index === 0"
      v-touch="firstIsEgo && index > 0 ? {
        left: () => $emit('cycle', 1),
        right: () => $emit('cycle', -1)
      } : {}"
      @select="$emit('select', member.id)"
    />
  </g>
</template>

<script>
import FamilyMember from './FamilyMember';

export default {
  components: {
    FamilyMember
  },
  name: 'FamilyGeneration',
  data () {
    return {};
  },
  props: {
    firstIsEgo: Boolean,
    height: String,
    members: Array,
    y: String
  }
}
</script>

