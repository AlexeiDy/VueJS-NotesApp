<template lang="pug">
.editor__view-inner
  .editor__view-text--wrap
    textarea(
      :readonly="isReadOnly"
      :class="{'editor__view-text--active' : isEdited }"
      :value="editedText"
      @input="onEditnote($event)").editor__view-text
  .editor__view-buttons
    button(
      @click.prevent="editNote"
      v-if="isReadOnly"
      key="edit").editor__view-btn edit
    button(
      v-else
      @click.prevent="saveNote"
      :disabled="isDisabledSaveButton"
      key='save').editor__view-btn save
    button(@click="deleteNote").editor__view-btn delete
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    activeNote: {},
    activeNoteIndex: 0,
    editedText: '',
    isReadOnly: true,
    isEdited: false,
    isDisabledSaveButton: false
  }),
  computed: {
    ...mapGetters(['notes'])
  },
  methods: {
    ...mapMutations(['DELETE_NOTE', 'EDIT_NOTE_TEXT']),
    deleteNote() {
      this.DELETE_NOTE(this.activeNote)
    },
    editNote() {
      this.isReadOnly = !this.isReadOnly
      this.isEdited = !this.isEdited
    },
    saveNote() {
      const obj = {
        text: this.editedText,
        id: this.activeNote.id,
        bgColor: this.activeNote.bgColor
      }
      this.EDIT_NOTE_TEXT(obj)
      this.isReadOnly = !this.isReadOnly
      this.isEdited = !this.isEdited
    },
    onEditnote(event) {
      if (!this.isReadOnly) {
        if (event.target.value.trim().length === 0) {
          this.isDisabledSaveButton = true
          this.editedText = ''
        } else {
          this.isDisabledSaveButton = false
          this.editedText = event.target.value
        }
      }
    },
    currentNote() {
      const current = this.notes.filter((note, index) => {
        if (note.id === this.$route.params.id) {
          this.activeNote = note
          this.activeNoteIndex = index
          this.editedText = note.text
          return note
        }
      })[0]
      if (current) {
        this.editedText = current.text
      } else if (this.notes.length === 0) {
        this.$router.push('/')
      } else {
        if (this.activeNoteIndex === 0) {
          this.$router.push('' + this.notes[this.activeNoteIndex].id)
        } else {
          this.$router.push('' + this.notes[this.activeNoteIndex - 1].id)
        }
      }
    }
  },
  watch: {
    $route() {
      this.currentNote()
      this.isReadOnly = true
      this.isEdited = false
    },
    notes() {
      this.currentNote()
    }
  },
  created() {
    this.currentNote()
  }
}
</script>
<style lang="sass" scoped>
$inner-bg-color: #fff
$text-color_active: #e6675c  
$text-shadow-color_active: #1b5130 
$btn-bg-color: #B5D0F4
$btn-bg-color_hover: #b5c9e4
.editor__view-inner
  position: relative
  background-color: $inner-bg-color
  height: 100%
.editor__view-text--wrap
  position: relative
  width: 100%
  height: 300px
.editor__view-text
  position: absolute
  left: 0
  right: 0
  bottom: 0
  top: 0
  width: 100%
  padding: 20px
  padding-bottom: 40px
  resize: none
  z-index: 2
  &--active
    color: $text-color_active
    box-shadow: inset 0px 0px 6px $text-shadow-color_active
.editor__view-buttons
  display: block
  width: 100% 
  text-align: right
.editor__view-btn
  padding: 10px 15px
  display: inline-block
  margin-left: 10px
  background-color: $btn-bg-color
  outline: none
  border: 0
  border-radius: 4px 
  cursor: pointer
  text-transform: uppercase
  transition: background-color .4s
  &:hover
    background-color: $btn-bg-color_hover
.slide-enter-active
  animation: slide-in 200ms ease-out forwards
.slide-leave-active
  animation: slide-out 200ms ease-out forwards
@keyframes slide-in
  from
    transform: translateY(-30px)
    opacity: 0
  to
    transform: translateY(0px)
    opacity: 1
@keyframes slide-out
  from
    transform: translateY(0)
    opacity: 1
  to
    transform: translateY(-30px)
    opacity: 0
</style>
