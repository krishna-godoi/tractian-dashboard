import './App.css'
import logo from './assets/logo_tractian.svg'
import AssetTree from './components/AssetTree/AssetTree'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { TreeNodeType } from './types/TreeNode.type'
import AssetsProvider from './context/AssetsContext'

export type AssetMap = Record<string, TreeNodeType>;

function App() {
	return (
		<AssetsProvider>
			<header className='page-header'>
				<a href="/"><img src={logo} alt='TRACTIAN Logo' /></a>
				<Navbar />
			</header>
			<div className='content' role='tabpanel'>
				<AssetTree />
				<Sidebar />
			</div>
		</AssetsProvider>
	)
}

export default App
