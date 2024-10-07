"use client";

// Components
import {
    DatePickerFormField,
    FormInput,
    FormFile,
    Subheading,
    // TemplateSelector,
} from "@/app/components";
import TokenSelector from "@/app/components/reusables/form-fields/CurrencySelector";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";
import { TokenInfo } from "@/lib/utils";

const InvoiceTerms = () => {
    const { _t } = useTranslationContext();

    return (
        <section className="flex flex-col flex-wrap gap-5 w-full">
            <Subheading>{_t("form.steps.invoiceDetails.heading")}:</Subheading>

            <div className="flex flex-row flex-wrap gap-5 w-full">
                <div className="flex flex-col gap-2 w-full">
                    <FormInput
                        name="details.invoiceNumber"
                        label={_t("form.steps.invoiceDetails.invoiceNumber")}
                        placeholder="#123456"
                        vertical
                    />

                    <DatePickerFormField
                        name="details.invoiceDate"
                        label={_t("form.steps.invoiceDetails.issuedDate")}
                    />

                    <DatePickerFormField
                        name="details.dueDate"
                        label={_t("form.steps.invoiceDetails.dueDate")}
                    />

                    <TokenSelector
                        name="details.currency"
                        label={_t("form.steps.invoiceDetails.currency")}
                        placeholder="Select Currency"
                    />
                </div>

            </div>
        </section>
    );
};

export default InvoiceTerms;
