import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OFFLINE_QUEUE_KEY = '@offline_queue';

export interface OfflineAction {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
}

export class OfflineManager {
  private static instance: OfflineManager;
  private queue: OfflineAction[] = [];
  private isOnline = true;

  private constructor() {
    this.init();
  }

  static getInstance(): OfflineManager {
    if (!OfflineManager.instance) {
      OfflineManager.instance = new OfflineManager();
    }
    return OfflineManager.instance;
  }

  private async init() {
    // Load queue from storage
    const stored = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    if (stored) {
      this.queue = JSON.parse(stored);
    }

    // Monitor network status
    NetInfo.addEventListener((state) => {
      const wasOffline = !this.isOnline;
      this.isOnline = state.isConnected ?? false;

      if (wasOffline && this.isOnline) {
        this.processQueue();
      }
    });
  }

  async addToQueue(action: OfflineAction) {
    this.queue.push(action);
    await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(this.queue));
  }

  async removeFromQueue(actionId: string) {
    this.queue = this.queue.filter((a) => a.id !== actionId);
    await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(this.queue));
  }

  private async processQueue() {
    // Process queued actions when back online
    console.log(`Processing ${this.queue.length} queued actions`);
    // Implementation would sync with backend
  }

  isConnected(): boolean {
    return this.isOnline;
  }

  getQueue(): OfflineAction[] {
    return this.queue;
  }
}
