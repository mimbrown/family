<template>
  <v-row no-gutters v-if="snapshot">
    <v-col class="pt-3" cols="12" sm="6">
      <v-toolbar flat class="transparent">
        <v-btn icon to="/members">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-toolbar-title>{{snapshot.first_name}} {{snapshot.last_name}}</v-toolbar-title>
      </v-toolbar>
    </v-col>
    <v-col class="pa-3" cols="12" sm="6">
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
    </v-col>
    <v-col cols="12" sm="5" class="pb-3 px-3">
      {{ snapshot.description }}
    </v-col>
    <v-col cols="12" sm="7">
      <v-carousel>
        <v-carousel-item
          v-for="(src,i) in snapshot.images"
          :key="i"
          :src="src"
        ></v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
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
