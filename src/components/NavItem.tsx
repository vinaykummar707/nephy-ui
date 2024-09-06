import { NavLink } from "react-router-dom";

const NavItem = ({ icon, title, active, to }: any) => {
	return (
		<NavLink
			to={to}
			className={`inline-flex gap-2  rounded-md ${
				active ? 'bg-primary dark:bg-neutral-700' : 'hover:bg-neutral-100'
			}  items-center px-3 h-10`}
		>
			{icon}

			<h1
				className={`text-sm capitalize font-semibold  ${
					active
						? ' text-primary-foreground'
						: ' text-primary dark:text-neutral-400'
				}`}
			>
				{title}
			</h1>
		</NavLink>
	);
};

export default NavItem;
