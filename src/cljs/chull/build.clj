(ns chull.build
  (:require
   [shadow.cljs.devtools.api :as shadow]
   [clojure.java.shell :refer (sh)]))

(defn webpack
  {:shadow.build/stage :flush} [build-state & args]
  (sh "webpack" "--config" "webpack.config.js")
  build-state)
