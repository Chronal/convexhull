(ns chull.ui
  (:require [reagent.dom.client :as rdc]
            [re-frame.core :as rf]
            [shadow.cljs.modern :refer (js-await)]
            [chull.wasmffi :refer (add)]))

(def default-npoints 10)

(defn gen-points
  ([] (gen-points 10))
  ([n] (repeatedly n rand)))

(rf/reg-event-db
 :init
 (fn [_ _]
   {:points (gen-points)}))

(rf/reg-event-db
 :regen-points
 (fn [_ _]
   {:points (gen-points)}))

(defonce root-container
  (rdc/create-root (js/document.getElementById "app")))

(defn points [db _]
  (:points db))

(rf/reg-sub
 :points
 points)

(defn points-view []
  (let [ps @(rf/subscribe [:points])]
    [:<>
     [:h2 "Points"]
     [:ul (map #(vec [:li {:key (random-uuid)} %]) ps)]]))
(defn point-count-form [])

(defn canvas []
  [:canvas {:height (/ js/window.innerHeight 2)
            :id "canvas"
            :width (/ js/window.innerWidth 2)}])

(defn canvas-inner [])

(defn ui []
  [:main
   [:h1 "3D Convex Hull"]
   [canvas]
   [:aside
    [:label "Number of Points: "
     [:input {:type "number"
              :name "npoints"}]]
    [points-view]
    [:button#regen-button {:on-click #(rf/dispatch [:regen-points])} "Re-generate Points"]]])

(defn mount-ui []
  (rdc/render root-container [ui]))
