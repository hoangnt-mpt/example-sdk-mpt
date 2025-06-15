import { useState } from "react";
import "./Login.css";

interface LoginData {
  tenantId: string;
  account: string;
  password: string;
}

interface LoginProps {
  onLoginSuccess: (loginData: LoginData) => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [loginData, setLoginData] = useState<LoginData>({
    tenantId: "demo",
    account: "admin",
    password: "123456",
  });

  const [loginSso, setLoginSso] = useState<boolean>(true); // Default to SSO mode

  const toggleLoginMode = () => {
    setLoginSso(!loginSso);
    console.log(
      "🔄 Login mode switched - React Vite:",
      !loginSso ? "SSO" : "Form",
      "| Current value:",
      !loginSso
    );
  };

  const isFormValid = (): boolean => {
    return (
      loginData.tenantId.trim() !== "" &&
      loginData.account.trim() !== "" &&
      loginData.password.trim() !== ""
    );
  };

  const handleInputChange = (field: keyof LoginData, value: string) => {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log("🔐 Login attempt - React Vite:", loginData);

      // Simple validation for demo
      if (
        loginData.tenantId === "demo" &&
        loginData.account === "admin" &&
        loginData.password === "123456"
      ) {
        console.log("✅ Login successful - React Vite");
        onLoginSuccess(loginData);

        // Thêm logic tích hợp với @mptransformation/omisdk tại đây
      } else {
        alert("❌ Sai thông tin đăng nhập! Sử dụng: demo/admin/123456");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔐 React Vite Call Manager</h1>
          <p>Đăng nhập để sử dụng dịch vụ call</p>

          {/* SSO Toggle Switch */}
          <div className="sso-toggle">
            <label className="switch">
              <input
                type="checkbox"
                checked={loginSso}
                onChange={toggleLoginMode}
              />
              <span className="slider"></span>
            </label>
            <span className="toggle-label">
              {loginSso ? "🚀 SSO Mode" : "📝 Form Mode"}
            </span>
          </div>
        </div>

        {/* SSO Mode: Only Login Button */}
        {loginSso === true && (
          <div className="sso-login">
            <div className="sso-info">
              <p>
                <strong>👤 Tài khoản:</strong> admin
              </p>
              <p>
                <strong>🏢 Tenant:</strong> demo
              </p>
              <p>
                <strong>🔑 Đã xác thực:</strong> Sẵn sàng đăng nhập
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-lg w-100 sso-btn"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              🚀 Đăng nhập SSO
            </button>
          </div>
        )}

        {/* Form Mode: Full Login Form */}
        {loginSso === false && (
          <div className="form-mode">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="tenantId">Tenant ID</label>
                <input
                  type="text"
                  id="tenantId"
                  value={loginData.tenantId}
                  onChange={(e) =>
                    handleInputChange("tenantId", e.target.value)
                  }
                  className="form-control"
                  placeholder="Nhập Tenant ID..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="account">Tài khoản</label>
                <input
                  type="text"
                  id="account"
                  value={loginData.account}
                  onChange={(e) => handleInputChange("account", e.target.value)}
                  className="form-control"
                  placeholder="Nhập tài khoản..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="form-control"
                  placeholder="Nhập mật khẩu..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 login-btn"
                disabled={!isFormValid()}
              >
                🚀 Đăng nhập
              </button>
            </form>
          </div>
        )}

        <div className="login-footer">
          <p>
            Demo credentials: tenantId: "demo", account: "admin", password:
            "123456"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
