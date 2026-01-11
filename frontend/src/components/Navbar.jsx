import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquareCode, Settings, User } from "lucide-react";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    const navIcon =
        "flex items-center justify-center size-11 rounded-lg text-base-content/100 hover:text-base-content hover:bg-base-200 transition";


    return (
        <header
            className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
        >
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageSquareCode className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">Loqui</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to={"/settings"}
                            className={navIcon}
                        >
                            <Settings className="w-6 h-6" />
                            {/* <span className="hidden sm:inline">Settings</span> */}
                        </Link>

                        {authUser && (
                            <>
                                <Link to={"/profile"} className={navIcon}
                                >
                                    <User className="size-6" />
                                    {/* <span className="hidden sm:inline">Profile</span> */}
                                </Link>

                                <button className={navIcon} onClick={logout}>
                                    <LogOut className="size-6" />
                                    {/* <span className="hidden sm:inline">Logout</span> */}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Navbar;