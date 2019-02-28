<template lang="pug">
.notes
  .container
    .notes__title NotesApp
    .notes__textarea--wrap
      textarea(
        placeholder="Type your note here..." 
        v-model.trim.lazy="textValue").notes__textarea
      input(
        type="submit" 
        value="add note"
        @click.prevent="addNote").notes__input-submit
    .notes__wrapper(ref="notesGrid")
      .notes__item(
        v-for='note in notes'
        :key='note.id')
        Note(
          :note='note'
          ref="note")
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Masonry from 'masonry-layout'
import Note from './Note'
export default {
  data: () => ({
    textValue: '',
    msnr: {}
  }),
  computed: {
    ...mapGetters(['notes', 'colors'])
  },
  methods: {
    ...mapMutations(['ADD_NOTE']),
    addNote() {
      const obj = {
        text: this.textValue,
        bgColor: this.colors[Math.floor(Math.random() * this.colors.length)],
        id: Date.now().toString()
      }
      if (this.textValue) {
        this.ADD_NOTE(obj)
      }
      this.textValue = ''
    }
  },
  components: {
    Note
  },
  mounted() {
    this.msnr = new Masonry('.notes__wrapper', {
      itemSelector: '.notes__item'
    })
  },
  updated() {
    this.msnr.reloadItems()
    this.msnr.layout()
  }
}
</script>
<style lang="sass" scoped>
$title-color: #fff
$shadow-color: #000
$submit-btn-bg-color: #00973A
$submit-btn-bg-color-hover: #1b5130
$submit-color: #fff
.notes
  position: relative
  width: 100%
  height: 100%
.notes__title
  margin-bottom: 20px
  font-size: 30px
  font-weight: bold
  color: $title-color
  text-align: center
  text-shadow: 1px 1px 5px rgba($shadow-color, 0.8), 0px 0px 1px $shadow-color
.notes__textarea--wrap
  position: relative
  width: 100%
  height: 200px
  margin: 0 auto
  box-shadow: 0px 0px 5px rgba($shadow-color, 0.8)
  outline: none
  border: none
  +min-screen(960px)
    width: 60%
.notes__textarea
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  width: 100%
  padding: 20px
  padding-bottom: 40px
  font-size: 16px
  font-weight: bold
  resize: none
  z-index: 2
.notes__input-submit
  position: absolute
  right: 20px
  bottom: 10px
  display: inline-block
  padding: 7px 15px 
  color: $submit-color
  text-transform: uppercase
  font-weight: bold
  background-color: $submit-btn-bg-color
  border: 2px solid $submit-btn-bg-color
  border-radius: 4px
  cursor: pointer
  z-index: 3
  outline: none
  transition: background-color 0.4s, border-color 0.4s, box-shadow 0.2s
  &:hover
    background-color: $submit-btn-bg-color-hover
    border-color: $submit-btn-bg-color-hover
  &:active
    box-shadow: inset 2px 0px 5px white, inset -2px 0px 5px white
.notes__wrapper
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: space-around
  padding-top: 30px
.notes__item
  width: 100%
  padding: 5px
  +min-screen(480px)
    width: 50%
  +min-screen(720px)
    width: 33.333%
  +min-screen(960px)
    width: 25%
</style>
