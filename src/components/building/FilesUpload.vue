<template>
  <v-layout row justify-center>
    <v-card flat class="mx-auto mt-12" max-width="1440" min-width="360" width="100%">
      <v-toolbar>
        <v-toolbar-title>{{ label }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-file-input
          class="mt-8"
          v-model="selectedFile"
          :label="label"
          prepend-icon="$upload"
          outlined
          color="#09b"
        >
          <template v-slot:selection="{ text }">
            <v-chip
              small
              label
              color="#09b"
            >
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
      </v-toolbar>

      <ShowPDF v-if="config[this.param].type === 'pdf'" :link="fileLink" />
      <ShowImages v-else :links="data.files[this.propName]" />

    </v-card>
  </v-layout>
</template>

<script>

export default {
  name: 'FilesUpload',
  components: {
    ShowPDF: () => import('@/components/inputs/ShowPDF.vue'),
    ShowImages: () => import('@/components/inputs/ShowImages.vue')
  },
  props: ['data', 'param', 'changed'],
  data: () => ({
    config: require('@/config/uploads').default,
    selectedFile: null
  }),
  computed: {
    buildingId () {
      return this.data._id
    },
    label () {
      return this.config[this.param].label
    },
    type () {
      return this.config[this.param].type
    },
    propName () {
      return this.config[this.param].propName
    },
    fileLink: {
      get () {
        const link = this.data.files[this.propName]
        return link && link.indexOf('https://') === 0 ? link : null
      },
      set (link) {
        if (Array.isArray(this.data.files[this.propName])) {
          this.data.files[this.propName].push(link)
        } else {
          Object.assign(this.data.files, { [this.propName]: link })
        }
        localStorage.setItemByName('selectedBuilding', this.data)
        this.$emit('update:changed', true)
      }
    }
  },
  watch: {
    propName (val) {
      this.fileLink = this.data.files[val]
    },
    selectedFile: {
      deep: true,
      handler (file) {
        if (!file) return
        if (file.type.indexOf(this.type) === -1) {
          this.$root.$emit('error-event', {
            type: 'Invalid File Type',
            message: `Select please ${this.type} file`
          })
          // this.fileLink = null
          return
        }
        this.upload()
      }
    }
  },
  methods: {
    async upload () {
      if (!this.config[this.param]) throw new Error('Invalid path for file upload')
      const response = await this._uploadBuildingFiles(this.selectedFile, this.param)
      if (response.error) {
        this.$root.$emit('error-event', {
          type: 'Error uploading file',
          message: 'Try once more please'
        })
        return
      }
      this.fileLink = response.url
      if (Array.isArray(this.data.files[this.propName])) {
        this.data.files[this.propName].push(response.url)
      } else {
        Object.assign(this.data.files, { [this.propName]: response.url })
      }
      localStorage.setItemByName('selectedBulding', this.data)
      this.$emit('update:changed', true)
    }
  }
}
</script>
