import { HttpParameterCodec } from "@angular/common/http";

export class HttpUrlEncodingCodec implements HttpParameterCodec {

  encodeKey(key: string): string {
    return key + '_key'
  }

  encodeValue(value: string): string {
    return value + '_value'
  }

  decodeKey(key: string): string {
    return key;
  }

  decodeValue(value: string) {
    return value;
  }
}