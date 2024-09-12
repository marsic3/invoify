import { ReactNode } from "react";

// Types
import { InvoiceType } from "@/types";
import GithubCardSkew from "@/components/ui/github-card-skew";
import { ThreeDCardDemo } from "@/components/ui/three-card";

type InvoiceLayoutProps = {
    data: InvoiceType;
    children: ReactNode;
};

export default function InvoiceLayout({ data, children }: InvoiceLayoutProps) {
    const { sender, receiver, details } = data;

    // Instead of fetching all signature fonts, get the specific one user selected.
    const fontHref = details.signature?.fontFamily
        ? `https://fonts.googleapis.com/css2?family=${details?.signature?.fontFamily}&display=swap`
        : "";

    const head = (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
                rel="stylesheet"
            ></link>
            {details.signature?.fontFamily && (
                <>
                    <link href={fontHref} rel="stylesheet" />
                </>
            )}
        </>
    );

    return (
        <div className="flex h-full  w-full flex-1 flex-col items-center bg-[#FDFDFD] p-6 [perspective:1000px] invoice:relative invoice:h-auto invoice:max-h-none invoice:justify-center">
            {head}
            <section className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-full h-full flex flex-col items-center justify-start">
                    {children}
                </div>
            </section>
        </div>
    );
}
