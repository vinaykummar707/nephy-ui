import useUserStore from '@/store/useUserStore';
import { UserRoles } from '@/enums.ts';
import { Button } from './ui/button';
import { ArrowSquareLeft, Logout } from 'iconsax-react';

const TopNavBar = () => {
	const { user, logout } = useUserStore();

	return (
		<div className="h-14 border-b px-4 inline-flex items-center justify-between dark:bg-neutral-800 dark:border-neutral-700 bg-white">
			<div className="inline-flex items-center gap-2">
				<div className="size-6 bg-secondary rounded-lg"></div>
				<h1 className="font-bold dark:text-white text-md">Nephbuddy</h1>
			</div>

			<div className="inline-flex items-center gap-2">
				{/* <Moon variant="Linear" size={24} className="text-neutral-900" /> */}
				<div className="size-8 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
				<p className="text-sm font-medium">
					{user?.role === UserRoles.HOSPITAL_ADMIN && user.email}
				</p>
			</div>

			{/* <Button variant="outline" onClick={logout} size="icon">
				<Logout size={18} />
			</Button> */}
		</div>
	);
};

export default TopNavBar;
