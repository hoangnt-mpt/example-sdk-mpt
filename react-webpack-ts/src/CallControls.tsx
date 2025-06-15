import { useState } from "react";
import "./CallControls.css";

interface CallControlsProps {
  onAnswer?: () => void;
  onReject?: () => void;
  onEnd?: () => void;
  onHold?: () => void;
  onUnHold?: () => void;
  onMute?: () => void;
  onUnMute?: () => void;
  onMakeCall?: (phoneNumber: string) => void;
}

const CallControls = ({
  onAnswer,
  onReject,
  onEnd,
  onHold,
  onUnHold,
  onMute,
  onUnMute,
  onMakeCall,
}: CallControlsProps) => {
  const [isOnHold, setIsOnHold] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callStatus, setCallStatus] = useState<
    "incoming" | "active" | "ended" | "dialing"
  >("incoming");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDialing, setIsDialing] = useState(false);

  const isPhoneNumberValid = (): boolean => {
    return (
      phoneNumber.trim().length >= 8 && /^[0-9+\-\s()]*$/.test(phoneNumber)
    );
  };

  const makeCall = () => {
    if (!isPhoneNumberValid()) return;

    setIsDialing(true);
    setCallStatus("dialing");
    onMakeCall?.(phoneNumber);
    console.log("📱 Making outbound call to:", phoneNumber, "- React Webpack");

    // Simulate call connection after 2 seconds
    setTimeout(() => {
      setIsDialing(false);
      setCallStatus("active");
      console.log("✅ Call connected - React Webpack");
    }, 2000);
  };

  const handleAnswer = () => {
    setCallStatus("active");
    onAnswer?.();
    console.log("📞 Answered call - React Webpack");
  };

  const handleReject = () => {
    setCallStatus("ended");
    onReject?.();
    console.log("❌ Rejected call - React Webpack");
  };

  const handleEnd = () => {
    setCallStatus("ended");
    setIsOnHold(false);
    setIsMuted(false);
    setIsDialing(false);
    onEnd?.();
    console.log("📵 Ended call - React Webpack");
  };

  const handleHold = () => {
    const newHoldState = !isOnHold;
    setIsOnHold(newHoldState);
    if (newHoldState) {
      onHold?.();
      console.log("⏸️ Call on hold - React Webpack");
    } else {
      onUnHold?.();
      console.log("▶️ Call resumed - React Webpack");
    }
  };

  const handleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    if (newMuteState) {
      onMute?.();
      console.log("🔇 Microphone muted - React Webpack");
    } else {
      onUnMute?.();
      console.log("🔊 Microphone unmuted - React Webpack");
    }
  };

  const resetCall = () => {
    setCallStatus("incoming");
    setIsOnHold(false);
    setIsMuted(false);
    setIsDialing(false);
    setPhoneNumber("");
    console.log("🔄 Call reset - React Webpack");
  };

  return (
    <div className="call-controls-container">
      {/* Outbound Call Section */}
      {callStatus === "incoming" && (
        <div className="outbound-section">
          <h4 className="mb-3">📱 Gọi đi</h4>
          <div className="outbound-controls">
            <div className="input-group mb-3">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="form-control form-control-lg"
                placeholder="Nhập số điện thoại..."
                disabled={isDialing}
              />
              <button
                className="btn btn-primary btn-lg"
                type="button"
                onClick={makeCall}
                disabled={!isPhoneNumberValid() || isDialing}
              >
                {isDialing ? "⏳ Đang gọi..." : "📞 Gọi"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call Status */}
      <div className="call-status">
        <h3 className="mb-3">
          {callStatus === "incoming" && "📞 Incoming Call"}
          {callStatus === "active" && "🟢 Call Active"}
          {callStatus === "ended" && "📵 Call Ended"}
          {callStatus === "dialing" && "📱 Đang gọi..."}
        </h3>
        {callStatus === "active" && (
          <div className="call-info">
            <span
              className={`badge ${isOnHold ? "bg-warning" : "bg-success"} me-2`}
            >
              {isOnHold ? "⏸️ On Hold" : "▶️ Active"}
            </span>
            <span className={`badge ${isMuted ? "bg-danger" : "bg-primary"}`}>
              {isMuted ? "🔇 Muted" : "🔊 Unmuted"}
            </span>
          </div>
        )}
        {callStatus === "dialing" && (
          <div className="dialing-info">
            <p>
              Đang gọi tới: <strong>{phoneNumber}</strong>
            </p>
          </div>
        )}
      </div>

      <div className="call-buttons">
        {callStatus === "incoming" && (
          <div className="incoming-controls">
            <button
              className="btn btn-success btn-lg me-3 call-btn answer-btn"
              onClick={handleAnswer}
            >
              📞 Nghe
            </button>
            <button
              className="btn btn-danger btn-lg call-btn reject-btn"
              onClick={handleReject}
            >
              ❌ Từ chối
            </button>
          </div>
        )}

        {callStatus === "dialing" && (
          <div className="dialing-controls">
            <button
              className="btn btn-danger btn-lg call-btn"
              onClick={handleEnd}
            >
              ❌ Hủy cuộc gọi
            </button>
          </div>
        )}

        {callStatus === "active" && (
          <div className="active-controls">
            <div className="row g-2">
              <div className="col-6">
                <button
                  className={`btn btn-lg w-100 call-btn ${
                    isOnHold ? "btn-warning" : "btn-outline-warning"
                  }`}
                  onClick={handleHold}
                >
                  {isOnHold ? "▶️ Tiếp tục" : "⏸️ Hold"}
                </button>
              </div>
              <div className="col-6">
                <button
                  className={`btn btn-lg w-100 call-btn ${
                    isMuted ? "btn-danger" : "btn-outline-secondary"
                  }`}
                  onClick={handleMute}
                >
                  {isMuted ? "🔊 Bật mic" : "🔇 Tắt mic"}
                </button>
              </div>
              <div className="col-12">
                <button
                  className="btn btn-danger btn-lg w-100 call-btn end-btn"
                  onClick={handleEnd}
                >
                  📵 Kết thúc
                </button>
              </div>
            </div>
          </div>
        )}

        {callStatus === "ended" && (
          <div className="ended-controls">
            <button
              className="btn btn-primary btn-lg call-btn"
              onClick={resetCall}
            >
              🔄 Tạo cuộc gọi mới
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallControls;
