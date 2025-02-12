import Navbar from "@/components/navbar"

export default function Layout({children}:{children: React.ReactNode}){
 return(
    <main className="font-work-sans h-screen">
    <Navbar />
    {children}
    </main>
 )
}