"use client";

import React from "react";

// React Wizard
import { useWizard } from "react-use-wizard";

// Components
import { WizardNavigation, WizardProgress } from "@/app/components";

type WizardStepProps = {
    children: React.ReactNode;
};

const WizardStep = ({ children }: WizardStepProps) => {
    const wizard = useWizard();
    return (
        <div className="flex flex-col gap-4 w-full h-full">
            {/* <WizardProgress wizard={wizard} /> */}
            <div>{children}</div>
            <WizardNavigation />
        </div>
    );
};

export default WizardStep;
