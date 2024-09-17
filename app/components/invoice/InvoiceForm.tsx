"use client";

import { useEffect, useMemo } from "react";

// RHF
import { useFormContext, useWatch } from "react-hook-form";

// ShadCn
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// React Wizard
import { useWizard, Wizard } from "react-use-wizard";

// Components
import {
    WizardStep,
    BillFromSection,
    BillToSection,
    InvoiceDetails,
    Items,
    PaymentInformation,
    InvoiceSummary,
    BaseButton,
    InvoiceExportModal,
    InvoiceLoaderModal,
    NewInvoiceAlert,
    PdfViewer,
} from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";
import { FolderUp, Import, Plus, FileInput } from "lucide-react";
import { useInvoiceContext } from "@/contexts/InvoiceContext";

const InvoiceForm = ({ onWizardChange, activeStep }: { onWizardChange: (step: number) => void, activeStep: number }) => {
    const { _t } = useTranslationContext();
    const { invoicePdfLoading } = useInvoiceContext();


    const { control } = useFormContext();

    // Get invoice number variable
    const invoiceNumber = useWatch({
        name: "details.invoiceNumber",
        control,
    });

    const invoiceNumberLabel = useMemo(() => {
        if (invoiceNumber) {
            return `#${invoiceNumber}`;
        } else {
            return _t("form.newInvBadge");
        }
    }, [invoiceNumber]);

    const handleOnStepChange = (step: number) => {
        console.log(step);
        onWizardChange(step);
    }

    return (
        <div className="flex h-full bg-slate-100 w-1/3">
            <Card className="h-auto w-full flex flex-col items-center bg-white justify-between">
                <CardHeader className="flex gap-2 self-start pb-20">
                    <div className="flex gap-1">
                        <CardTitle className="flex items-start gap-1" >
                            <span className="uppercase text-xs font-semibold">
                                {_t("form.title")}
                            </span>
                        </CardTitle >
                        <Badge variant="default" className="w-fit">
                            <p className="text-xs">
                                {invoiceNumberLabel}
                            </p>
                        </Badge>
                    </div >
                    <CardDescription>{_t("form.description")}</CardDescription>
                </CardHeader >
                <CardContent className="flex flex-col w-full h-full items-center">
                    <Wizard onStepChange={handleOnStepChange}>
                        <WizardStep activeStep={activeStep}>
                            <BillFromSection />
                        </WizardStep>
                        <WizardStep activeStep={activeStep}>
                            <BillToSection />
                        </WizardStep>
                        <WizardStep activeStep={activeStep}>
                            <div className="flex flex-wrap gap-y-10">
                                <InvoiceDetails />
                            </div>
                        </WizardStep>

                        <WizardStep activeStep={activeStep}>
                            <Items />
                        </WizardStep>

                        <WizardStep activeStep={activeStep}>
                            <PaymentInformation />
                        </WizardStep>

                        <WizardStep activeStep={activeStep}>
                            <InvoiceSummary />
                        </WizardStep>
                        <WizardStep activeStep={activeStep}>
                            <>
                                <div className="w-full">
                                    <Card className="flex flex-col gap-2 w-full py-4">
                                        <CardHeader>
                                            <CardTitle>ACTIONS</CardTitle>
                                            <CardDescription>Operations and preview</CardDescription>
                                        </CardHeader>

                                        <div className="flex flex-col flex-wrap items-center gap-2">
                                            <div className="flex flex-wrap gap-3">
                                                {/* Load modal button */}
                                                <InvoiceLoaderModal>
                                                    <BaseButton
                                                        variant="default"
                                                        tooltipLabel="Open load invoice menu"
                                                        disabled={invoicePdfLoading}
                                                    >
                                                        <FolderUp />
                                                        Load Invoice
                                                    </BaseButton>
                                                </InvoiceLoaderModal>

                                                {/* Export modal button */}
                                                <InvoiceExportModal>
                                                    <BaseButton
                                                        variant="default"
                                                        tooltipLabel="Open load invoice menu"
                                                        disabled={invoicePdfLoading}
                                                    >
                                                        <Import />
                                                        Export Invoice
                                                    </BaseButton>
                                                </InvoiceExportModal>
                                            </div>

                                            <div className="flex flex-wrap gap-3">
                                                {/* New invoice button */}
                                                <NewInvoiceAlert>
                                                    <BaseButton
                                                        variant="default"
                                                        tooltipLabel="Get a new invoice form"
                                                        disabled={invoicePdfLoading}
                                                    >
                                                        <Plus />
                                                        New Invoice
                                                    </BaseButton>
                                                </NewInvoiceAlert>

                                                {/* Generate pdf button */}
                                                <BaseButton
                                                    type="submit"
                                                    tooltipLabel="Generate your invoice"
                                                    loading={invoicePdfLoading}
                                                    loadingText="Generating your invoice"
                                                >
                                                    <FileInput />
                                                    Generate PDF
                                                </BaseButton>
                                            </div>
                                        </div>
                                    </Card>
                                </div><div className="relative z-10 flex items-center">
                                    <div className="relative mx-auto flex w-[612.25px] origin-top scale-50 flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_0_0_1px_rgba(0,25,59,.05),0_1px_1px_0_rgba(0,25,59,.04),0_3px_3px_0_rgba(0,25,59,.03),_0_6px_4px_0_rgba(0,25,59,.02),0_11px_4px_0_rgba(0,25,59,.01),0_32px_24px_-12px_rgba(0,0,59,.06)] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[conic-gradient(from_var(--angle),transparent_0,#00C2FF_20%,transparent_25%)] before:p-[1px] before:opacity-0 before:[animation:inherit] before:[mask-composite:exclude!important] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] md:scale-[0.8] invoice:scale-100">
                                    </div>
                                </div>
                            </>
                        </WizardStep>
                    </Wizard>
                </CardContent>
            </Card>
        </div>
    );
};

export default InvoiceForm;
