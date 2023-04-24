import { categoryType } from "@/types/types";
import { useRouter } from "next/router";

export default function SearchHeader(props: { itemList: categoryType[] }) {
  const router = useRouter();

  const handlePushLink = (name: string | undefined) => {
    if (name === undefined) {
      name = "전체";
    }
    router.push(`${router.pathname}?bigCategory=${name}`);
  };

  return (
    <div className="header-sub">
      <nav>
        <ul>
          <li
            key={0}
            className={
              router.query.bigCategory === "전체" ||
              router.query.bigCategory === undefined
                ? "active"
                : ""
            }
            onClick={() => handlePushLink("전체")}
          >
            전체
          </li>
          {props.itemList &&
            props.itemList.map((category: categoryType, idx: number) => (
              <li
                key={idx}
                className={
                  router.query.bigCategory === category.name ? "active" : ""
                }
                onClick={() => handlePushLink(category.name)}
              >
                {category.name}
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
