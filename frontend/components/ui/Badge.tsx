/** @jsxImportSource @emotion/react */
import { cartListType } from "@/types/types";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartCount,
  frozenCartListState,
  generalCartListState,
} from "../../state/cart";
import { accessTokenState } from "@/state/accessTokenState";
import axiosApiInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";

export default function Badge() {
  const [isUser, setIsUser] = useState(true);
  const accessToken = useRecoilValue(accessTokenState);

  const [frozenCart, setFrozenCart] =
    useRecoilState<cartListType>(frozenCartListState);
  const [generalCart, setGeneralCart] =
    useRecoilState<cartListType>(generalCartListState);
  const [count, setCount] = useRecoilState(cartCount);
  const router = useRouter();

  // 데이터 불러오기
  async function fetchGeneralData() {
    if (accessToken) {
      setTimeout(async () => {
        const generalResult = await axiosApiInstance
          .get("cart/my_cart", {
            headers: { Authorization: accessToken },
          })
          .then((res) => {
            setGeneralCart(res?.data);
          })
          .catch((err) => {
            if (err.response && err.response.status === 401) {
              setIsUser(false);
            }
          });
      }, 100);
    }
  }
  async function fetchFrozenData() {
    if (accessToken) {
      setTimeout(async () => {
        const frozenResult = await axiosApiInstance
          .get("cart/my_cart/ice", {
            headers: { Authorization: accessToken },
          })
          .then((res) => {
            setFrozenCart(res?.data);
          })
          .catch((err) => {
            if (err.response && err.response.status === 401) {
              setIsUser(false);
            }
          });
      });
    }
  }

  useEffect(() => {
    if (router.pathname !== "/cart") {
      fetchGeneralData();
      fetchFrozenData();
    }
  }, [
    accessToken,
    router.pathname,
    frozenCart.length,
    generalCart.length,
    count,
  ]);

  useEffect(() => {
    setCount(frozenCart?.length + generalCart?.length);
  });

  const badge = css`
    position: absolute;
    right: 44px;
    top: 8px;
    border-radius: 50%;
    background-color: var(--color-light-green);
    text-align: center;
    font-size: smaller;
    color: white;
    width: 1rem;
    height: 1rem;
    margin: 0;
    z-index: 100;
    opacity: 1 !important;
    line-height: 1rem;
  `;

  return <>{isUser && <p css={badge}>{count}</p>}</>;
}

/**
 * 값 바꿀 페이지에서
 * const [cart, setCart] = useRecoilState<number>(cartState)
 * cart -> 배지에 보일 숫자, setCart -> 숫자 조정하는거
 * <button onClick={()=>setCart(cart+1)}> 이런 형식으로 적용
 *
 * 값을 읽어 오기만 할 때는 useRecoilState 대신 useRecoilValue 사용
 * 값을 바꾸기만 할 때는 useSetRecoilState 사용
 *
 * setCart = useStateRecoilState<number>(cartState); 요렇게 쓰면 됨
 *
 */
