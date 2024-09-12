"use client";

// React Wizard
import { useWizard } from "react-use-wizard";

// Components
import { BaseButton } from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { ArrowLeft, ArrowRight, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const WizardNavigation = () => {
    const { isFirstStep, isLastStep, handleStep, previousStep, nextStep } =
        useWizard();

    const { _t } = useTranslationContext();
    return (
        <div className="flex justify-end h-full items-end gap-5">
            {!isFirstStep && (
                <Button variant="expandIcon" Icon={ArrowLeft} iconPlacement="left" onClick={previousStep}>
                    {_t("form.wizard.back")}
                </Button>
            )}
            {/* <BaseButton
                tooltipLabel="Go to the next step"
                disabled={isLastStep}
                onClick={nextStep}
            >
                {_t("form.wizard.next")}
                <ArrowRight />
            </BaseButton> */}
            <Button variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right" disabled={isLastStep}
                onClick={nextStep}>
                {_t("form.wizard.next")}
            </Button>
        </div>
    );
};

export default WizardNavigation;
