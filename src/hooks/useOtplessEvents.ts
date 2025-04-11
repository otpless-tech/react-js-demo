import { useNavigate } from "react-router-dom";

interface OTPlessEventCallbackResponse {
	token?: string;
	otp?: string;
	phone?: string;
	countryCode?: string;
}

interface OTPlessEventCallback {
	responseType: "ONETAP" | "OTP_AUTO_READ" | "FAILED" | "FALLBACK_TRIGGERED";
	response: OTPlessEventCallbackResponse;
}

export const useOtplessEvents = (options?: {
	onOtpReceived?: (otp: string) => void;
	currentToken?: string;
}) => {
	const navigate = useNavigate();

	const handleCallback = (eventCallback: OTPlessEventCallback) => {
		const ONETAP = () => {
			const { response } = eventCallback;
			console.log({ response });

			navigate("/home");
		};

		const OTP_AUTO_READ = () => {
			const {
				response: { otp },
			} = eventCallback;
			if (otp && options?.onOtpReceived) {
				options.onOtpReceived(otp);
			}
		};

		const FAILED = () => {
			console.error("OTPless operation failed:", eventCallback.response);
		};

		const FALLBACK_TRIGGERED = () => {
			console.log("Fallback triggered:", eventCallback.response);
		};

		const EVENTS_MAP = {
			ONETAP,
			OTP_AUTO_READ,
			FAILED,
			FALLBACK_TRIGGERED,
		} as const;

		EVENTS_MAP[eventCallback.responseType]();
	};

	return handleCallback;
};
