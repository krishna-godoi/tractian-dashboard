import { useContext } from 'react';
import './Navbar.style.css';
import { AssetsContext } from '../../context/AssetsContext';

type CompanyType = {
	id: string
	name: string
}

export const Navbar = () => {
	const { setActiveCompany, companies, activeCompany } = useContext(AssetsContext);

	const handleClick = (company: CompanyType) => {
		setActiveCompany(company.id)
	}
	return <nav role='tablist' className='companies'>
		{companies.map(
			(company) => (
				<button
					key={company.id}
					data-active={company.id === activeCompany}
					onClick={() => handleClick(company)}
					role='tab'
				>
					{`${company.name} Unit`}
				</button>
			)
		)}
	</nav>
}

export default Navbar;
