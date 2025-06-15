declare namespace OmiSDK {
  type AppEventType = "init" | "login" | "logout" | "error";
  type CallEventType = "start" | "end" | "error";

  interface Options {
    targetElementId: string;
    mode: "none" | "full" | "minimal";
    debug?: boolean;
    theme?: {
      primaryColor?: string;
      secondaryColor?: string;
    };
  }

  interface AppEvent {
    name: string;
    type: AppEventType;
    timestamp: number;
    message: string;
    error?: Error;
  }

  interface CallEvent {
    name: string;
    type: CallEventType;
    timestamp: number;
    senderId: string;
    applicationId: string;
  }

  interface LoginResponse {
    success: boolean;
    message?: string;
  }

  interface LoginParams {
    tenantId: number;
    username: string;
    password: string;
  }

  class SDK {
    constructor(options: Options);
    init(): void;
    destroy(): void;
    on(
      eventName: string,
      callback: (event: AppEvent | CallEvent) => void
    ): void;
    login(params: LoginParams): Promise<LoginResponse>;
    logout(): Promise<void>;
    cameraOn(): Promise<void>;
    cameraOff(): Promise<void>;
  }
}

// Export the namespace
export { OmiSDK };

// Make this file a module
export {};

// Now we can augment the global scope
declare global {
  interface Window {
    OmiSDK: any; // Use any type to avoid type conflicts
  }
}
