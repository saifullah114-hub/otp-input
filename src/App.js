import { useState, useRef, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const firstOtpRef = useRef(null);
  const secondOtpRef = useRef(null);
  const thirdOtpRef = useRef(null);
  const fourthOtpRef = useRef(null);
  function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  const handleMobileSubmit = () => {
    if (mobile.trim().length === 10) {
      alert(`OTP Sent to ${mobile}`);
      const generated = generateOTP();
      console.log(generated);
      setOtpSent(generated);
      setStep(2);
    } else {
      alert("Please Enter 10 digits mobile number");
    }
  };
  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleSubmitOtp = (finalOtp) => {
    const entered = otp.join("");
    if (finalOtp === otpSent) {
      alert("OTP Verified");
    } else {
      alert("Incorrect OTP");
    }
  };
  useEffect(() => {
    if (step === 2) {
      inputRefs.current[0]?.focus();
    }
  }, [step]);
  useEffect(() => {
    const enteredOtp = otp.join("");
    const isCompleted = otp.every((digit) => digit !== "");
    if (isCompleted) {
      handleSubmitOtp(enteredOtp);
    }
  }, [otp]);
  return (
    <div className="App">
      <div>
        {step === 1 && (
          <div
            style={{ maxWidth: 300, padding: "20px", border: "1px solid #ddd" }}
          >
            <h3 style={{ marginBottom: 8, fontWeight: 600 }}>
              OTP Verification
            </h3>
            <p style={{ color: "#555" }}>We will sen you one time password</p>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter Mobile Number"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 6,
                border: "1px solid #ccc",
                margin: "16px 0",
              }}
            />
            <button
              style={{
                padding: "10px",
                backgroundColor: "blue",
                color: "white",
                fontWeight: "bold",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
              disabled={!(mobile.length === 10)}
              onClick={handleMobileSubmit}
            >
              Get OTP
            </button>
          </div>
        )}
        {step === 2 && (
          <>
            <h3>OTP Verification</h3>
            <p>Enter the OTP sent to {mobile}</p>
            <div>
              {otp.map((val, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  ref={(el) => (inputRefs.current[i] = el)}
                  value={val}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                />
              ))}
            </div>
            <button onClick={handleSubmitOtp}>Submit</button>
          </>
        )}
      </div>
    </div>
  );
}
