import React from 'react'

export default function ProductLabel(props: {isBest: boolean|undefined, isNew: boolean|undefined}) {
  const {isBest, isNew} = props
  return (
    <div className="product-label">
      <p className={isBest === true ? "item-best" : "item-best hide"}>
        Best
      </p>
      <p className={isNew === true ? "item-new" : "item-new hide"}>
        New
      </p>
    </div>
  )
}
