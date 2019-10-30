export default {
  data () {
    return {
      editing: false
    };
  },
  methods: {
    addNew () {
      this.editing = false;
      this.$refs.editForm.activate();
    },
    startEditing () {
      this.editing = true;
      const form = this.$refs.editForm;
      form.activate();
      const data = this.getModel();
      Object.assign(form, data);
      form.originalModel = Object.assign({}, data.model);
    }
  }
};
