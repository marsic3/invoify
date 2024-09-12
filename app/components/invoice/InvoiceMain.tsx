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
import { GridBackgroundDemo } from "@/components/ui/grid-background";
import { ThreeDCardDemo } from "@/components/ui/three-card";

const InvoiceMain = () => {
    const { handleSubmit } = useFormContext<InvoiceType>();

    // Get the needed values from invoice context
    const { onFormSubmit } = useInvoiceContext();

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
                        <InvoiceForm />
                        <ThreeDCardDemo>
                            <InvoiceActions />
                        </ThreeDCardDemo>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default InvoiceMain;
