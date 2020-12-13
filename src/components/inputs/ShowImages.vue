<template>
  <v-container>
    <div class="text-center">
      <v-pagination
        v-if="links.length"
        v-model="page"
        :length="links.length"
        circle
      ></v-pagination>
    </div>
    <v-card flat v-if="links.length">
      <v-toolbar dense color="transparent">
        <v-spacer></v-spacer>
        <v-btn icon @click="showImageInNewWindow(src)">
          <v-icon color="#09b"> mdi-open-in-new </v-icon>
        </v-btn>
        <v-btn icon @click="removeImage">
          <v-icon color="#900"> $delete </v-icon>
        </v-btn>
      </v-toolbar>

      <v-img :src="src" contain />
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'ShowImages',
  props: {
    links: Array
  },
  data: () => ({
    page: 1,
    src: null,
    notFound: require('@/config/404-image').default
  }),
  watch: {
    page: {
      immediate: true,
      handler (val) {
        val && this.links.length && this.getImageContent()
      }
    },
    links: {
      deep: true,
      handler (newLinks, oldLinks) {
        this.page = 0
        this.$nextTick(function () {
          if (newLinks.length > oldLinks.length) {
            this.page = newLinks.length
          } else {
            this.page = Math.min(1, newLinks.length)
          }
        })
      }
    }
  },
  methods: {
    showImageInNewWindow: require('@/helpers/openImageInWindow').default,
    async getImageContent () {
      const response = await (await fetch(this.links[this.page - 1])).json()
      if (response.error) {
        this.$root.$emit('error-event', {
          type: `Error reading the file ${this.links[this.page - 1]}`,
          message: 'Try to upload another file please'
        })
        this.src = this.notFound
      } else {
        this.src = response.file
      }
    },

    async removeImage () {
      let response = await this._deleteImage(this.links[this.page - 1])
      if (response.error) {
        this.$root.$emit('error-event', {
          type: `Error deleting the file ${this.links[this.page - 1]}`,
          message: 'Try to delete the file later please'
        })
      }
      response = await this._getBuildingDetails(localStorage.getItemByName('selectedBuilding')._id)
      if (response.error) {
        this.$root.$emit('error-event', {
          type: 'Error reading building data',
          message: 'Try to reload page'
        })
        this.src = this.notFound
      }
      const tmp = Object.assign([], this.links)
      tmp.splice(this.page - 1, 1)
      this.$emit('update:links', tmp)
    }
  }
}
</script>
