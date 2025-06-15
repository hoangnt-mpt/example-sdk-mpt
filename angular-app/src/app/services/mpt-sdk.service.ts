import { Injectable } from "@angular/core";
import { OmiSDK } from "../../types";

// SDK Interfaces
export interface AppEvent {
  name: string;
  type: string;
  timestamp: number;
  message: string;
  error?: Error;
}

export interface CallEvent {
  name: string;
  type: string;
  timestamp: number;
  senderId: string;
  applicationId: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
}

export interface LoginParams {
  tenantId: number;
  username: string;
  password: string;
}

declare global {
  interface Window {
    OmiSDK: any;
  }
}

@Injectable({
  providedIn: "root",
})
export class MptSdkService {
  private sdk: OmiSDK.SDK | null = null;
  private isInitialized: boolean = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    // Load SDK script
    this.loadSDKScript();
  }

  public loadSDKScript() {
    if (typeof window === "undefined") return;

    // Check if script is already loaded
    if (window.OmiSDK) {
      console.log("✅ SDK script already loaded");
      this.initializeSDK();
      return;
    }

    // Create script element
    const script = document.createElement("script");
    script.src = "/assets/js/omisdk.js"; // Local SDK file
    script.async = true;
    script.onload = () => {
      console.log("✅ SDK script loaded");
      this.initializeSDK();
    };
    script.onerror = (error) => {
      console.error("❌ Failed to load SDK script:", error);
    };

    // Add script to document
    document.head.appendChild(script);
  }

  private initializeSDK() {
    if (typeof window === "undefined" || !window.OmiSDK) {
      console.warn("⚠️ MPT SDK not available - running in demo mode");
      return;
    }

    try {
      this.sdk = new window.OmiSDK({
        targetElementId: "sdk-container",
        mode: "none", // Headless mode
        debug: true,
        theme: {
          primaryColor: "#6f42c1",
          secondaryColor: "#e91e63",
        },
      });
      console.log("✅ SDK instance created");
    } catch (error) {
      console.error("❌ Failed to create SDK instance:", error);
    }
  }

  init(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      if (!this.sdk) {
        const error = new Error(
          "SDK not available - waiting for script to load"
        );
        console.warn("⚠️", error.message);
        reject(error);
        return;
      }

      if (this.isInitialized) {
        console.log("ℹ️ SDK already initialized");
        resolve();
        return;
      }

      try {
        this.sdk.init();
        this.isInitialized = true;
        console.log("✅ SDK initialized successfully");
        resolve();
      } catch (error) {
        console.error("❌ Failed to initialize SDK:", error);
        reject(error);
      }
    });

    return this.initPromise;
  }

  destroy(): void {
    if (this.sdk && this.isInitialized) {
      try {
        this.sdk.destroy();
        this.isInitialized = false;
        this.initPromise = null;
        console.log("✅ SDK destroyed successfully");
      } catch (error) {
        console.error("❌ Failed to destroy SDK:", error);
      }
    }
  }

  on(
    eventName: string,
    callback: (event: OmiSDK.AppEvent | OmiSDK.CallEvent) => void
  ): void {
    if (this.sdk && this.isInitialized) {
      this.sdk.on(eventName, callback);
    }
  }

  async login(params: OmiSDK.LoginParams): Promise<OmiSDK.LoginResponse> {
    if (!this.sdk) {
      throw new Error("SDK not available - please wait for SDK to load");
    }
    if (!this.isInitialized) {
      throw new Error("SDK not initialized - please wait for initialization");
    }
    return await this.sdk.login(params);
  }

  async logout(): Promise<void> {
    if (this.sdk && this.isInitialized) {
      await this.sdk.logout();
    }
  }

  async cameraOn(): Promise<void> {
    if (this.sdk && this.isInitialized) {
      await this.sdk.cameraOn();
    }
  }

  async cameraOff(): Promise<void> {
    if (this.sdk && this.isInitialized) {
      await this.sdk.cameraOff();
    }
  }
}
export const omiSDK = new MptSdkService();
