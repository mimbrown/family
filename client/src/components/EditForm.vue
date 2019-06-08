<template>
  <v-layout
    fill-height
    row
    wrap
    justify-center
    align-center
    align-content-center
    pa-3
  >
    <v-flex xs12 sm8 md6 lg4>
      <v-form enctype="multipart/form-data" v-model="valid" ref="form" class="edit-form">
        <slot></slot>
        <v-toolbar flat class="transparent">
          <v-btn flat color="primary" :click="$emit('delete')">
            Delete
          </v-btn>
          <v-spacer />
          <v-btn :disabled="!valid" flat color="primary" :click="$emit('save')">
            Save
          </v-btn>
        </v-toolbar>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'EditForm',
  data () {
    return {
      formErrors: [],
      valid: false
    };
  }
}
</script>

<style>
.edit-form {
  display: flex;
  flex-direction: column;
}
</style>
