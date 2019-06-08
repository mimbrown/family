<template>
  <svg viewBox="0 0 1 2">
    <polygon :points="left ? '1,0 0,1 1,2' : '0,0 1,1 0,2'" fill="black" @click="$emit('cycle', left ? -1 : 1)" />
  </svg>
</template>
<script>
export default {
  name: 'FamilySpouseCycle',
  props: {
    left: Boolean
  }
}
</script>
