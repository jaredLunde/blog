import React from 'react'
import {useParams} from 'react-router-dom'

function Blog() {
  const {slug} = useParams() as {slug?: string}
  return <span>Hello {slug}</span>
}

export default Blog
