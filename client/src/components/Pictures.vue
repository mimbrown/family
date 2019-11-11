<template>
  <v-dialog v-model="active" fullscreen hide-overlay>
    <v-app-bar dark fixed>
      <v-toolbar-title>Photo Gallery</v-toolbar-title>

      <v-spacer />

      <v-btn text icon class="mr-1" @click="$emit('change', false)">
        <v-icon>cancel</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content class="px-0 pb-12">
      <v-card tile>
        <v-container fluid class="fill-height">
          <v-row>
            <v-col v-for="picture in pictures" :key="picture.src" cols="12" sm="6" md="4" lg="3" xl="2">
              <v-card hover :ripple="false" @click="toggle(picture)" :class="{ 'pa-2': isSelected(picture) }">
                <v-img aspect-ratio="1" contain :src="picture.src">
                  <v-icon v-if="isSelected(picture)" x-large color="primary" class="image-select">check_circle</v-icon>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-content>
    <v-footer fixed>
      <v-row>
        <v-btn text :disabled="selected.length === 0" color="primary" style="flex: 1;" @click="select">
          Select
        </v-btn>
      </v-row>
    </v-footer>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  methods: {
    isSelected (image) {
      return this.selected.includes(image);
    },
    select () {
      this.$emit('change', false)
      this.$emit('select', this.multi ? this.selected : this.selected[0]);
      this.selected = [];
    },
    toggle (image) {
      const already = this.isSelected(image);
      if (this.multi) {
        if (already) {
          this.selected.splice(this.selected.indexOf(image), 1);
        } else {
          this.selected.push(image);
        }
      } else {
        this.selected = already ? [] : [image];
      }
    }
  },
  model: {
    prop: 'active',
    event: 'change'
  },
  name: 'Pictures',
  props: {
    active: Boolean,
    multi: Boolean
  },
  data () {
    return {
      pictures: [],
      selected: []
    };
  },
  async created () {
    const { data } = await axios('/api/pictures');
    this.pictures = data;
  }
}
</script>

<style>
.image-select {
  position: absolute;
  right: 5px;
  bottom: 5px;
  /* width: 20px;
  height: 20px; */
  /* border-radius: 50%; */
  /* background-color: white; */
}
</style>

