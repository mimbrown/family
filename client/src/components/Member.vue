<template>
  <v-layout row wrap pt-1 v-if="snapshot">
    <v-flex xs12 sm6>
      <v-toolbar flat class="transparent">
        <v-btn icon to="/members">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-toolbar-title>{{snapshot.first_name}} {{snapshot.last_name}}</v-toolbar-title>
      </v-toolbar>
    </v-flex>
    <v-flex xs12 sm6 px-3>
      <v-combobox
        v-model="snapshot"
        :items="snapshots"
        type="button"
      >
        <template v-slot:selection="{ item }">
          {{ displaySnapshotChoice(item) }}
        </template>
        <template v-slot:item="{ index, item }">
          <v-list-tile-content>
            {{ displaySnapshotChoice(item) }}
          </v-list-tile-content>
        </template>
      </v-combobox>
    </v-flex>
    <v-flex xs12 sm5 px-3 pb-3 text-xs-left>
      {{ snapshot.description }}
    </v-flex>
    <v-flex xs12 sm7>
      <v-carousel>
        <v-carousel-item
          v-for="(src,i) in snapshot.images"
          :key="i"
          :src="src"
        ></v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Member',
  data () {
    return {
      snapshot: null,
      snapshots: []
    };
  },
  created () {
    this.load();
  },
  methods: {
    displaySnapshotChoice (snapshot) {
      return `${snapshot.title} - ${moment(snapshot.snapshot_date).format('ll')}`
    },
    async load () {
      const { id } = this.$route.params;
      const { snapshots } = this.$store.state;
      snapshots.url = `/api/members/${id}`;
      const data = await snapshots.getData();
      this.snapshots = data;
      this.snapshot = data[0];
    }
  }
}
</script>