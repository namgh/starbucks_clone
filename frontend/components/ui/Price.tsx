/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

interface Props {
  price?: number
  size?: string
}

export default function Price({price = 0, size = 'inherit'}: Props) {
  const style = css`
    font-size: ${size};
  `

  return (
    <>
      <span css={style}>{price.toLocaleString('ko-KR')}</span>원
    </>
  )
}
