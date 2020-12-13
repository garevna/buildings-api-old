<template>
  <v-layout row justify-center>
    <v-card flat class="transparent mx-auto mt-0 pl-4" max-width="1440" min-width="360" width="100%">
      <v-toolbar>
        <v-toolbar-title>{{ config[this.param].label }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-file-input
          class="mt-8"
          v-model="selectedFile"
          :accept="this.config[this.param].accept"
          :label="config[this.param].label"
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
    </v-card>
  </v-layout>
</template>

<script>

export default {
  name: 'UploadFile',
  props: ['param', 'file'],
  data: () => ({
    config: require('@/config/uploads').default,
    selectedFile: null
  }),
  watch: {
    selectedFile: {
      deep: true,
      handler (val) {
        val && this.$emit('update:file', val)
      }
    }
  }
}
</script>
