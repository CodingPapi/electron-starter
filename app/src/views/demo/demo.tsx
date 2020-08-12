import * as React from 'react'
import { Button, Input, Spin, Card } from 'antd'

import { withStore } from '@/src/components'

interface DemoProps extends PageProps, StoreProps {
  addDemo: StoreStates['addDemo']
  countAlias: StoreStates['addDemo']
}

declare interface DemoState {
  resData: Partial<queryTestInfoUsingGET.Response>
  loading: boolean
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

@withStore(['addDemo', { countAlias: 'addDemo' }])
export default class Demo extends React.Component<DemoProps, DemoState> {
  // state 初始化
  state: DemoState = {
    resData: {},
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
  }

  // 构造函数
  constructor(props: DemoProps) {
    super(props)
  }

  componentDidMount(): void {
    console.log(this)
  }

  render(): JSX.Element {
    const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state
    const {
      addDemo: { count: reduxCount },
      countAlias,
    } = this.props
    return (
      <div className="layout-padding">
        <Card title="Redux Test" className="mb-16">
          <p>redux count : {reduxCount}</p>
          <p>redux countAlias : {countAlias.count}</p>

          <div className="mt-16">
            <Button
              type="primary"
              onClick={() => {
                this.props.dispatch({ type: 'addDemo/addSync', payload: { count: reduxCount + 1 } })
              }}
            >
              Add
            </Button>
          </div>

          <p className="text-gray mt-16 mb-16">
            Redux runs in the main process, which means it can be shared across all renderer processes.
          </p>

          <Button onClick={this.openNewWindow} loading={createWindowLoading}>
            Open new window
          </Button>
        </Card>

        <Card title="Request Test" className="mb-16">
          <Spin spinning={loading}>
            <div className="mb-16">
              <Button type="primary" onClick={this.requestTest.bind(this)}>
                Request
              </Button>

              <Button className="ml-16" type="primary" onClick={this.requestTestError.bind(this)}>
                Request Error (notification)
              </Button>

              <Button className="ml-16" type="primary" onClick={this.requestTestErrorModal.bind(this)}>
                Request Error (modal)
              </Button>
            </div>

            <Input.TextArea value={JSON.stringify(resData)} autoSize />
          </Spin>
        </Card>
      </div>
    )
  }

  openNewWindow = (): void => {
    this.setState({ createWindowLoading: true })
    $tools.createWindow('Demo').finally(() => this.setState({ createWindowLoading: false }))
  }

  requestTest(): void {
    this.setState({ loading: true })
    $api
      .queryTestInfo({})
      .then((resData) => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }

  requestTestError(): void {
    this.setState({ loading: true })
    $api
      .queryTestInfoError({})
      .catch((resData) => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }

  requestTestErrorModal(): void {
    this.setState({ loading: true })
    $api
      .queryTestInfoError({}, { errorType: 'modal' })
      .catch((resData) => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }
} // class Demo end
