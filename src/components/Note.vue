<template lang="pug">
router-link(
  tag="div"
  :to="`/editor/${note.id}`"
  :style="{backgroundColor: note.bgColor}"
).note {{ note.text }}
  button(
    @click.prevent="removeNote").note__btn-remove
    FontAwesomeIcon(
      :icon="iconRemove"
      class="note__btn-remove-icon")
     
</template>
<script>
import { mapMutations } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
export default {
  props: ['note'],
  computed: {
    iconRemove() {
      return faTrash
    }
  },
  methods: {
    ...mapMutations(['DELETE_NOTE']),
    removeNote() {
      this.DELETE_NOTE(this.note)
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>
<style lang="sass" scoped>
$bg-color: yellow
$box-shadow: 0px 0px 3px black
$text-shadow: 1px 1px 1px rgba(#fff, 0.5)
$btn-icon-color: #000
$btn-icon-color_hover: rgba(red, 0.85)
.note
  position: relative
  width: 100%
  max-width: 100%
  min-height: 10px
  padding: 10px 
  font-size: 14px
  background-color: $bg-color
  box-shadow: $box-shadow
  text-shadow: $text-shadow
  overflow: hidden
  word-wrap: break-word
  z-index: 1
  cursor: pointer
  &:hover
    .note__btn-remove
      right: 5px
      opacity: 1
.note__btn-remove
  position: absolute
  right: -30px
  top: 5px
  display: block
  width: 20px
  height: 20px
  color: $btn-icon-color
  z-index: 2
  opacity: 0
  transition: color 0.3s, right 0.4s, opacity 0.7s
  &:hover
    color: $btn-icon-color_hover 
.note__btn-remove-icon
  position: absolute
  left: 0
  right: 0
  bottom: 0
  top: 0
  width: 100%
  height: 100%
</style>
