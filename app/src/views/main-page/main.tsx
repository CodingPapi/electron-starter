import React, { useCallback, useEffect, useState } from 'react'
import { Button, Input, Spin, Card } from 'antd'

import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

interface MainProps extends PageProps, StoreProps {
  addDemo: StoreStates['addDemo']
  countAlias: StoreStates['addDemo']
}

declare interface MainState {
  resData: Partial<queryTestInfoUsingGET.Response>
  loading: boolean
  createWindowLoading: boolean
}

/**
 * MainProps 是组件的 props 类型声明
 * MainState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

const Index = (props: MainProps) => {
  const dispatch = useDispatch()
  const useSelectorTyped: TypedUseSelectorHook<MainProps> = useSelector
  const demoState = useSelectorTyped((state) => state.addDemo)

  const [state, setState] = useState<MainState>({
    resData: {},
    loading: false,
    createWindowLoading: false,
  })

  const { resData, loading, createWindowLoading } = state

  const openNewWindow = () => {
    setState({ ...state, createWindowLoading: true })
    $tools.createWindow('MainPage').finally(() => setState({ ...state, createWindowLoading: false }))
  }

  const requestTest = () => {
    setState({ ...state, loading: true })
    $api
      .queryTestInfo({})
      .then((resData) => {
        setState({ ...state, resData })
      })
      .finally(() => setState({ ...state, loading: false }))
  }

  const requestTestError = () => {
    setState({ ...state, loading: true })
    $api
      .queryTestInfoError({})
      .catch((resData) => {
        setState({ ...state, resData })
      })
      .finally(() => setState({ ...state, loading: false }))
  }

  const requestTestErrorModal = () => {
    setState({ ...state, loading: true })
    $api
      .queryTestInfoError({}, { errorType: 'modal' })
      .catch((resData) => {
        setState({ ...state, resData })
      })
      .finally(() => setState({ ...state, loading: false }))
  }
  return (
    <div className="layout-padding">
      <Card title="Redux Test" className="mb-16">
        <p>redux count : {demoState.count}</p>
        <p>redux countAlias : {demoState.count}</p>

        <div className="mt-16">
          <Button
            type="primary"
            onClick={() => {
              dispatch({ type: 'addDemo/addSync', payload: { count: demoState.count + 1 } })
            }}
          >
            Add
          </Button>
        </div>

        <p className="text-gray mt-16 mb-16">
          Redux runs in the main process, which means it can be shared across all renderer processes.
        </p>

        <Button onClick={openNewWindow} loading={createWindowLoading}>
          Open new window
        </Button>
      </Card>

      <Card title="Request Test" className="mb-16">
        <Spin spinning={loading}>
          <div className="mb-16">
            <Button type="primary" onClick={requestTest}>
              Request
            </Button>

            <Button className="ml-16" type="primary" onClick={requestTestError}>
              Request Error (notification)
            </Button>

            <Button className="ml-16" type="primary" onClick={requestTestErrorModal}>
              Request Error (modal)
            </Button>
          </div>

          <Input.TextArea value={JSON.stringify(resData)} autoSize />
        </Spin>
      </Card>
    </div>
  )
}

export default Index
