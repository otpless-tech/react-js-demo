import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useOtpless } from "../hooks/useOtpless";
import { useOtplessEvents } from "../hooks/useOtplessEvents";

interface LocationState {
	phone: string;
	countryCode: string;
	token: string;
}

const EnterOtp: React.FC = () => {
	const location = useLocation();
	const { phone, countryCode, token } = location.state as LocationState;
	const [otp, setOtp] = useState(Array(6).fill(""));

	const handleCallback = useOtplessEvents({
		onOtpReceived: (receivedOtp) => {
			const otpArray = receivedOtp.split("");
			setOtp(otpArray);
		},
		currentToken: token
	});

	const { hitOTPlessSdk, isReady } = useOtpless(handleCallback);

	const handleChange = (index: number, value: string) => {
		if (/^[0-9]?$/.test(value)) {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);

			// Auto-focus next input
			if (value && index < 5) {
				const nextInput = document.getElementById(`otp-${index + 1}`);
				nextInput?.focus();
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isReady && otp.join("").length === 6) {
			await hitOTPlessSdk({
				requestType: "verify",
				request: {
					channel: "PHONE",
					phone,
					countryCode,
					otp: otp.join(""),
				},
			});
		}
	};

	return (
		<div className="container">
			<h1>Enter OTP</h1>
			<p>Enter the verification code sent to {phone}</p>
			<form onSubmit={handleSubmit}>
				<div className="otp-container">
					{otp.map((digit, index) => (
						<input
							key={index}
							id={`otp-${index}`}
							type="text"
							maxLength={1}
							value={digit}
							onChange={(e) => handleChange(index, e.target.value)}
							className="otp-input"
						/>
					))}
				</div>
				<button type="submit" className="button" disabled={!isReady}>
					Verify OTP
				</button>
			</form>
		</div>
	);
};

export default EnterOtp;
