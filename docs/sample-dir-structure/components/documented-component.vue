<template>
  <div>
    <!-- Form header -->
    <slot name="header">
      <!-- `<th>title</th>` -->
      <th>title</th>
    </slot>
  </div>
</template>

<script>
// This is a description of the component. If you are using the default renderer (`minipress-markdown`) you can use multiline strings and even markdown almost everywhere. For example you can show usage examples of your component right here:
// ```markup
// <template>
//   <div>
//      <DocumentedComponent />
//   </div>
// </template>
// ```

export default {
  name: 'my-button',
  props: {
    // The name of the form, up to 8 characters
    name: {
      type: [String, Number],
      required: true,
      validator () {}
    },
    count: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // @vuese
    // Used to manually clear the form
    clear () {
      // Fire when the form is cleared
      // @arg The argument is a boolean value representing xxx
      this.$emit('onclear', true)
    },
    // @vuese
    // Used to increment the counter
    increment() {
      // Fire when the counter should be incremented
      // @arg The argument is the new value of the counter
      this.$emit('update:count', this.count + 1)
    }
  }
}
</script>