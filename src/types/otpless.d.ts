declare global {
  interface Window {
    OTPless: typeof OTPless;
  }
}

interface OTPlessCallback {
  responseType?: 'ONETAP' | 'OTP_AUTO_READ' | 'FAILED' | 'FALLBACK_TRIGGERED';
  response: {
    token?: string;
    otp?: string;
    phone?: string;
    countryCode?: string;
  };
}

interface OTPlessInitiateParams {
  channel: 'PHONE';
  phone: string;
  countryCode: string;
}

interface OTPlessVerifyParams extends OTPlessInitiateParams {
  otp: string;
}

declare class OTPless {
  constructor(callback: (eventCallback: OTPlessCallback) => void);
  initiate(params: OTPlessInitiateParams): void;
  verify(params: OTPlessVerifyParams): void;
}

export {};
