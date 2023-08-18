"use client";

import Canvas from "@/components/Canvas.tsx";
import PointList from "@/components/PointList.tsx";
import Button from "@/components/Button.tsx";
import {
	generateCube,
	generatePyramid,
	generateRandomPoints,
} from "@/lib/gfx.ts";

import { vec3 } from "gl-matrix";
import { useState } from "react";

export default function Visualiser() {
	const [points, setPoints] = useState(generatePyramid());

	return (
		<main className="space-y-4">
			<header>
				<h1 className="text-center text-4xl">3D Convex Hull Visualiser</h1>
			</header>

			<div className="flex flex-row items-center justify-center gap-x-4">
				<Canvas points={points} />
				<PointList points={points} />
			</div>

			<div className="flex flex-row space-x-4 items-center justify-center">
				<Button
					text={"Load Pyramid "}
					clickHandler={() => setPoints(generatePyramid())}
				/>
				<Button
					text={"Generate Random Points"}
					clickHandler={() => setPoints(generateRandomPoints())}
				/>
				{/*
                <Button
                    text={"Load Cube"}
                    clickHandler={() => setPoints(generateCube())}
                />*/}
			</div>

			<p className="text-center">
				This is a simple webgl application that generates a set of points in 3d
				space and then computes and renders the convex hull. There are still
				some bugs to be fixed in the convex hull algorithm.
			</p>

			<p className="text-center">
				Source code for this website can be found{" "}
				<a
					className="text-blue-600 visited:text-purple-600"
					href="https://github.com/Chronal/convexhull"
				>
					here
				</a>
			</p>
		</main>
	);
}
