import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarMenu = [
    {
        name: "Home",
        path: "/dashboard",
        icon: <HomeIcon/>
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <Person2Icon/>
    },
    {
        name: "Add Record",
        path: "/addnew",
        icon: <AddCircleIcon/>
    },
    {
        name: "Logout",
        path: "/",
        icon: <LogoutIcon/>
    },
]