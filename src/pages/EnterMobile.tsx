import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOtpless } from "../hooks/useOtpless";
import { useOtplessEvents } from "../hooks/useOtplessEvents";

const EnterMobile: React.FC = () => {
	const navigate = useNavigate();
	const [phone, setPhone] = useState("");
	const [countryCode, setCountryCode] = useState("+91");

	const handleCallback = useOtplessEvents();
	const { hitOTPlessSdk, isReady } = useOtpless(handleCallback);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isReady || !phone || !countryCode) return;

		await hitOTPlessSdk({
			requestType: "initiate",
			request: {
				channel: "PHONE",
				phone,
				countryCode,
				metaData: JSON.stringify({
					firstName: "User",
					lastName: "Name",
				}),
			},
		});

		navigate("/enter-otp", {
			state: {
				phone,
				countryCode,
			},
		});
	};

	return (
		<div className="container">
			<h1>Enter Your Mobile Number</h1>
			<p>We'll send you a verification code</p>
			<form onSubmit={handleSubmit}>
				<select
					className="input-field"
					value={countryCode}
					onChange={(e) => setCountryCode(e.target.value)}
				>
					<option value="+91">India (+91)</option>
					<option value="+1">USA (+1)</option>
					<option value="+44">UK (+44)</option>
					<option value="+62">Indonesia (+62)</option>
				</select>
				<input
					type="tel"
					className="input-field"
					placeholder="Enter mobile number"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					pattern="[0-9]{10}"
					required
				/>
				<button type="submit" className="button" disabled={!isReady}>
					Send OTP
				</button>
			</form>
		</div>
	);
};

export default EnterMobile;
