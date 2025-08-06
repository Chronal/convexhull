(ns chull.wasmffi
  (:require
   [shadow.cljs.modern :refer (js-await)]

   ;;Apparently .js required
   ["chull_wasm.js" :as chull-wasm]))

(defn init [])

(defn greet [s]
  (js-await [m chull-wasm]
            (.greet m s)))

(defn add [a b]
  (+ a b))

;; (defn chull [points]
;;   (js-await [m chull-wasm]
;;             (.chull m points)))

;; (defn add [a b]
;;   (js-await [m chull-wasm]
;;             (.add a b)))
