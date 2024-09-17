"use client";

import React, { useEffect } from "react";

// React Wizard
import { useWizard } from "react-use-wizard";

// Components
import { WizardNavigation, WizardProgress } from "@/app/components";

type WizardStepProps = {
    children: React.ReactNode;
    activeStep: number;
};

const WizardStep = ({ children, activeStep }: WizardStepProps) => {
    const { goToStep } = useWizard();

    const onWizardChange = (step: number) => {
        console.log(step);

    }

    useEffect(() => {
        goToStep(activeStep);
    }, [activeStep]);

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            {/* <WizardProgress wizard={wizard} /> */}
            <div>{children}</div>
            <WizardNavigation />
        </div>
    );
};

export default WizardStep;
