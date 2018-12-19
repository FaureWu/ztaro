import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button, Text, Icon } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'

import ComponentSpin from '../../components/spin/spin'

import styles from './todos.scss'

@connect(({ todos, loading }) => ({
  todos: todos.lists,
  loading: loading.effect['todos/getTodos'],
}))
class PageTodos extends Component {
  config = {
    navigationBarTitleText: '待办事项',
  }

  state = {
    value: '',
  }

  componentWillMount() {
    dispatcher.todos.getTodos()
  }

  handleInput = ({ detail: { value } }) => {
    this.setState({ value })
  }

  handleAdd = () => {
    const { value } = this.state
    if (!value) {
      Taro.showToast({
        icon: 'none',
        title: '请输入待办事项!',
        duration: 2000,
      })
      return
    }

    dispatcher.todos.addTodo({ text: value }).then(() => {
      this.refreshTodos()
      this.setState({ value: '' })
      Taro.showToast({
        icon: 'none',
        title: '添加成功',
        duration: 2000,
      })
    })
  }

  handleDelete = id => {
    dispatcher.todos.deleteTodo({ id }).then(() => {
      this.refreshTodos()
      Taro.showToast({
        icon: 'none',
        title: '删除成功',
        duration: 2000,
      })
    })
  }

  handleHttpStatusError = () => dispatcher.todos.httpStatusError()

  handleServiceError = () => dispatcher.todos.serviceError()

  refreshTodos() {
    dispatcher.todos.getTodos(undefined, { disableLoading: true })
  }

  render() {
    const { todos, loading } = this.props
    const { value } = this.state

    return (
      <View className={styles.todos}>
        <ComponentSpin loading={loading} />
        <View className={styles.logo} />
        <Input
          className={styles.input}
          value={value}
          placeholder="输入添加的待办事件"
          onInput={this.handleInput}
        />
        <View className={styles.tools}>
          <Button className={styles.tool} onClick={this.handleAdd}>
            添加
          </Button>
          <Button className={styles.tool} onClick={this.handleHttpStatusError}>
            演示http服务错误
          </Button>
          <Button className={styles.tool} onClick={this.handleServiceError}>
            演示业务错误
          </Button>
        </View>
        {todos.map(todo => (
          <View className={styles.todo} key={todo.id}>
            <Text>{todo.text}</Text>
            <View onClick={this.handleDelete.bind(this, todo.id)}>
              <Icon type="cancel" className={styles.delete} />
            </View>
          </View>
        ))}
      </View>
    )
  }
}

export default PageTodos
