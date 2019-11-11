<template>
  <v-row v-if="snapshot" class="ma-0 row-fill">
    <!-- <v-col class="pt-3" cols="12" sm="6">
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
          <v-list-item-content>
            {{ displaySnapshotChoice(item) }}
          </v-list-item-content>
        </template>
      </v-combobox>
    </v-col>
    <v-col cols="12" class="pb-3 px-3 full-max">
      {{ snapshot.description }}
    </v-col> -->
    <v-col cols="12" style="height: 100%;" class="pa-0 d-flex flex-column">
      <!-- <p>{{ snapshot.description }}</p> -->
      <v-carousel v-model="carouselModel" :show-arrows="carouselModel !== 0" class="flex-grow-1 flex-shrink-1" height="100%" hide-delimiters>
        <v-carousel-item>
          <!-- <v-toolbar flat light>
            <v-btn icon to="/members">
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-toolbar-title>{{snapshot.first_name}} {{snapshot.last_name}}</v-toolbar-title>
          </v-toolbar> -->
          <v-sheet
            light
            height="100%"
            tile
          >
            <v-row class="fill-height ma-0" justify="center">
              <v-col cols="12" sm="10" md="8">
                <v-list-item class="px-0">
                  <v-list-item-avatar>
                    <v-img :src="snapshot.profile_image"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="text-uppercase">{{ snapshot.first_name }} {{ snapshot.last_name }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn text color="primary" @click="carouselModel++">Gallery</v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-combobox
                  v-model="snapshot"
                  :items="snapshots"
                  type="button"
                >
                  <template v-slot:selection="{ item }">
                    {{ displaySnapshotChoice(item) }}
                  </template>
                  <template v-slot:item="{ index, item }">
                    <v-list-item-content>
                      {{ displaySnapshotChoice(item) }}
                    </v-list-item-content>
                  </template>
                </v-combobox>
                <p>{{ snapshot.description }}</p>
                <!-- <v-list v-if="snapshot && snapshot.attributes">
                  <v-list-item />
                </v-list> -->
              </v-col>
            </v-row>
          </v-sheet>
          <!-- <v-card>
          <v-combobox
            v-model="snapshot"
            :items="snapshots"
            type="button"
          >
            <template v-slot:selection="{ item }">
              {{ displaySnapshotChoice(item) }}
            </template>
            <template v-slot:item="{ index, item }">
              <v-list-item-content>
                {{ displaySnapshotChoice(item) }}
              </v-list-item-content>
            </template>
          </v-combobox>
          </v-card> -->
        </v-carousel-item>
        <v-carousel-item
          v-for="(src,i) in snapshot.images"
          :key="i"
        >
          <v-img :src="src" height="100%" contain class="v-carousel__item" />
        </v-carousel-item>
      </v-carousel>
    </v-col>
    <SnapshotForm ref="editForm" :editing="editing" @edited="onEdited" @added="onAdded" />
  </v-row>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import SnapshotForm from './forms/SnapshotForm';
import Editable from './Editable';

export default {
  components: {
    SnapshotForm
  },
  mixins: [Editable],
  name: 'Member',
  data () {
    return {
      carouselModel: 0,
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
    getModel () {
      const { snapshot } = this;
      const model = Object.assign({}, snapshot);
      return { id: snapshot.id, model };
    },
    async load () {
      const { id } = this.$route.params;
      const { snapshots } = this.$store.state;
      snapshots.url = `/api/members/${id}`;
      const data = await snapshots.getData();
      this.snapshots = data;
      this.snapshot = data[0];
      this.snapshot.attributes = [
        { key: 'Height', value: 'Large'}
      ];
    },
    onEdited (model) {
      Object.assign(this.snapshot, model);
    },
    onAdded (model) {
      const { chapters, $router } = this;
      let i = 0;
      for (; i < chapters.length; i++) {
        if (chapters[i].chapter_date > model.chapter_date) {
          break;
        }
      }
      chapters.splice(i, 0, model);
      $router.push({ path: `/history/${model.id}` });
    }
  }
}
</script>

<style>
.row-fill {
  height: 100%;
  width: 100%;
}
</style>
