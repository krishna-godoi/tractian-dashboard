import { AssetsContext } from '../../context/AssetsContext.tsx';
import FiltersProvider from '../../context/FiltersContext.tsx';
import FilterButton from '../FilterButton/FilterButton.tsx';
import Search from '../Search/Search.tsx';
import TreeNode from '../TreeNode/TreeNode.tsx';
import './AssetTree.style.css';
import { useContext, useMemo } from 'react';

const Assets = () => {
	const { assetMap, activeCompanyName, isPending } = useContext(AssetsContext)

	const assetArr = useMemo(() => Object.values(assetMap), [assetMap])

	return (
		<main>
			<FiltersProvider>
				<header>
					<h1>Ativos<span> / {activeCompanyName} Unit</span></h1>
					<div className='filters'>
						<span>Filtrar por:</span>
						<FilterButton id="energy" label="Sensor de Energia" />
						<FilterButton id="critical" label="Crítico" />
					</div>
				</header>
				<div className='search'>
					<Search />
				</div>
			</FiltersProvider>
			<div className='asset-view'>
				<div id='filter-root' className={`tree-content`}>
					{
						isPending ? "Loading..." : assetArr.map((elem) => {
							const hasParent = !!(elem.parentId || elem.locationId)
							if (!hasParent) {
								return (
									<TreeNode key={elem.id} elem={elem} map={assetMap} />
								);
							}
						})
					}
				</div>
			</div>
		</main >
	);
}

export default Assets;
