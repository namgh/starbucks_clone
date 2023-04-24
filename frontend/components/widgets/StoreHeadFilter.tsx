import router from "next/router";
import React, { Dispatch, SetStateAction } from "react";

interface filterList {
  id: number;
  name: string;
  value: Array<string>;
  bigType?: string;
}

export default function StoreHeadFilter(props: {
  data: filterList;
  filterKeyword: string[];
  setFilterKeyword: Dispatch<SetStateAction<string[]>>;
}) {
  const { data, filterKeyword, setFilterKeyword } = props;

  const handleKeyword = (keyword: string) => {
    if (!filterKeyword.includes(keyword)) {
      setFilterKeyword([...filterKeyword, keyword]);
    } else {
      setFilterKeyword([...filterKeyword.filter((el) => el !== keyword)]);
    }
  };

  return (
    <div className={data.value.length === 0 ? "header-sub hide" : "header-sub"}>
      <nav>
        <p className="cat-title">{data.name}</p>
        <ul>
          {data.value.length !== 0 &&
            data.value.map((el, idx) => (
              <li
                key={idx}
                onClick={() => handleKeyword(el)}
                className={filterKeyword.includes(el) ? "active" : ""}
              >
                {el}
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
