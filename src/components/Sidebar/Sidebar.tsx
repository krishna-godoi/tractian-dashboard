import { useContext, useEffect, useRef, useState } from 'react';
import './Sidebar.style.css';
import { AssetsContext } from '../../context/AssetsContext';
import CloseIcon from '../../assets/close.svg';
import FallbackImage from '../../assets/empty.svg'

export const Sidebar = () => {
	const { assetMap, activeComponent, activeCompany, setActiveComponent } = useContext(AssetsContext);
	const [open, setOpen] = useState(false);
	const component = assetMap[activeComponent];

	const imgInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setOpen(false);
	}, [activeCompany])

	useEffect(() => {
		setOpen(!!component?.id);
	}, [activeComponent, assetMap])

	const handleCloseButtonClick = () => {
		setOpen(false);
		setActiveComponent("");
	}

	const handleImgInputClick = () => {
		if (imgInput.current) {
			imgInput.current.click();
		}
	}

	return (
		<dialog tabIndex={-1} open={open} className={`sidebar`}>
			<aside>
				<header>
					<h2 className={`with-icon ${component?.sensorType} ${component?.status}`}>{component?.name}</h2>
					<button onClick={handleCloseButtonClick} autoFocus><img src={CloseIcon} alt='close button icon' /></button>
				</header>
				<div className='sidebar-content'>
					<section className='component-image'>
						<div onClick={handleImgInputClick}>
							<input ref={imgInput} type='file' hidden />
							<img src={FallbackImage} alt={`Picture of ${component?.name}`} />
							<span>Adicionar imagem do Ativo</span>
						</div>
						<h3>Tipo de Equipamento</h3>
						<p>Motor Elétrico (Trifásico)</p>
					</section>
					<section className='accountable'>
						<h3>Responsáveis</h3>
						<p>Elétrica</p>
					</section>
					{component?.sensorId && (
						<section className='sensor'>
							<h3>Sensor</h3>
							<p>{component?.sensorId}</p>
						</section>
					)} {component?.gatewayId && (
						<section className='gateway'>
							<h3>Receptor</h3>
							<p>{component?.gatewayId}</p>
						</section>
					)}
				</div>
			</aside>
		</dialog>
	)
}

export default Sidebar;
