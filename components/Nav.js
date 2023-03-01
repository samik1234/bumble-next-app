import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


export default function Nav() {
    const [user, loading] = useAuthState(auth);

    return (
        <nav className="flex justify-between items-center py-10">
            <Link href="/">
            <button className="text-2xl font-bold text-orange-400">
                  Bumble
                </button>
              
            </Link>
            <ul className="flex items-center gap-10">

                {!user && (
                    <Link href={"/auth/login"}>
                        <li className="py-2 px-4 text-sm bg-orange-500 text-white rounded-lg font-medium ml-8">
                            Join Now
                        </li>
                    </Link>
                )}
                {user && (
                    <div className="flex items-center gap-6">
                        <Link href="/post" >
                            <button className="font-medium bg-orange-500 text-white py-2 px-4 rounded-md text-sm">
                                Post
                            </button>
                        </Link>
                        <Link href="/dashboard">
                        <img className="w-12 rounded-full cursor-pointer"
                        src={user.photoURL} /> 
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
    );
}
