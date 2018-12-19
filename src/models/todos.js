import {
  getTodos,
  addTodo,
  deleteTodo,
  httpStatusError,
  serviceError,
} from '../requests/todos'

export default {
  namespace: 'todos',
  state: {
    lists: [],
  },
  mixins: ['common'],
  effects: {
    async getTodos(action, { put }) {
      const { data } = await getTodos()
      put({ type: 'update', payload: { lists: data } })
    },

    async addTodo({ payload: { text } }) {
      await addTodo({ text })
    },

    async deleteTodo({ payload: { id } }) {
      await deleteTodo({ id })
    },

    async httpStatusError() {
      await httpStatusError()
    },

    async serviceError() {
      await serviceError()
    },
  },
}
