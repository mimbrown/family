<template>
  <v-row>
    <v-col
      :cols="cols"
      v-for="(item, index) in value"
      :key="index"
      class="d-flex array-item"
      :class="cls"
      @dragstart="dragStart"
      @dragend="dragEnd"
    >
      <div v-if="sortable" class="drag-handle" @mousedown="drag($event, index)">
        <v-icon>drag_indicator</v-icon>
      </div>
      <v-btn text icon @click="remove(index)">
        <v-icon>delete</v-icon>
      </v-btn>
      <slot
        name="item"
        :item="item"
        :commit="commit"
        :index="index"
      />
      <div
        v-if="sortable"
        class="dt dt-left"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @dragover="checkDrop"
        @drop="drop($event, index)"
      ></div>
      <div
        v-if="sortable"
        class="dt dt-right"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @dragover="checkDrop"
        @drop="drop($event, index + 1)"
      ></div>
    </v-col>
    <v-col :cols="cols" class="d-flex array-item" :class="cls">
      <v-btn text icon @click="add">
        <v-icon>add</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';

export default {
  data () {
    return {
      draggingIndex: null,
      left: null,
      shadow: null,
      top: null
    };
  },
  methods: {
    add () {
      this.value.push(null);
    },
    checkDrop (event) {
      if (event.currentTarget.parentElement.parentElement === this.$el) {
        event.preventDefault();
      }
    },
    commit (item, index) {
      this.$set(this.value, index, item);
    },
    drag (event, index) {
      event.target.closest('.col').draggable = true;
      this.draggingIndex = index;
    },
    dragEnd (event) {
      event.currentTarget.draggable = false;
      event.currentTarget.classList.remove('drag-src');
      this.draggingIndex = null;
    },
    dragEnter (event) {
      event.currentTarget.classList.add('dt-active');
    },
    dragLeave (event) {
      event.currentTarget.classList.remove('dt-active');
    },
    dragStart (event) {
      event.currentTarget.classList.add('drag-src');
    },
    drop (event, index) {
      event.currentTarget.classList.remove('dt-active');
      const { draggingIndex } = this;
      if (index !== draggingIndex && index !== draggingIndex + 1) {
        const newValue = this.value.slice();
        const [target] = newValue.splice(draggingIndex, 1);
        if (draggingIndex < index) {
          index--;
        }
        newValue.splice(index, 0, target);
        this.$emit('input', newValue);
      }
    },
    remove (index) {
      const newValue = this.value.slice();
      newValue.splice(index, 1);
      this.$emit('input', newValue);
    }
  },
  name: 'ArrayField',
  props: {
    cls: [String, Object],
    cols: {
      default: 12,
      type: [String, Number]
    },
    sortable: Boolean,
    value: Array
  }
};
</script>

<style>
.array-item {
  position: relative;
  align-items: center;
}
.drag-handle {
  width: 36px;
  height: 36px;
  cursor: grab;
  display: inline-flex;
  justify-content: center;
}
.drag-handle:hover:active {
  cursor: grabbing;
}
.drag-src .d-flex {
  opacity: 0.3;
}
.dt {
  position: absolute;
  top: 0;
  width: 13px;
  height: 100%;
}
.dt-left {
  left: -1px;
}
.dt-left.dt-active {
  border-left: 2px solid lightblue;
}
.dt-right {
  right: -1px;
}
.dt-right.dt-active {
  border-right: 2px solid lightblue;
}
</style>
