// Components
import { InvoiceMain } from "@/app/components";
import { fetchAllSplTokens, TokenInfo } from "@/lib/utils";

export async function Home() {
    // const fetchedTokens = await fetchAllSplTokens();
    const fetchedTokens: TokenInfo[] = []

    return (
        <main className="flex flex-col w-full h-full">
            <InvoiceMain splTokens={fetchedTokens} />
        </main>
    );
}

export default Home;