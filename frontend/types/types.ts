export interface user {
  id: number;
  name: string;
  email: string;
  address?: string;
}

export interface recommandTitle {
  id: number;
  title: string;
  data: object;
}

export interface productType {
  createDate?: string;
  updateDate?: string;
  id?: number;
  productId: number;
  name: string;
  price: number;
  description: string;
  thumbnailUrl: string;
  stock?: number;
  isBest: boolean;
  isNew: boolean;
  likeCount?: number;
  season?: string;
  bigTyep?: string;
  volume?: string;
  subType?: string;
}

export interface categoryType {
  id: number;
  name: string;
  type?: string;
  tag?: string;
}

export interface eventType {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  descriptionUrl: string;
  tag: string;
}

export interface cartItemType {
  id: number;
  quantity: number;
  user?: object;
  product: productType;
  deleted: boolean;
  checked: boolean;
}

export interface cartListType extends Array<cartItemType> {}

export interface modal {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface detailProductType {
  name: string;
  productId: number;
  description: string;
  price: number;
  subType: string;
  bigType: string;
  season: string;
  volume: string;
  thumbnailUrl?: string;
  isBest?: boolean;
  isNew?: boolean;
}

export interface bigCategory {
  typeName: string;
  typeCount: number;
}

export interface deliveryType {
  id?: number;
  addressNickname: string;
  baseAddress: string;
  detailAddress: string;
  isDefault: boolean | string;
  notice: string;
  phoneNumber1: string;
  phoneNumber2: string;
  receiver: string;
  zipCode: string;
}

export interface deliveryListType extends Array<deliveryType> {}

export interface payItem {
  productId: number;
  productName: string;
  productQuantity: number;
  productPrice: number;
}

export interface receipt {
  purchaseList: payItem[];
  shippingAddressId: number | undefined;
  shippingPrice: number;
  paymentType: string;
  cashReceipts: string;
  totalPrice: number;
}

export interface privateAgreeType {
  isAgree: boolean;
  isUseConfirm: boolean;
  isAdvertisingConfirm: boolean;
}

export interface orderType {
  addressNickname: string;
  baseAddress: string;
  cashReceipts: string;
  detailAddress: string;
  notice: string;
  paymentType: string;
  phoneNumber1: string;
  purchaseList: orderItemType[];
  receiver: string;
  shippingPrice: number;
  totalPrice: number;
  zipCode: string;
  orderId: string;
}

export interface orderItemType {
  productId: number;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productThumbnail: string;
}
