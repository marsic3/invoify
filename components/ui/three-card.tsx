"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "./3d-card";

export function ThreeDCardDemo({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <CardContainer className="inter-var">
            {children}
        </CardContainer>
    );
}
