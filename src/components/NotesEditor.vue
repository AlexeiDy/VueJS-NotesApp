<template lang="pug">
.editor
  .container
    .editor__row
      aside.editor__sidebar
        router-link(tag='a' to="/").editor__btn back to NotesApp
        transition-group(
          name="list" 
          tag="ul").editor__list
          router-link(
            v-for="(note, index) in notes"
            tag='li'
            :to='`/editor/${note.id}`'
            :key="note.id"
            active-class="editor__list-item--active"
            :style="{backgroundColor: note.bgColor}"
          ).editor__list-item {{ note.text }}
      .editor__view
        router-view
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['notes'])
  }
}
</script>

<style lang="sass" scoped>
$sidebar-border-color: #000
$list-item-color: #fff
$list-item-shadow-color: #000
$list-item-shadow-color_active: #000
$list-item-border-color: transparent
$list-item-border-color_active: #000
$view-color: #fff
.editor
  width: 100%
  min-height: 100vh
  .container
    padding: 0
.editor__row
  display: flex
  flex-direction: row
  position: relative
  min-height: 100vh
.editor__sidebar
  width: 30%
  height: 100%
  margin-right: auto
  border-right: 1px solid $sidebar-border-color
.editor__btn
  display: block
  width: 100%
  padding: 10px 0
  margin-bottom: 10px
  text-decoration: underline
  text-align: center
.editor__list-item
  position: relative
  padding: 10px 10px
  font-size: 13px
  background-color: $list-item-color
  border: 2px solid $list-item-border-color 
  box-shadow: 0 -1px 1px rgba($list-item-shadow-color, 0.5)
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer
  z-index: 1
.editor__list-item--active
  z-index: 2
  box-shadow: 0px 0px 5px $list-item-shadow-color_active
  border: 2px solid $list-item-border-color_active
.editor__view
  width: 100%
  background-color: $view-color
.list-enter-active, .list-leave-active 
  transition: all .5s
.list-enter, .list-leave-to 
  opacity: 0
  transform: translateX(-300px)
</style>
