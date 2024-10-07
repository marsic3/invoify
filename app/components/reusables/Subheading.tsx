import React from "react";

type SubheadingProps = {
    children: React.ReactNode;
};

export default function Subheading({ children }: SubheadingProps) {
    return <h4 className="text-2xl my-4 font-semibold text-black">{children}</h4>;
}
