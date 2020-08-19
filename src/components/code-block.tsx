import React from 'react'
import Highlight, {defaultProps} from 'prism-react-renderer'
import type {Language, PrismTheme} from 'prism-react-renderer'

export function CodeBlock({language = 'tsx', children}: CodeBlockProps) {
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children.trim()}
      language={language}
    >
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            // eslint-disable-next-line
            <div {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export interface CodeBlockProps {
  language: Language
  children: string
}

// @flow
// Converted automatically using ./tools/themeFromVsCode

const theme: PrismTheme = {
  plain: {
    color: '#d8dee9',
    backgroundColor: '#0b1015',
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: 'rgb(76, 86, 106)',
      },
    },
    {
      types: ['char', 'constant', 'changed'],
      style: {
        color: 'rgb(235, 203, 139)',
      },
    },
    {
      types: ['builtin', 'tag', 'operator', 'keyword'],
      style: {
        color: 'rgb(129, 161, 193)',
      },
    },
    {
      types: ['number'],
      style: {
        color: 'rgb(180, 142, 173)',
      },
    },
    {
      types: ['class-name', 'attr-name'],
      style: {
        color: 'rgb(143, 188, 187)',
      },
    },
    {
      types: ['function'],
      style: {
        color: 'rgb(136, 192, 208)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(191, 97, 106)',
      },
    },
    {
      types: ['inserted', 'string'],
      style: {
        color: 'rgb(163, 190, 140)',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'rgb(236, 239, 244)',
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'rgb(216, 222, 233)',
      },
    },
  ],
}
