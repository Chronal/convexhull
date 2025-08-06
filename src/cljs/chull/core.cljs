(ns chull.core
  (:require [re-frame.core :as rf]
            [chull.ui :refer (mount-ui)]
            [chull.wasmffi :as wasm]))

(defn ^:dev/after-load clear-cache-and-render!
  []
  ;; The `:dev/after-load` metadata causes this function to be called
  ;; after shadow-cljs hot-reloads code. We force a UI update by clearing
  ;; the Reframe subscription cache.
  (rf/clear-subscription-cache!)
  (mount-ui))

(defn run []
  (wasm/greet "World")
  (rf/dispatch [:init])
  (mount-ui))
