<template>
  <div class="call-controls-container">
    <div class="call-status">
      <h3 class="mb-3">
        <span v-if="callStatus === 'incoming'">📞 Incoming Call</span>
        <span v-if="callStatus === 'active'">🟢 Call Active</span>
        <span v-if="callStatus === 'ended'">📵 Call Ended</span>
      </h3>
      <div v-if="callStatus === 'active'" class="call-info">
        <span :class="`badge ${isOnHold ? 'bg-warning' : 'bg-success'} me-2`">
          {{ isOnHold ? "⏸️ On Hold" : "▶️ Active" }}
        </span>
        <span :class="`badge ${isMuted ? 'bg-danger' : 'bg-primary'}`">
          {{ isMuted ? "🔇 Muted" : "🔊 Unmuted" }}
        </span>
      </div>
    </div>

    <div class="call-buttons">
      <div v-if="callStatus === 'incoming'" class="incoming-controls">
        <button
          class="btn btn-success btn-lg me-3 call-btn answer-btn"
          @click="handleAnswer()"
        >
          📞 Nghe
        </button>
        <button
          class="btn btn-danger btn-lg call-btn reject-btn"
          @click="handleReject()"
        >
          ❌ Từ chối
        </button>
      </div>

      <div v-if="callStatus === 'active'" class="active-controls">
        <div class="row g-2">
          <div class="col-6">
            <button
              :class="`btn btn-lg w-100 call-btn ${
                isOnHold ? 'btn-warning' : 'btn-outline-warning'
              }`"
              @click="handleHold()"
            >
              {{ isOnHold ? "▶️ Tiếp tục" : "⏸️ Hold" }}
            </button>
          </div>
          <div class="col-6">
            <button
              :class="`btn btn-lg w-100 call-btn ${
                isMuted ? 'btn-danger' : 'btn-outline-secondary'
              }`"
              @click="handleMute()"
            >
              {{ isMuted ? "🔊 Bật mic" : "🔇 Tắt mic" }}
            </button>
          </div>
          <div class="col-12">
            <button
              class="btn btn-danger btn-lg w-100 call-btn end-btn"
              @click="handleEnd()"
            >
              📵 Kết thúc
            </button>
          </div>
        </div>
      </div>

      <div v-if="callStatus === 'ended'" class="ended-controls">
        <button class="btn btn-primary btn-lg call-btn" @click="resetCall()">
          🔄 Tạo cuộc gọi mới
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOnHold = ref(false);
const isMuted = ref(false);
const callStatus = ref<"incoming" | "active" | "ended">("incoming");

const handleAnswer = (): void => {
  callStatus.value = "active";
  console.log("📞 Answered call - Vue 3");
  // Thêm logic tích hợp với @mptransformation/omisdk tại đây
};

const handleReject = (): void => {
  callStatus.value = "ended";
  console.log("❌ Rejected call - Vue 3");
  // Thêm logic tích hợp với @mptransformation/omisdk tại đây
};

const handleEnd = (): void => {
  callStatus.value = "ended";
  isOnHold.value = false;
  isMuted.value = false;
  console.log("📵 Ended call - Vue 3");
  // Thêm logic tích hợp với @mptransformation/omisdk tại đây
};

const handleHold = (): void => {
  isOnHold.value = !isOnHold.value;
  if (isOnHold.value) {
    console.log("⏸️ Call on hold - Vue 3");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  } else {
    console.log("▶️ Call resumed - Vue 3");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  }
};

const handleMute = (): void => {
  isMuted.value = !isMuted.value;
  if (isMuted.value) {
    console.log("🔇 Microphone muted - Vue 3");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  } else {
    console.log("🔊 Microphone unmuted - Vue 3");
    // Thêm logic tích hợp với @mptransformation/omisdk tại đây
  }
};

const resetCall = (): void => {
  callStatus.value = "incoming";
  isOnHold.value = false;
  isMuted.value = false;
  console.log("🔄 Call reset - Vue 3");
};
</script>

<style scoped>
.call-controls-container {
  background: linear-gradient(135deg, #4caf50 0%, #2196f3 100%);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  margin-bottom: 30px;
}

.call-status h3 {
  color: white;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.call-info {
  margin-bottom: 20px;
}

.call-btn {
  font-weight: 600;
  border-radius: 15px;
  padding: 12px 24px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: none;
  position: relative;
  overflow: hidden;
}

.call-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.call-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.answer-btn {
  background: linear-gradient(45deg, #28a745, #20c997);
  animation: pulse-green 2s infinite;
}

.reject-btn {
  background: linear-gradient(45deg, #dc3545, #e91e63);
  animation: pulse-red 2s infinite;
}

.end-btn {
  background: linear-gradient(45deg, #dc3545, #fd7e14);
  margin-top: 10px;
}

.incoming-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.active-controls .row {
  max-width: 400px;
  margin: 0 auto;
}

.ended-controls {
  margin-top: 20px;
}

/* Animations */
@keyframes pulse-green {
  0% {
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(40, 167, 69, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
  }
}

@keyframes pulse-red {
  0% {
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(220, 53, 69, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
  }
}

/* Responsive */
@media (max-width: 576px) {
  .incoming-controls {
    flex-direction: column;
  }

  .call-btn {
    width: 100%;
    min-width: 200px;
  }

  .incoming-controls .call-btn {
    margin: 5px 0;
  }
}

/* Badge styles */
.badge {
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 20px;
}

/* Button state variations */
.btn-outline-warning {
  color: #ffc107;
  border-color: #ffc107;
  background: rgba(255, 193, 7, 0.1);
}

.btn-outline-warning:hover {
  background: #ffc107;
  color: #000;
}

.btn-outline-secondary {
  color: #6c757d;
  border-color: #6c757d;
  background: rgba(108, 117, 125, 0.1);
}

.btn-outline-secondary:hover {
  background: #6c757d;
  color: white;
}
</style>
