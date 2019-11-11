export default {
  data () {
    return {
      editing: false
    };
  },
  methods: {
    addNew () {
      this.editing = false;
      this.$refs.editForm.activate(this.getDefaultModel && this.getDefaultModel());
    },
    startEditing () {
      this.editing = true;
      this.$refs.editForm.activate(this.getModel());
    }
  }
};
