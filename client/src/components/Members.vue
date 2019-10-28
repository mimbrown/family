<template>
  <v-row>
    <v-col v-for="member in members" :key="member.id" cols="12" sm="6" md="4">
      <v-card hover :to="`/members/${member.id}`">
        <v-img
          v-if="member.profile_image"
          :src="member.profile_image"
        />
        <!-- <v-card-title primary-title>
          <div>
            <div class="headline">{{ member.first_name }} {{ member.last_name }}</div>
            <span class="grey--text">{{ getDate(member.birth_date) }}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn text color="primary" :to="`/members/${member.id}`">View</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="details = (details === member.id) ? null : member.id">
            <v-icon>{{ details === member.id ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions> -->
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="headline"
            >{{ member.first_name }} {{ member.last_name }}</v-card-title>

            <v-card-subtitle v-text="getDate(member.birth_date)"></v-card-subtitle>
          </div>

          <v-card-actions>
            <v-btn text color="primary">View</v-btn>
            <!-- <v-spacer></v-spacer>
            <v-btn icon @click="details = (details === member.id) ? null : member.id">
              <v-icon>{{ details === member.id ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn> -->
          </v-card-actions>
        </div>

        <v-slide-y-transition>
          <v-card-text v-show="details === member.id">
            {{ member.description }}
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-col>
  </v-row>
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

