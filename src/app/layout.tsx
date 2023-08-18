import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Visualising 3D Convex Hulls",
	description:
		"A WebGL application to compute and render 3d convex hulls for randomly generated points",
};

export default function Root({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
