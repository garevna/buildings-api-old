<template>
  <object
    :data="base64String"
    type="application/pdf"
    width="100%"
    height="800"
  ></object>
</template>

<script>

export default {
  name: 'ShowPDF',
  props: {
    link: String
  },
  data: () => ({
    base64String: require('@/config/404').default,
    notFound: require('@/config/404').default
  }),
  watch: {
    link: {
      immediate: true,
      handler (val) {
        if (val && val.indexOf('https://') === 0) {
          this.changeFrameContent(val)
        } else {
          this.base64String = this.notFound
        }
      }
    }
  },
  methods: {
    async changeFrameContent (link) {
      const response = await (await fetch(link)).json()
      if (response.error) {
        this.$root.$emit('error-event', {
          type: `Error reading the file ${link}`,
          message: 'Try to upload another file please'
        })
        this.base64String = this.notFound
        return null
      }
      this.base64String = response.file
    }
  }
}
</script>
