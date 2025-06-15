import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-call-controls",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="call-controls-container">
      <!-- Outbound Call Section -->
      <div class="outbound-section" *ngIf="callStatus === 'incoming'">
        <h4 class="mb-3">📱 Gọi đi</h4>
        <div class="outbound-controls">
          <div class="input-group mb-3">
            <input
              type="tel"
              [(ngModel)]="phoneNumber"
              class="form-control form-control-lg"
              placeholder="Nhập số điện thoại..."
              [disabled]="isDialing"
            />
            <button
              class="btn btn-primary btn-lg"
              type="button"
              (click)="makeCall()"
              [disabled]="!isPhoneNumberValid() || isDialing"
            >
              {{ isDialing ? "⏳ Đang gọi..." : "📞 Gọi" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Call Status -->
      <div class="call-status">
        <h3 class="mb-3">
          <span *ngIf="callStatus === 'incoming'">📞 Incoming Call</span>
          <span *ngIf="callStatus === 'active'">🟢 Call Active</span>
          <span *ngIf="callStatus === 'ended'">📵 Call Ended</span>
          <span *ngIf="callStatus === 'dialing'">📱 Đang gọi...</span>
        </h3>
        <div *ngIf="callStatus === 'active'" class="call-info">
          <span
            [class]="
              'badge ' + (isOnHold ? 'bg-warning' : 'bg-success') + ' me-2'
            "
          >
            {{ isOnHold ? "⏸️ On Hold" : "▶️ Active" }}
          </span>
          <span [class]="'badge ' + (isMuted ? 'bg-danger' : 'bg-primary')">
            {{ isMuted ? "🔇 Muted" : "🔊 Unmuted" }}
          </span>
        </div>
        <div *ngIf="callStatus === 'dialing'" class="dialing-info">
          <p>
            Đang gọi tới: <strong>{{ phoneNumber }}</strong>
          </p>
        </div>
      </div>

      <div class="call-buttons">
        <div *ngIf="callStatus === 'incoming'" class="incoming-controls">
          <button
            class="btn btn-success btn-lg me-3 call-btn answer-btn"
            (click)="handleAnswer()"
          >
            📞 Nghe
          </button>
          <button
            class="btn btn-danger btn-lg call-btn reject-btn"
            (click)="handleReject()"
          >
            ❌ Từ chối
          </button>
        </div>

        <div *ngIf="callStatus === 'dialing'" class="dialing-controls">
          <button class="btn btn-danger btn-lg call-btn" (click)="handleEnd()">
            ❌ Hủy cuộc gọi
          </button>
        </div>

        <div *ngIf="callStatus === 'active'" class="active-controls">
          <div class="row g-2">
            <div class="col-6">
              <button
                [class]="
                  'btn btn-lg w-100 call-btn ' +
                  (isOnHold ? 'btn-warning' : 'btn-outline-warning')
                "
                (click)="handleHold()"
              >
                {{ isOnHold ? "▶️ Tiếp tục" : "⏸️ Hold" }}
              </button>
            </div>
            <div class="col-6">
              <button
                [class]="
                  'btn btn-lg w-100 call-btn ' +
                  (isMuted ? 'btn-danger' : 'btn-outline-secondary')
                "
                (click)="handleMute()"
              >
                {{ isMuted ? "🔊 Bật mic" : "🔇 Tắt mic" }}
              </button>
            </div>
            <div class="col-12">
              <button
                class="btn btn-danger btn-lg w-100 call-btn end-btn"
                (click)="handleEnd()"
              >
                📵 Kết thúc
              </button>
            </div>
          </div>
        </div>

        <div *ngIf="callStatus === 'ended'" class="ended-controls">
          <button class="btn btn-primary btn-lg call-btn" (click)="resetCall()">
            🔄 Tạo cuộc gọi mới
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./call-controls.component.css"],
})
export class CallControlsComponent {
  isOnHold = false;
  isMuted = false;
  callStatus: "incoming" | "active" | "ended" | "dialing" = "incoming";
  phoneNumber: string = "";
  isDialing = false;

  handleAnswer(): void {
    this.callStatus = "active";
    console.log("📞 Answered call - Angular");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  }

  handleReject(): void {
    this.callStatus = "ended";
    console.log("❌ Rejected call - Angular");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  }

  handleEnd(): void {
    this.callStatus = "ended";
    this.isOnHold = false;
    this.isMuted = false;
    this.isDialing = false;
    console.log("📵 Ended call - Angular");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  }

  handleHold(): void {
    this.isOnHold = !this.isOnHold;
    if (this.isOnHold) {
      console.log("⏸️ Call on hold - Angular");
      // Thêm logic tích hợp với @mptransformation/omisdk tại đây
    } else {
      console.log("▶️ Call resumed - Angular");
      // Thêm logic tích hợp với @mptransformation/omisdk tại đây
    }
  }

  handleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      console.log("🔇 Microphone muted - Angular");
      // Thêm logic tích hợp với @mptransformation/omisdk tại đây
    } else {
      console.log("🔊 Microphone unmuted - Angular");
      // Thêm logic tích hợp với @mptransformation/omisdk tại đây
    }
  }

  resetCall(): void {
    this.callStatus = "incoming";
    this.isOnHold = false;
    this.isMuted = false;
    this.isDialing = false;
    this.phoneNumber = "";
    console.log("🔄 Call reset - Angular");
  }

  isPhoneNumberValid(): boolean {
    // Simple phone number validation
    return (
      this.phoneNumber.trim().length >= 8 &&
      /^[0-9+\-\s()]*$/.test(this.phoneNumber)
    );
  }

  makeCall(): void {
    if (!this.isPhoneNumberValid()) return;

    this.isDialing = true;
    this.callStatus = "dialing";
    console.log("📱 Making outbound call to:", this.phoneNumber, "- Angular");

    // Simulate call connection after 2 seconds
    setTimeout(() => {
      this.isDialing = false;
      this.callStatus = "active";
      console.log("✅ Call connected - Angular");
    }, 2000);

    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  }
}
