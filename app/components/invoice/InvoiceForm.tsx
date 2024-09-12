"use client";

import { useMemo } from "react";

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
import { Wizard } from "react-use-wizard";

// Components
import {
    WizardStep,
    BillFromSection,
    BillToSection,
    InvoiceDetails,
    Items,
    PaymentInformation,
    InvoiceSummary,
} from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

const InvoiceForm = () => {
    const { _t } = useTranslationContext();

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

    return (
        <div className="flex h-full bg-slate-100 w-1/3">
            <Card className="h-auto w-full flex flex-col items-center bg-[#f0f8ff]">
                <CardHeader className="flex gap-2">
                    <div className="flex gap-1">
                        <CardTitle className="flex items-center gap-1" >
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
                    <Wizard>
                        <WizardStep>
                            <BillFromSection />
                        </WizardStep>
                        <WizardStep>
                            <BillToSection />
                        </WizardStep>
                        <WizardStep>
                            <div className="flex flex-wrap gap-y-10">
                                <InvoiceDetails />
                            </div>
                        </WizardStep>

                        <WizardStep>
                            <Items />
                        </WizardStep>

                        <WizardStep>
                            <PaymentInformation />
                        </WizardStep>

                        <WizardStep>
                            <InvoiceSummary />
                        </WizardStep>
                    </Wizard>
                </CardContent>
            </Card>
        </div>
    );
};

export default InvoiceForm;
