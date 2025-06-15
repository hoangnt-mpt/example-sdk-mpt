import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { CallControlsComponent } from "./call-controls.component";
import { omiSDK } from "./services/mpt-sdk.service";

interface LoginData {
  tenantId: string;
  account: string;
  password: string;
}

// MPT SDK interfaces
interface AppEvent {
  name: string;
  type: string;
  timestamp: number;
  message: string;
  error?: Error;
}

interface CallEvent {
  name: string;
  type: string;
  timestamp: number;
  senderId: string;
  applicationId: string;
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent, CallControlsComponent],
  template: `
    <div class="app">
      <!-- Login Screen -->
      <div *ngIf="!isLoggedIn">
        <app-login (loginSuccess)="onLoginSuccess($event)"></app-login>
      </div>

      <!-- Call Controls Screen - Only show when connected -->
      <div *ngIf="isLoggedIn && isConnected" class="call-app">
        <header class="app-header">
          <div class="header-content">
            <h1>📞 Angular Call Manager</h1>
            <div class="user-info">
              <span class="user-badge"
                >👤 {{ userInfo?.account }} &#64; {{ userInfo?.tenantId }}</span
              >
              <button
                class="btn btn-sm btn-outline-light logout-btn"
                (click)="logout()"
              >
                🚪 Đăng xuất
              </button>
            </div>
          </div>
        </header>

        <main class="main-content">
          <app-call-controls></app-call-controls>
        </main>
      </div>

      <!-- Loading Screen when logged in but not connected -->
      <div
        *ngIf="isLoggedIn && !isConnected && !showErrorPopup"
        class="loading-screen"
      >
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <h2>🔄 Đang kết nối...</h2>
          <p>Vui lòng chờ trong giây lát</p>
        </div>
      </div>

      <!-- Error Popup -->
      <div *ngIf="showErrorPopup" class="error-overlay">
        <div class="error-popup">
          <div class="error-header">
            <h3>⚠️ Lỗi kết nối</h3>
          </div>
          <div class="error-body">
            <p><strong>Trạng thái:</strong> {{ errorType }}</p>
            <p><strong>Thông báo:</strong> {{ errorMessage }}</p>
            <div class="error-details">
              <p *ngIf="errorType === 'token_expired'">
                🔑 Token đã hết hạn. Vui lòng đăng nhập lại.
              </p>
              <p *ngIf="errorType === 'network_error'">
                🌐 Lỗi mạng. Kiểm tra kết nối internet.
              </p>
              <p *ngIf="errorType === 'disconnected'">
                🔌 Mất kết nối với server.
              </p>
            </div>
          </div>
          <div class="error-actions">
            <button
              class="btn btn-primary error-btn"
              (click)="resetConnection()"
            >
              🔄 Kết nối lại
            </button>
            <button class="btn btn-secondary error-btn" (click)="logout()">
              🚪 Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isConnected: boolean = false;
  userInfo: LoginData | null = null;
  showErrorPopup: boolean = false;
  errorType: string = "";
  errorMessage: string = "";

  private sdk: any = null;

  ngOnInit() {
    this.initializeSDK();
  }

  ngOnDestroy() {
    if (this.sdk) {
      this.sdk.destroy();
    }
  }

  ngAfterViewInit() {
    omiSDK.loadSDKScript();
  }

  private async initializeSDK() {
    try {
      // Check if SDK is available
      if (typeof window !== "undefined" && window.OmiSDK) {
        this.sdk = new window.OmiSDK({
          targetElementId: "sdk-container",
          mode: "none", // Headless mode
          debug: true,
          theme: {
            primaryColor: "#4CAF50",
            secondaryColor: "#45a049",
            bubblePosition: "bottom-right",
            backgroundColor: "#fff",
            fontFamily: "Arial",
          },
        });

        // Initialize SDK
        this.sdk.init();

        // Listen for App Events
        this.sdk.on("AppEvent", (event: AppEvent) => {
          console.log("🔔 AppEvent received:", event);
          this.handleAppEvent(event);
        });

        // Listen for Call Events
        this.sdk.on("CallEvent", (event: CallEvent) => {
          console.log("📞 CallEvent received:", event);
          this.handleCallEvent(event);
        });

        console.log("✅ MPT SDK initialized successfully");
      } else {
        console.warn("⚠️ MPT SDK not available - running in demo mode");
      }
    } catch (error) {
      console.error("❌ Failed to initialize MPT SDK:", error);
    }
  }

  private handleAppEvent(event: AppEvent) {
    switch (event.type) {
      case "connected":
        console.log("🟢 Connected to MPT server");
        this.isConnected = true;
        this.showErrorPopup = false;
        break;

      case "token_expired":
        console.log("🔑 Token expired");
        this.showError("token_expired", "Token đã hết hạn");
        break;

      case "network_error":
        console.log("🌐 Network error");
        this.showError("network_error", "Lỗi kết nối mạng");
        break;

      case "disconnected":
        console.log("🔌 Disconnected from server");
        this.showError("disconnected", "Mất kết nối với server");
        break;

      case "ready":
        console.log("🚀 SDK is ready");
        break;

      case "logged_in":
        console.log("👤 User logged in via SDK");
        break;

      case "logged_out":
        console.log("🚪 User logged out via SDK");
        this.isConnected = false;
        break;

      case "error":
        console.log("❌ SDK error:", event.message);
        this.showError("error", event.message || "Có lỗi xảy ra");
        break;

      default:
        console.log("📋 Other AppEvent:", event.type, event.message);
    }
  }

  private handleCallEvent(event: CallEvent) {
    // Handle call events here if needed
    console.log("📞 Call event:", event.type);
  }

  private showError(type: string, message: string) {
    this.errorType = type;
    this.errorMessage = message;
    this.showErrorPopup = true;
    this.isConnected = false;
  }

  async onLoginSuccess(loginData: LoginData): Promise<void> {
    this.isLoggedIn = true;
    this.userInfo = loginData;
    console.log("🎉 Login successful in App Component:", loginData);

    // Attempt to login with MPT SDK
    if (this.sdk) {
      try {
        const response = await this.sdk.login({
          tenantId: parseInt(loginData.tenantId),
          username: loginData.account,
          password: loginData.password,
        });

        console.log("🔐 MPT SDK login response:", response);

        if (response.success) {
          console.log("✅ MPT SDK login successful");
          // Connection status will be updated via AppEvent
        } else {
          console.error("❌ MPT SDK login failed:", response.message);
          this.showError(
            "login_failed",
            response.message || "Đăng nhập SDK thất bại"
          );
        }
      } catch (error) {
        console.error("❌ MPT SDK login error:", error);
        this.showError("login_error", "Lỗi khi đăng nhập SDK");
      }
    } else {
      // Demo mode - simulate connection after delay
      setTimeout(() => {
        this.isConnected = true;
      }, 2000);
    }
  }

  async logout(): Promise<void> {
    // Logout from MPT SDK if available
    if (this.sdk) {
      try {
        await this.sdk.logout();
        console.log("🚪 MPT SDK logout successful");
      } catch (error) {
        console.error("❌ MPT SDK logout error:", error);
      }
    }

    this.isLoggedIn = false;
    this.isConnected = false;
    this.userInfo = null;
    this.showErrorPopup = false;
    console.log("🚪 User logged out");
  }

  async resetConnection(): Promise<void> {
    this.showErrorPopup = false;
    this.isConnected = false;

    if (this.sdk && this.userInfo) {
      try {
        console.log("🔄 Attempting to reconnect...");

        // Try to reconnect
        const response = await this.sdk.login({
          tenantId: parseInt(this.userInfo.tenantId),
          username: this.userInfo.account,
          password: this.userInfo.password,
        });

        if (response.success) {
          console.log("✅ Reconnection successful");
        } else {
          console.error("❌ Reconnection failed:", response.message);
          this.showError("reconnect_failed", "Không thể kết nối lại");
        }
      } catch (error) {
        console.error("❌ Reconnection error:", error);
        this.showError("reconnect_error", "Lỗi khi kết nối lại");
      }
    } else {
      // Demo mode - simulate reconnection
      setTimeout(() => {
        this.isConnected = true;
      }, 1500);
    }
  }

  async cameraOn(): Promise<void> {
    if (this.sdk) {
      try {
        await this.sdk.cameraOn();
        console.log("✅ Camera turned on");
      } catch (error) {
        console.error("❌ Failed to turn on camera:", error);
        this.showError("camera_error", "Lỗi khi bật camera");
      }
    }
  }

  async cameraOff(): Promise<void> {
    if (this.sdk) {
      try {
        await this.sdk.cameraOff();
        console.log("✅ Camera turned off");
      } catch (error) {
        console.error("❌ Failed to turn off camera:", error);
        this.showError("camera_error", "Lỗi khi tắt camera");
      }
    }
  }
}
