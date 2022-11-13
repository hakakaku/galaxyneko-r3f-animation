import { Stats } from "@react-three/drei";

function Monitor(props) {
	return (
		<>
			<Stats showPanel={0} className="FPS"></Stats>
			<Stats showPanel={1} className="MS"></Stats>
			<Stats showPanel={2} className="MB"></Stats>
		</>
	);
}

export default Monitor;
