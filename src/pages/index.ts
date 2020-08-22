import React from 'react'

export const Blog = React.lazy(() => import('./blog/blog'))
export const Category = React.lazy(() => import('./blog/category'))
export const Tagged = React.lazy(() => import('./blog/tagged'))
export const Resume = React.lazy(() => import('./resume'))
export const Contact = React.lazy(() => import('./contact'))
export const BookClub = React.lazy(() => import('./book-club'))
