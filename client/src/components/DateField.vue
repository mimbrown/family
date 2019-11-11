<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="slide-y-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="dateFormatted"
        :label="label"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker :value="value" no-title scrollable @input="dateSelect" />
  </v-menu>
</template>

<script>
import moment from 'moment';

export default {
  created () {
    this.form && this.form.register(this);
  },
  beforeDestroy () {
    this.form && this.form.unregister(this);
  },
  computed: {
    dateFormatted () {
      return this.value && moment(this.value).format('MM/DD/YYYY');
    }
  },
  data: () => ({
    menu: false
  }),
  inject: {
    form: { default: null }
  },
  methods: {
    dateSelect (value) {
      this.menu = false;
      this.$emit('input', value);
    },
    reset () {
      this.$emit('input', null);
    }
  },
  name: 'DateField',
  props: {
    format: {
      default: 'MM/DD/YYYY',
      type: String
    },
    label: String,
    value: String
  }
};
</script>
