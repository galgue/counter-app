

export const Counter = (props: {
	count: number,
	onIncrement: () => void,
	onDecrement: () => void,
	onDelete: () => void,
}) => {
	const { count, onDecrement,onIncrement, onDelete } = props;
	return (
		<div className="flex flex-row">
			<div onClick={onIncrement} className="cursor-pointer">+</div>
			<div>{count}</div>
			{
				count  
					? <div onClick={onDecrement} className="cursor-pointer">-</div>
					: <div onClick={onDelete} className="cursor-pointer">X</div>
			}
		</div>
	)
}