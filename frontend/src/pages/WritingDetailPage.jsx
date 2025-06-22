import React from 'react'
import WritingDetail from '../components/WritingDetail.jsx'

const WritingDetailPage = (props) => {
  return (
    <div>
      <WritingDetail user={props.user}/>
    </div>
  )
}

export default WritingDetailPage
