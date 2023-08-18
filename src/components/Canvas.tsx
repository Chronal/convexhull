import { useEffect, useRef } from "react";
import { initWebGL } from "@/lib/gfx.ts";
import { vec3 } from "gl-matrix";

export default function Canvas({ points }: { points: vec3[] }) {
	const ref = useRef(null);

	useEffect(() => {
		// Copy to avoid mutation errors with react
		initWebGL([...points]);
	}, [points]);

	return <canvas id="glcanvas" width="640" height="480"></canvas>;
}
