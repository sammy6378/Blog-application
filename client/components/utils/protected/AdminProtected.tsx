import { useContextFunc } from "@/components/context/AppContext";
import { redirect } from "next/navigation";


export default function AdminProtected({children}: {children: React.ReactNode}) {
    const {userInfo} = useContextFunc();
    if(userInfo?.role !== 'admin' ) {
        redirect('/');
    }

    return <>{children}</>

}