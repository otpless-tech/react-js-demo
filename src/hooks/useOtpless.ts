import { useEffect, useState } from "react";

type OTPlessCallback = (eventCallback: any) => void;

interface OTPlessRequest {
	channel: "PHONE" | "EMAIL" | "OAUTH";
	phone?: string;
	email?: string;
	countryCode?: string;
	otp?: string;
	metaData?: string;
	channelType?: "WHATSAPP" | "GMAIL" | "TRUE_CALLER";
}

interface OTPlessParams {
	requestType: "initiate" | "verify";
	request: OTPlessRequest;
}

let OTPlessSignin: any = null;

const loadOTPlessSdk = async (callback: OTPlessCallback) => {
	return new Promise<void>((resolve) => {
		if (document.getElementById("otpless-sdk") && OTPlessSignin) {
			resolve();
			return;
		}

		const appId = "K8K415KI2VMZV27648JJ";

		const script = document.createElement("script");
		script.src = `https://otpless.com/v4/headless.js`;
		script.id = "otpless-sdk";
		script.setAttribute("data-appid", appId);

		script.onload = function () {
			const OTPless = Reflect.get(window, "OTPless");
			OTPlessSignin = new OTPless(callback);
			resolve();
		};

		document.head.appendChild(script);
	});
};

export const useOtpless = (callback: OTPlessCallback) => {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		loadOTPlessSdk(callback).then(() => setIsReady(true));
	}, [callback]);

	const hitOTPlessSdk = async (params: OTPlessParams) => {
		await loadOTPlessSdk(callback);
		const { requestType, request } = params;
		return await OTPlessSignin[requestType](request);
	};

	return {
		isReady,
		hitOTPlessSdk,
	};
};
