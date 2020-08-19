import React from 'react'
import {useParams} from 'react-router-dom'

function Topic() {
  const {slug} = useParams() as {slug?: string}
  return <span>Topic: {slug}</span>
}

export default Topic
