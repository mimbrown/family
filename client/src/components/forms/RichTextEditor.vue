<template>
  <div></div>
</template>

<script>
const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  // ['blockquote', 'code-block'],
  // [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered'}, { list: 'bullet' }],
  // [{ script: 'sub'}, { script: 'super' }],
  [{ indent: '-1'}, { indent: '+1' }],
  // [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['image']
  // ['clean']
];

export default {
  name: 'RichTextEditor',
  mounted () {
    this.quill = new Quill(this.$el, {
      modules: {
        toolbar
      },
      theme: 'snow'
    });
    if (this.value) {
      this.quill.pasteHTML(this.value)
    }
    this.quill.on('text-change', () => {
      let html = this.$el.children[0].innerHTML
      const quill = this.quill
      const text = quill.getText()
      if (html === '<p><br></p>') html = ''
      this._content = html
      this.$emit('input', this._content)
      this.$emit('change', { html, text, quill })
    });
  },
  data () {
    return {
      quill: null
    };
  },
  props: {
    value: String
  },
  watch: {
    value (value) {
      if (this.quill) {
        if (value && value !== this._content) {
          this._content = value
          this.quill.pasteHTML(value)
        } else if(!value) {
          this.quill.setText('')
        }
      }
    }
  }
}
</script>

<style>
.ql-editor img {
  width: 300px;
  max-width: 50% !important;
  border-radius: 5px;
}
.ql-editor img:nth-of-type(odd) {
  float: right;
  margin-left: 15px;
  transform: rotate(5deg);
}
.ql-editor img:nth-of-type(even) {
  float: left;
  margin-right: 15px;
  transform: rotate(-5deg);
}
</style>
