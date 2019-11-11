<template>
  <v-bottom-sheet v-model="active" fullscreen hide-overlay>
    <v-toolbar dark>
      <v-toolbar-title>{{ editing ? 'Edit' : 'New' }}</v-toolbar-title>

      <v-spacer />

      <v-btn text icon @click="$emit('cancel', $refs.form)">
        <v-icon>cancel</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card
      tile
      :height="$vuetify.breakpoint.height - $vuetify.application.top - 48"
      min-height="0"
      class="scroll-y"
    >
      <v-container fluid class="pa-0 fill-height">
        <v-row
          justify="center"
          class="pa-3"
        >
          <v-col cols="12" sm="10" md="8">
            <v-form enctype="multipart/form-data" v-model="valid" ref="form" class="edit-form">
              <slot></slot>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-footer>
      <v-row>
        <v-btn text color="primary" style="flex: 1;">
          <v-icon left>delete</v-icon> Delete
        </v-btn>
        <v-btn text :disabled="!valid" color="primary" style="flex: 1;" @click="$emit('save', $refs.form)">
          <v-icon left>save</v-icon> Save
        </v-btn>
      </v-row>
    </v-footer>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: {
    editing: Boolean
  },
  name: 'FormWrap',
  data () {
    return {
      active: false,
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
.scroll-y {
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
