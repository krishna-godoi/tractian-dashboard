import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
	useTransition
} from "react";
import { CompanyType } from "../types/Company.type";
import { API_BASE_URL } from "../config/api";
import { AssetMap, TreeNodeType } from "../types/TreeNode.type";
import { buildMap } from "../utils/map";

export const AssetsContext = createContext<{
	companies: CompanyType[],
	activeCompany: string,
	activeCompanyName: string,
	setActiveCompany: Dispatch<SetStateAction<string>>,
	setActiveComponent: Dispatch<SetStateAction<string>>,
	assetMap: AssetMap,
	activeComponent: string,
	isPending: boolean,
}>({
	companies: [],
	activeCompany: "",
	setActiveCompany: () => { },
	setActiveComponent: () => { },
	assetMap: {},
	activeComponent: "",
	activeCompanyName: "",
	isPending: false,
})

const AssetsProvider = ({ children }: PropsWithChildren) => {
	const [companies, setCompanies] = useState<CompanyType[]>([]);
	const [activeCompany, setActiveCompany] = useState("");
	const [activeComponent, setActiveComponent] = useState("");
	const [assetMap, setAssetMap] = useState<AssetMap>({});
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		fetch(`${API_BASE_URL}/companies`).then(async (res) => {
			const body: CompanyType[] = await res.json();
			setCompanies(body);
			setActiveCompany(body[0].id);
		});
	}, []);

	useEffect(() => {
		if (!activeCompany) return;

		async function fetchAndBuild() {
			const baseUrl = `${API_BASE_URL}/companies/${activeCompany}`
			const requests = Promise.all(['locations', 'assets'].map((endpoint) => {
				return new Promise<TreeNodeType[]>(
					(resolve) => resolve(fetch(`${baseUrl}/${endpoint}`).then(res => {
						if (!res.ok) {
							throw new Error(res.statusText);
						}
						return res.json()
					})))
			}))

			const response = await requests;
			const map: AssetMap = {};

			response.forEach((arr, i) => arr.forEach((elem) => {
				if (i === 1 && elem.status) {
					elem.type = 'component';
				} else if (i === 1) {
					elem.type = 'asset';
				} else {
					elem.type = 'location'
				}

				buildMap(elem, map)
			}))

			startTransition(() => {
				setAssetMap(map)
			})
		}

		fetchAndBuild();
	}, [activeCompany]);

	const activeCompanyName = useMemo(() => companies.filter(
		(company) => company.id === activeCompany)[0]?.name,
		[activeCompany]
	)

	const value = useMemo(() => ({
		companies,
		activeCompany,
		setActiveCompany,
		assetMap,
		activeComponent,
		activeCompanyName,
		setActiveComponent,
		isPending
	}), [isPending, companies, assetMap, activeComponent])

	return (
		<AssetsContext.Provider value={value}>
			{children}
		</AssetsContext.Provider>
	)
}

export default AssetsProvider;
