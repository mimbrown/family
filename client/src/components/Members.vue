<template>
  <v-layout row wrap pa-2>
    <v-flex v-for="member in members" :key="member.id" xs12 sm6 md4>
      <v-card hover class="ma-2">
        <v-img
          v-if="member.profile_image"
          :src="member.profile_image"
        />
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ member.first_name }} {{ member.last_name }}</div>
            <span class="grey--text">{{ getDate(member.birth_date) }}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="primary" :to="`/members/${member.id}`">View</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="details = (details === member.id) ? null : member.id">
            <v-icon>{{ details === member.id ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="details === member.id">
            {{ member.description }}
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Members',
  data () {
    return {
      details: null,
      members: []
    };
  },
  async created () {
    const { data } = await axios('/api/members');
    this.members = data;
  },
  methods: {
    getDate (date) {
      return moment(date).format('LL');
    }
  }
}
</script>

