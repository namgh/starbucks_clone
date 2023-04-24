// import React from 'react'

// export default function SelectOrder() {
//   return (
//     <div className="products-order">

//     </div>
//   )
// }
/** @jsxImportSource @emotion/react */

import { productType } from "@/types/types";
import { css } from "@emotion/react";

import React, { Dispatch, SetStateAction } from "react";

export default function SelectOrder(props: {
  itemList: productType[];
  setItemList: Dispatch<SetStateAction<productType[]>>;
}) {
  const { itemList, setItemList } = props;

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let list = [...itemList];

    if (e.target.value === "1") {
      list.sort(function (c1, c2) {
        return c1.price - c2.price;
      });
    } else {
      list.sort(function (c1, c2) {
        return c2.price - c1.price;
      });
    }
    setItemList([...list]);
  };

  return (
    <div className="products-order">
      <select
        className="select-toggle"
        css={dropdown}
        onChange={handleSorting}
        defaultValue={0}
      >
        <option value="0" disabled>
          정렬기준
        </option>
        <option value="1">낮은가격순</option>
        <option value="2">높은가격순</option>
      </select>
    </div>
  );
}

const dropdown = css`
  cursor: pointer;
  word-wrap: break-word;
  line-height: 1em;
  white-space: normal;
  background: #fff;
  display: inline-block;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.8rem;
  width: fit-content;
`;
