function Cat(props) {
	return (
		<mesh name="cat" position={[0, -2, 5]}>
			<boxGeometry args={[1, 1, 2]} />
			<meshBasicMaterial />
		</mesh>
	);
}

export default Cat;
