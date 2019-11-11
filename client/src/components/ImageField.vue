<template>
  <div class="d-flex image-field" @click="images = true">
    <v-img v-if="value" aspect-ratio="1" contain :src="value" />
    <v-responsive v-else aspect-ratio="1" class="empty-image"></v-responsive>
    <Pictures v-model="images" @select="onImageSelect" />
  </div>
</template>

<script>
import Pictures from './Pictures';

export default {
  beforeDestroy () {
    this.form && this.form.unregister(this);
  },
  components: {
    Pictures
  },
  created () {
    this.form && this.form.register(this);
  },
  data () {
    return {
      images: false
    };
  },
  inject: {
    form: { default: null }
  },
  methods: {
    onImageSelect (image) {
      this.$emit('input', image);
    }
  },
  name: 'ImageField',
  props: {
    value: String
  }
};
</script>

<style>
.image-field {
  max-height: 75px;
  cursor: pointer;
}
.empty-image {
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}
</style>