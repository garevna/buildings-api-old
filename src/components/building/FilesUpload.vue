<template>
  <v-container>
    <v-card flat class="mx-auto mt-0" max-width="1440" min-width="360" width="100%">
      <UploadFile
        :param="param"
        :file.sync="selectedFile"
      />

      <ShowPDF v-if="config[this.param].type === 'pdf'" :link="fileLink" />
      <ShowImages v-else :links.sync="files" />

    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'FilesUpload',
  components: {
    UploadFile: () => import('@/components/inputs/UploadFile.vue'),
    ShowPDF: () => import('@/components/inputs/ShowPDF.vue'),
    ShowImages: () => import('@/components/inputs/ShowImages.vue')
  },

  props: ['data', 'param', 'changed'],

  data: () => ({
    config: require('@/config/uploads').default,
    buildingId: null,
    links: null,
    selectedFile: null,
    fileLink: null,
    files: null
  }),

  computed: {
    type () {
      return this.config[this.param].type
    },
    propName () {
      return this.config[this.param].propName
    },
    array () {
      return this.config[this.param].scheme === 'array'
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler (val) {
        if (!val) {
          console.warn('Error: Building data is null')
          return
        }
        const data = localStorage.getItemByName('selectedBuilding')
        this.buildingId = data._id
        this.links = data.files
        this.setValues(this.links[this.propName])
        // val && val.files && this.setValues(val.files[this.propName])
      }
    },
    propName: {
      immediate: true,
      handler (val) {
        this.setValues(this.links[val])
      }
    },
    selectedFile: {
      deep: true,
      handler (file) {
        file && this.upload(file)
      }
    }
  },
  methods: {

    setValues (data) {
      if (this.array) {
        this.files = data
      } else {
        this.fileLink = data
      }
    },

    async upload (file) {
      const response = await this._uploadBuildingFiles(file, this.param)
      if (response.error) {
        this.$root.$emit('error-event', {
          type: 'Error uploading file',
          message: 'Try once more please'
        })
        return null
      }
      localStorage.setItemByName('selectedBuilding', await this._getBuildingDetails(this.data._id))

      this.$emit('update:changed', true)

      this.setValues(this.links[this.propName])

      return response.url
    }
  }
}
</script>
