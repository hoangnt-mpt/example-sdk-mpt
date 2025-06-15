<template>
  <div class="container">
    <div class="header">
      <h1>MPT SDK Demo</h1>
      <Login :sdk-service="sdkService" />
    </div>

    <div class="main-content">
      <div class="sdk-container" id="sdk-container" ref="sdkContainer"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { MptSdkService } from "./services/mpt-sdk.service";
import Login from "./components/Login.vue";

export default {
  name: "App",
  components: {
    Login,
  },
  setup() {
    const sdkContainer = ref(null);
    const sdkService = new MptSdkService();

    onMounted(() => {
      // Subscribe to SDK events
      sdkService.on("app:event", (event) => {
        console.log("App Event:", event);
      });

      sdkService.on("call:event", (event) => {
        console.log("Call Event:", event);
      });

      // Initialize SDK after component mount
      setTimeout(() => {
        try {
          sdkService.init();
          console.log("✅ SDK initialized in App");
        } catch (error) {
          console.error("❌ Failed to initialize SDK in App:", error);
        }
      }, 0);
    });

    onUnmounted(() => {
      sdkService.destroy();
    });

    return {
      sdkContainer,
      sdkService,
    };
  },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.main-content {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.sdk-container {
  min-height: 400px;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>
