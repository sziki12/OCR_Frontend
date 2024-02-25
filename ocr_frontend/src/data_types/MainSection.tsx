import MainToolbar from "@/data_types/Toolbar";

export default function MainSection({children}: Readonly<{
    children: React.ReactNode;
}>)
{
    return(
        <main className="min-h-screen">
            <MainToolbar/>
            <div className="p-24">
                {children}
            </div>
        </main>
    )
}