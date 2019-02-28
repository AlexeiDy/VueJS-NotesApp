import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    notes: [
      {
        id: '1521013054367',
        text:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore odit, corporis reiciendis accusantium error harum nemo facilis illum deserunt ipsa.',
        bgColor: '#f64747'
      },
      {
        id: '1521013088573',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit iusto molestias vitae, id amet accusamus distinctio ratione, repellendus culpa, nostrum facere dolorem quisquam dolor? Ratione magnam odio porro eum tempore.',
        bgColor: '#a3f647'
      },
      {
        id: '1521013270413',
        text:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus non quidem mollitia iste similique magni consequatur, neque obcaecati nulla laudantium maxime accusamus accusantium est temporibus soluta officia iure asperiores magnam voluptas eveniet dicta quia debitis? Sint sit velit temporibus qui.',
        bgColor: '#f64747'
      },
      {
        id: '1521013135144',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        bgColor: '#f29a2e'
      },
      {
        id: '1521013284681',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, perspiciatis? Maiores beatae dolores et quod, veritatis odit dicta. Perferendis tenetur voluptates nam.',
        bgColor: '#ece756'
      },
      {
        id: '1521013293815',
        text:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, eos! Ut mollitia fuga omnis repudiandae!',
        bgColor: '#84f9f5'
      }
    ],
    colors: [
      '#98eab7',
      '#d8b1ef',
      '#d8e37c',
      '#f29a2e',
      '#b5d0f4',
      '#f64747',
      '#f984de',
      '#ece756',
      '#84f9f5',
      '#a3f647'
    ]
  },
  getters: {
    notes(state) {
      return state.notes
    },
    colors(state) {
      return state.colors
    }
  },
  mutations: {
    ADD_NOTE(state, payload) {
      state.notes.unshift(payload)
    },
    DELETE_NOTE(state, payload) {
      state.notes.splice(state.notes.indexOf(payload), 1)
    },
    EDIT_NOTE_TEXT(state, payload) {
      state.notes.forEach(note => {
        if (note.id === payload.id) {
          note.text = payload.text
        }
      })
    }
  },

  strict: process.env.NODE_ENV !== 'production'
})
