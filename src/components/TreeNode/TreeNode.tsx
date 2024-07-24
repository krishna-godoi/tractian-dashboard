import { useContext } from "react";
import { AssetMap, TreeNodeType } from "../../types/TreeNode.type";
import { AssetsContext } from "../../context/AssetsContext";
import './TreeNode.style.css'

export const TreeNode: React.FC<{ elem: TreeNodeType, map: AssetMap }> = ({ elem, map }) => {
	const { setActiveComponent, activeComponent } = useContext(AssetsContext);

	if (!elem) return null

	const handleComponentClick = (id: string, status?: string | null) => {
		if (!status) return;
		setActiveComponent(id);
	}

	if (!elem.children) {
		let classes = `${elem.type}`;
		if (elem.status) {
			classes += ` ${elem.status}`;
		}
		if (elem.sensorType) {
			classes += ` ${elem.sensorType}`;
		}
		if (elem.id === activeComponent) {
			classes += ` selected`
		}

		return <p id={elem.id} onClick={() => handleComponentClick(elem.id, elem.status)} className={`leaf ${classes}`}>{elem.name}</p>
	}

	return (
		<details open id={elem.id} className={`details-dropdown ${elem.type}`}>
			<summary className={`summary`}><span className='summary-title'>{elem.name}</span></summary>
			<div className='item-content'>
				{elem.children.map((child) =>
					<TreeNode key={child} elem={map[child]} map={map} />
				)}
			</div>
		</details>
	)
}

export default TreeNode
