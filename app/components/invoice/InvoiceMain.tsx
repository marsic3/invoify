"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import { Form } from "@/components/ui/form";

// Components
import { InvoiceActions, InvoiceForm } from "@/app/components";

// Context
import { useInvoiceContext } from "@/contexts/InvoiceContext";

// Types
import { InvoiceType } from "@/types";
import { useWizzardStore } from "@/app/store/wizzardStore";

const InvoiceMain = () => {
    const { handleSubmit } = useFormContext<InvoiceType>();

    // Get the needed values from invoice context
    const { onFormSubmit } = useInvoiceContext();

    const {
        activeStep,
        setActiveStep
    } = useWizzardStore() as any;

    const onWizardChange = (step: number) => {
        setActiveStep(step);
    }
    return (
        <div className="flex w-full h-full justify-between">
            <Form {...useFormContext<InvoiceType>()}>
                <form
                    onSubmit={handleSubmit(onFormSubmit, (err) => {
                        console.log(err);
                    })}
                    className="flex w-full h-full"
                >
                    <div className="flex w-full h-full justify-between">
                        <InvoiceForm onWizardChange={onWizardChange} activeStep={activeStep} />
                        <div className="not-prose flex w-full items-center justify-center z-[15] relative bg-custom-gradient shadow-light dark:shadow-dark">
                            <div className="flex flex-col items-center justify-center w-[45em] h-[55em] bg-white px-5 py-5 mb-5 shadow-sm border border-[#9999] rounded-md">
                                <InvoiceActions />
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default InvoiceMain;
