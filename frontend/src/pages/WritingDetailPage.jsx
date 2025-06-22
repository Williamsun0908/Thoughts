import React from 'react'
import WritingDetail from '../components/WritingDetail'

const WritingDetailPage = (props) => {
  return (
    <div>
      <WritingDetail user={props.user}/>
    </div>
  )
}

export default WritingDetailPage
