<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col
        cols="12"
        lg="6"
        v-for="(src, index) in sources"
        :key="index"
      >
        <v-card>
          <v-img :src="src" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'ShowImages',
  props: {
    links: Array
  },
  data: () => ({
    notFound: require('@/config/404').default,
    sources: []
  }),
  watch: {
    links: {
      immediate: true,
      deep: true,
      async handler (val) {
        this.sources = []
        for (const endpoint of val) {
          if (endpoint && endpoint.indexOf('https://') === 0) {
            this.sources.push(await this.getImageData(endpoint))
          } else {
            this.sources.push(this.notFound)
          }
        }
      }
    }
  },
  methods: {
    async getImageData (link) {
      const response = await (await fetch(link)).json()
      if (response.error) {
        this.$root.$emit('error-event', {
          type: `Error reading the file ${link}`,
          message: 'Try to upload another file please'
        })
        return this.notFound
      }
      return response.file
    }
  }
}
</script>
