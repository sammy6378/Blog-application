import Loader from "@/components/Loader/Loader";


export default function Loading() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div>
                <Loader />
            </div>
        </div>
    )
}