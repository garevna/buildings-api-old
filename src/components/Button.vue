<template>
  <v-tooltip bottom :color="iconColor">
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        dark
        v-on="on"
        @click="$emit('update:clicked', true)"
        color="iconColor"
      >
        <v-icon :large="largeIcon" :color="iconColor">{{iconName}}</v-icon>
      </v-btn>
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script>

export default {
  name: 'Button',
  props: ['text', 'icon', 'clicked', 'color', 'large'],
  computed: {
    iconName () {
      return this.icon ? this.icon.indexOf('mdi') === 0 ? this.icon : this.$vuetify.icons.values[this.icon] : null
    },
    iconColor () {
      return this.color || '#09b'
    },
    largeIcon () {
      return this.large || false
    }
  }
}
</script>
