import { vec3 } from "gl-matrix";

export default function PointItem({ point }: { point: vec3 }) {
	return (
		<tr className="border border-black">
			<td className="border border-black">{point[0].toFixed(2)}</td>
			<td className="border border-black">{point[1].toFixed(2)}</td>
			<td className="border border-black">{point[2].toFixed(2)}</td>
		</tr>
	);
}
