import { NavLink } from "react-router-dom";

const NavItem = ({ icon, title, active, to }: any) => {
  return (
    <NavLink
      to={to}
      className={`inline-flex gap-2 rounded-md ${
        active && "bg-neutral-900 dark:bg-neutral-700"
      }  items-center px-3 h-9`}
    >
      {icon}

      <h1
        className={`text-sm capitalize font-semibold  ${
          active ? " text-white" : " text-neutral-900 dark:text-neutral-400"
        }`}
      >
        {title}
      </h1>
    </NavLink>
  );
};

export default NavItem;
