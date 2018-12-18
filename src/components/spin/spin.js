import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import styles from './spin.scss'

class ComponentSpin extends Component {
  render() {
    const { loading } = this.props

    return (
      <View className={classNames(styles.spin, { [styles.hide]: !loading })}>
        <View className={styles.overlay}>
          <View className={styles.list}>
            <View className={styles.rect} />
            <View className={styles.rect} />
            <View className={styles.rect} />
            <View className={styles.rect} />
            <View className={styles.rect} />
          </View>
        </View>
      </View>
    )
  }
}

export default ComponentSpin
