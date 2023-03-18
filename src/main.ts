import type { App } from "vue";
import { ErrorBoundary } from "./components";

export default {
  install: (app: App) => {
    app.component("error-boundary", ErrorBoundary);
  },
};

export { ErrorBoundary };
