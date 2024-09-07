import { NavLink } from "react-router-dom";

const NavItem = ({ icon, title, active, to }: any) => {
	return (
		<NavLink
			to={to}
			className={`inline-flex gap-2   ${
				active ? 'bg-primary dark:bg-neutral-700' : 'hover:bg-neutral-100'
			}  items-center py-2.5 px-3`}
		>
			{icon}

			<h1
				className={`text-sm capitalize font-medium ${
					active
						? ' text-primary-foreground '
						: ' text-neutral-900 dark:text-neutral-400'
				}`}
			>
				{title}
			</h1>
		</NavLink>
	);
};

export default NavItem;
