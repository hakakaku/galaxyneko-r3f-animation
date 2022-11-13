import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Texts from "./components/texts";
import Donuts from "./components/donuts";
import Camera from "./components/camera";
import Controls from "./system/controls";
import Cat from "./components/cat";
import { Loader } from "@react-three/drei";
import Monitor from "./system/monitor";

export default function App() {
	const bufferSize = 100;
	const flyingSpeed = 50;
	const donutSize = 0.1;
	const donutDensity = 10;

	return (
		<div id="canvas-container">
			<Canvas>
				<Monitor />
				<Suspense fallback={null}>
					<Controls speed={flyingSpeed} bufferSize={bufferSize} />
					<group name="flying">
						<Camera bufferSize={bufferSize} />
						<Texts />
						<Cat />
					</group>
					<Donuts
						name="donuts0"
						donutsNumber={bufferSize * donutDensity}
						donutSize={donutSize}
						bufferSize={bufferSize}
						position={[0, 0, -bufferSize]}
					/>
					<Donuts
						name="donuts1"
						donutsNumber={bufferSize * donutDensity}
						donutSize={donutSize}
						bufferSize={bufferSize}
						position={[0, 0, 0]}
					/>
				</Suspense>
			</Canvas>
			<Loader />
		</div>
	);
}
