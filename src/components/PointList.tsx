import { vec3 } from "gl-matrix";
import PointItem from "./PointItem";

export default function PointList({ points }: { points: vec3[] }) {
	let pointRecords = points.map((point) => (
		<PointItem key={crypto.randomUUID()} point={point} />
	));
	return (
		<div>
			<table className="table-auto border border-collapse border-black text-lg">
				<thead>
					<tr>
						<th>X</th>
						<th>Y</th>
						<th>Z</th>
					</tr>
				</thead>
				<tbody>{pointRecords}</tbody>
			</table>
		</div>
	);
}
