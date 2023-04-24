import { deliveryType } from "@/types/types";
import React, { useState } from "react";
import BottomFixedContainer from "@/components/ui/BottomFixedContainer";
import Button from "@/components/ui/Button";
import ModalHeader from "@/components/ui/ModalHeader";
import { useRecoilState } from "recoil";
import { deliveryListState } from "@/state/delivery";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axiosApiInstance from "@/utils/axiosInstance";

export default function DeliveryRegister() {
  const [deliveryList, setDeliveryList] = useRecoilState(deliveryListState);
  const router = useRouter();

  const [form, setForm] = useState<deliveryType>({
    receiver: "",
    zipCode: "",
    addressNickname: "",
    detailAddress: "",
    baseAddress: "",
    phoneNumber1: "",
    phoneNumber2: "",
    notice: "",
    isDefault: "false",
  });

  const [phone1ErrMsg, setPhone1ErrMsg] = useState<string | null>();
  const [phone2ErrMsg, setPhone2ErrMsg] = useState<string | null>();
  const [zipErrMsg, setZipErrMsg] = useState<string | null>();

  const SubmitDelivery = async () => {
    if (
      form.receiver === "" ||
      form.zipCode === "" ||
      form.detailAddress === "" ||
      form.baseAddress === "" ||
      form.phoneNumber1 === ""
    ) {
      Swal.fire({
        icon: "warning",
        text: "필수 값을 입력해 주세요.",
      });
    } else {
      await axiosApiInstance.post(`/shipping-address`, {
        receiver: form.receiver,
        zipCode: form.zipCode,
        addressNickname: form.addressNickname,
        detailAddress: form.detailAddress,
        baseAddress: form.baseAddress,
        phoneNumber1: form.phoneNumber1,
        phoneNumber2: form.phoneNumber2,
        notice: form.notice,
        isDefault: form.isDefault,
      });
      setDeliveryList([...deliveryList, form]);
      router.back();
    }
  };

  const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
  const handlePhoneNumber1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    setForm({ ...form, phoneNumber1: e.target.value });
    if (!phoneRegex.test(e.target.value)) {
      setPhone1ErrMsg("⚠️전화번호를 올바르게 입력해 주세요.");
    } else setPhone1ErrMsg(null);
  };

  const handlePhoneNumber2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    setForm({ ...form, phoneNumber2: e.target.value });
    if (!phoneRegex.test(e.target.value)) {
      setPhone2ErrMsg("⚠️전화번호를 올바르게 입력해 주세요.");
    } else setPhone2ErrMsg(null);
  };

  const zipCodeRegex = /^\d{5}$/;
  const handleZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    setForm({ ...form, zipCode: e.target.value });
    if (!zipCodeRegex.test(e.target.value)) {
      setZipErrMsg("⚠️5자리 숫자를 입력해 주세요.");
    } else setZipErrMsg(null);
  };

  return (
    <>
      <ModalHeader headerName="배송지 등록" />
      <div className="cart-container">
        <div>
          <div id="info-header">
            <div>배송지 정보</div>
          </div>
          <section id="delivery-input">
            <div>
              <input
                type="text"
                placeholder="주소 별칭"
                value={form.addressNickname}
                onChange={(e) =>
                  setForm({ ...form, addressNickname: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="받는 분 *"
                value={form.receiver}
                onChange={(e) => setForm({ ...form, receiver: e.target.value })}
              />
              <input
                type="text"
                placeholder="우편번호 *"
                value={form.zipCode}
                maxLength={5}
                onChange={handleZipCode}
              />
              {zipErrMsg}
              <input
                type="text"
                placeholder="기본주소 *"
                value={form.baseAddress}
                onChange={(e) =>
                  setForm({ ...form, baseAddress: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="상세주소 *"
                value={form.detailAddress}
                onChange={(e) =>
                  setForm({ ...form, detailAddress: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="연락처1 *"
                maxLength={13}
                onChange={handlePhoneNumber1}
              />
              {phone1ErrMsg}
              <input
                type="text"
                placeholder="연락처2"
                maxLength={13}
                onChange={handlePhoneNumber2}
              />
              {phone2ErrMsg}
              <div className="delivery-memo">
                <p>배송 메모</p>
                <select
                  name=""
                  id=""
                  onChange={(e) => setForm({ ...form, notice: e.target.value })}
                >
                  <option value="">배송 메모를 선택해 주세요.</option>
                  <option value="배송 전 연락 바랍니다.">
                    배송 전 연락 바랍니다.
                  </option>
                  <option value="부재 시 경비실에 맡겨주세요.">
                    부재 시 경비실에 맡겨주세요.
                  </option>
                  <option value="부재 시 문 앞에 놓아주세요.">
                    부재 시 문 앞에 놓아주세요.
                  </option>
                  <option value="부재 시 전화 또는 문자 남겨주세요.">
                    부재 시 전화 또는 문자 남겨주세요.
                  </option>
                </select>
              </div>
            </div>
          </section>
          <BottomFixedContainer>
            <Button btnType="button" btnEvent={SubmitDelivery}>
              등록하기
            </Button>
          </BottomFixedContainer>
        </div>
      </div>
    </>
  );
}
