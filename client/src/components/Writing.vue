<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-toolbar flat class="transparent">
        <v-btn icon to="/writings">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
    </v-flex>
    <v-flex xs12 pa-3 text-xs-left v-html="html">

    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Writing',
  data () {
    return {
      html: null,
      title: null
    };
  },
  created () {
    this.load();
  },
  methods: {
    async load () {
      const { id } = this.$route.params;
      const { data } = await axios.get(`/api/writings/${id}`);
      Object.assign(this, data);
    }
  }
};
</script>

