import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'
import zoro from '@opcjs/zoro'
import { createLoading } from '@opcjs/zoro-plugin'

import PageTodos from './pages/todos/todos'
import models from './models'
import mixins from './mixins'

import './app.global.scss'

const app = zoro({
  onError(error) {
    if (error.message) {
      Taro.showToast({
        icon: 'none',
        title: error.message,
        duration: 2000,
      })
    }
  },
})
app.use(mixins)
app.use(createLoading())
app.model(models)

const store = app.start(false)

if (CONFIG.DEBUG) {
  store.subscribe(() => console.log(store.getState()))
}

class App extends Component {
  config = {
    pages: ['pages/todos/todos'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '待办记事',
      navigationBarTextStyle: 'black',
    },
  }

  componentDidMount() {
    app.setup()
  }

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  render() {
    return (
      <Provider store={store}>
        <PageTodos />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
