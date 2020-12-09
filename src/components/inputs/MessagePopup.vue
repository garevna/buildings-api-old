<template>
  <v-dialog v-model="dialog" max-width="480px" class="pa-4">
    <v-card flat>
      <v-toolbar dark dense color="#09b">
        <v-icon class="mr-4"> $message </v-icon>
        <v-toolbar-title> Message </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('update:opened', false)">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <h4>{{ type }}</h4>
      </v-card-text>
      <v-card-text class="text-center">
        <p>{{ message }}</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'MessagePopup',
  props: ['opened', 'type', 'message'],
  computed: {
    dialog: {
      get () {
        return this.opened
      },
      set (val) {
        this.$emit('update:opened', val)
      }
    }
  }
}
</script>
