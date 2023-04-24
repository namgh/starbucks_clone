/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode;
  animation?: boolean;
}

export default function BottomFixedContainer({ children, animation = false }: Props) {

  const divAnimate = keyframes`
    from {
      transform: translateY(150px);
    }

    to {
      transform: translateY(0);
    }
  `
  const styleA = css`
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1;
    text-align: center;
    padding: 0;
    margin: 0;
    border-top: 1px solid #e2e2e2;
    box-shadow: 0 -3px .3em 3px rgba(139, 139, 139, 0.08);
    background-color: var(--color-white);
    animation: ${divAnimate} 1s;
  `

  const style = css`
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
    text-align: center;
    padding: 0;
    margin: 0;
    border-top: 1px solid #e2e2e2;
    box-shadow: 0 -3px .3em 3px rgba(139, 139, 139, 0.08);
    background-color: var(--color-white);
  `

  return (
    <div css={animation? styleA : style}>{children}</div>
  )
}
