export interface Order {
  id?: number;
  number?: string;
  finalePrice?: number;
  userId?: number;
  guestId?: string;
  shippingAddressId?: number;
  billingAddressId?: number;
  userPaymentMethodId?: number;
  orderStatus?: number;
  shippingMethodId?: number;
  invoice?: Blob;
  comments?: string;
  DueDate?: Date;
  orderProducts?: Array<OrderProduct>;
}

interface OrderProduct {
  quantity: number;
  price: number;
  SizeId: number;
  ProductOptionsId: number;
}

interface OrderToPlace {
  userId?: number;
  shippingAddressId: number;
  billingAddressId: number;
  userPaymentMethodId: number;
  shippingMethodId: number;
  comments?: string;
}