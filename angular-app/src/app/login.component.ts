import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MptSdkService } from "./services/mpt-sdk.service";

interface LoginData {
  tenantId: string;
  account: string;
  password: string;
}

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <h2>🔐 Angular Call Manager</h2>
          <p>Đăng nhập để sử dụng dịch vụ call</p>

          <!-- SSO Toggle Switch -->
          <div class="sso-toggle">
            <label class="switch">
              <input
                type="checkbox"
                [checked]="loginSso"
                (change)="toggleLoginMode()"
              />
              <span class="slider"></span>
            </label>
            <span class="toggle-label">
              {{ loginSso ? "🚀 SSO Mode" : "📝 Form Mode" }}
            </span>
          </div>
        </div>

        <!-- SSO Mode: Only Login Button -->
        <div *ngIf="loginSso" class="sso-login">
          <div class="sso-info">
            <p><strong>👤 Tài khoản:</strong> hoangnt</p>
            <p><strong>🏢 Tenant:</strong> 4</p>
            <p><strong>🔑 Đã xác thực:</strong> Sẵn sàng đăng nhập</p>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-lg w-100 sso-btn"
            (click)="onSSOLogin()"
            [disabled]="isLoading"
          >
            {{ isLoading ? "🔄 Đang đăng nhập..." : "🚀 Đăng nhập SSO" }}
          </button>
        </div>

        <!-- Form Mode: Full Login Form -->
        <div *ngIf="!loginSso">
          <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
            <div class="form-group">
              <label for="tenantId">Tenant ID</label>
              <input
                type="text"
                id="tenantId"
                name="tenantId"
                [(ngModel)]="loginData.tenantId"
                required
                #tenantId="ngModel"
                class="form-control"
                placeholder="Nhập Tenant ID"
              />
              <div
                *ngIf="tenantId.invalid && (tenantId.dirty || tenantId.touched)"
                class="error-message"
              >
                Tenant ID là bắt buộc
              </div>
            </div>

            <div class="form-group">
              <label for="account">Tài khoản</label>
              <input
                type="text"
                id="account"
                name="account"
                [(ngModel)]="loginData.account"
                required
                #account="ngModel"
                class="form-control"
                placeholder="Nhập tài khoản"
              />
              <div
                *ngIf="account.invalid && (account.dirty || account.touched)"
                class="error-message"
              >
                Tài khoản là bắt buộc
              </div>
            </div>

            <div class="form-group">
              <label for="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                [(ngModel)]="loginData.password"
                required
                #password="ngModel"
                class="form-control"
                placeholder="Nhập mật khẩu"
              />
              <div
                *ngIf="password.invalid && (password.dirty || password.touched)"
                class="error-message"
              >
                Mật khẩu là bắt buộc
              </div>
            </div>

            <div class="form-actions">
              <button
                type="submit"
                class="btn btn-primary"
                [disabled]="!loginForm.form.valid || isLoading"
              >
                {{ isLoading ? "🔄 Đang đăng nhập..." : "🔑 Đăng nhập" }}
              </button>
            </div>
          </form>
        </div>

        <div *ngIf="errorMessage" class="error-alert">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #6f42c1 0%, #e91e63 100%);
        padding: 20px;
      }

      .login-box {
        background: white;
        border-radius: 16px;
        padding: 40px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        width: 100%;
        max-width: 400px;
        animation: slideUp 0.5s ease-out;
      }

      .login-header {
        text-align: center;
        margin-bottom: 30px;
      }

      .login-header h2 {
        color: #6f42c1;
        margin-bottom: 10px;
        font-weight: 600;
      }

      .login-header p {
        color: #666;
        margin-bottom: 20px;
      }

      .sso-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
      }

      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 34px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background: linear-gradient(45deg, #6f42c1, #e91e63);
      }

      input:checked + .slider:before {
        transform: translateX(26px);
      }

      .toggle-label {
        font-weight: 500;
        color: #333;
      }

      .sso-login {
        text-align: center;
      }

      .sso-info {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        text-align: left;
      }

      .sso-info p {
        margin: 10px 0;
        color: #333;
      }

      .sso-info strong {
        color: #6f42c1;
      }

      .sso-btn {
        background: linear-gradient(45deg, #6f42c1, #e91e63);
        color: white;
        padding: 14px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .sso-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(111, 66, 193, 0.3);
      }

      .sso-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .form-group {
        margin-bottom: 20px;
      }

      label {
        display: block;
        margin-bottom: 8px;
        color: #333;
        font-weight: 500;
      }

      .form-control {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s ease;
      }

      .form-control:focus {
        border-color: #6f42c1;
        box-shadow: 0 0 0 3px rgba(111, 66, 193, 0.1);
        outline: none;
      }

      .error-message {
        color: #dc3545;
        font-size: 14px;
        margin-top: 5px;
      }

      .form-actions {
        margin-top: 30px;
      }

      .btn {
        width: 100%;
        padding: 14px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .btn-primary {
        background: linear-gradient(45deg, #6f42c1, #e91e63);
        color: white;
      }

      .btn-primary:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(111, 66, 193, 0.3);
      }

      .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .error-alert {
        margin-top: 20px;
        padding: 12px;
        background: #fee;
        border: 1px solid #fcc;
        border-radius: 8px;
        color: #dc3545;
        text-align: center;
        animation: shake 0.5s ease-in-out;
      }

      @keyframes shake {
        0%,
        100% {
          transform: translateX(0);
        }
        25% {
          transform: translateX(-5px);
        }
        75% {
          transform: translateX(5px);
        }
      }

      @media (max-width: 480px) {
        .login-box {
          padding: 30px 20px;
        }
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<LoginData>();

  loginData: LoginData = {
    tenantId: "",
    account: "",
    password: "",
  };

  loginSso: boolean = true; // Default to SSO mode
  isLoading: boolean = false;
  errorMessage: string = "";

  constructor(private sdkService: MptSdkService) {}

  ngOnInit() {
    try {
      this.initializeSDK();
    } catch (error) {
      console.error("❌ Failed to initialize SDK:", error);
      this.errorMessage = "Không thể khởi tạo SDK. Vui lòng tải lại trang.";
    }
  }

  private initializeSDK() {
    console.log("✅ SDK initialization requested");
  }

  toggleLoginMode(): void {
    this.loginSso = !this.loginSso;
    console.log(
      "🔄 Login mode switched - Angular:",
      this.loginSso ? "SSO" : "Form",
      "| Current value:",
      this.loginSso
    );
  }

  async onSSOLogin() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = "";

    try {
      const response = await this.sdkService.login({
        tenantId: 4,
        username: "hoangnt",
        password: "123456aA@1",
      });

      if (response.success) {
        console.log("✅ SSO Login successful");
        this.loginSuccess.emit({
          tenantId: "4",
          account: "hoangnt",
          password: "123456aA@1",
        });
      } else {
        this.errorMessage = response.message || "Đăng nhập SSO thất bại";
      }
    } catch (error) {
      console.error("❌ SSO Login error:", error);
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = "Lỗi khi đăng nhập SSO. Vui lòng thử lại.";
      }
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = "";

    try {
      const response = await this.sdkService.login({
        tenantId: parseInt(this.loginData.tenantId),
        username: this.loginData.account,
        password: this.loginData.password,
      });

      if (response.success) {
        console.log("✅ Login successful");
        this.loginSuccess.emit(this.loginData);
      } else {
        this.errorMessage = response.message || "Đăng nhập thất bại";
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = "Lỗi khi đăng nhập. Vui lòng thử lại.";
      }
    } finally {
      this.isLoading = false;
    }
  }
}
