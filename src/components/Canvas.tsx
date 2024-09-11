import { initWebGL } from "@/lib/gfx.ts";

import dynamic from "next/dynamic";
import { vec3 } from "gl-matrix";
import { useEffect, useRef } from "react";

async function CanvasWrapper() {

	const { greet, puts } = await import("wasm-convexhull");

	return function Canvas( { points }: { points: vec3[] }) {
		const ref = useRef(null);
		useEffect(() => {
			// Copy to avoid mutation errors with react
			initWebGL([...points]);
			puts("G'day!");
		}, [points]);

		return <canvas id="glcanvas" width="640" height="480"></canvas>;
	}
}

export default dynamic(CanvasWrapper, {
	ssr: false,
	loading: () => <p>Loading WASM...</p>
});
