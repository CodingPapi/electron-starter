import React from 'react'

const Index = (props: PageProps): JSX.Element => {
  const pageParams = () => {
    return JSON.stringify(props.match.params)
  }
  const pageQuery = () => {
    return JSON.stringify(props.query)
  }
  return (
    <div className="page-params layout-padding">
      <p>Params: {pageParams()}</p>
      <p>Query: {pageQuery()}</p>
    </div>
  )
}
export default Index
