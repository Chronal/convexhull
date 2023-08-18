import { MouseEventHandler } from "react";

export default function Button({
	text,
	clickHandler,
}: {
	text: string;
	clickHandler: MouseEventHandler;
}) {
	return (
		<button
			className="border-4 border-slate-600 bg-white rounded"
			onClick={clickHandler}
		>
			{" "}
			{text}{" "}
		</button>
	);
}
