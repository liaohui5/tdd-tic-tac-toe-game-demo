import { createPinia } from "pinia";
import { App } from "vue";

export function setupStore(app: App): void {
  const store = createPinia();
  app.use(store);
}
