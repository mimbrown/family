<template>
  <v-row pa-1 dense>
    <v-col cols="12">
      <h2 class="px-2 text-center">{{ title }}</h2>
    </v-col>
    <v-col cols="12" class="writing-content" v-html="html"></v-col>
    <v-navigation-drawer
      app
      right
      v-model="selectMode"
      width="350px"
      style="max-width:85vw;"
    >
      <v-container><Writings /></v-container>
    </v-navigation-drawer>
  </v-row>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Writings from './Writings';

export default {
  components: {
    Writings
  },
  name: 'Writing',
  data () {
    return {
      html: null,
      isWriting: true,
      selectMode: false,
      title: null
    }
  },
  methods: {
    async load () {
      const { id } = this.$route.params;
      const { data } = await axios.get(`/api/writings/${id}`);
      Object.assign(this, data);
    },
    onBreakpointChange () {
      this.selectMode = this.$vuetify.breakpoint.lgAndUp;
    },
    onToolClick () {
      this.selectMode = !this.selectMode;
    }
  },
  watch: {
    $route: {
      handler: 'load',
      immediate: true
    },
    '$vuetify.breakpoint.lgAndUp': {
      handler: 'onBreakpointChange',
      immediate: true
    }
  }
};
</script>

<style lang="scss">
.writing-content {
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 5px;
    text-align: center;
  }
}
</style>

