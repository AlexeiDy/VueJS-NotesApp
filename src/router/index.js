import Vue from 'vue'
import Router from 'vue-router'
import NotesEditor from '@/components/NotesEditor'
import NotesApp from '@/components/NotesApp'
import NoteView from '@/components/NoteView'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: NotesApp
    },
    {
      path: '/editor',
      component: NotesEditor
    },
    {
      path: '/editor/:id',
      component: NotesEditor,
      children: [
        {
          path: '',
          component: NoteView
        }
      ]
    }
  ]
})
