"use client";

// RHF
import { useFieldArray, useFormContext } from "react-hook-form";

// Components
import {
    BaseButton,
    FormCustomInput,
    FormFile,
    FormInput,
    Subheading,
} from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

const BillFromSection = () => {
    const { control } = useFormContext();

    const { _t } = useTranslationContext();

    const CUSTOM_INPUT_NAME = "sender.customInputs";
    const { fields, append, remove } = useFieldArray({
        control: control,
        name: CUSTOM_INPUT_NAME,
    });

    const addNewCustomInput = () => {
        append({
            key: "",
            value: "",
        });
    };

    const removeCustomInput = (index: number) => {
        remove(index);
    };

    return (
        <section className="flex flex-col gap-3 w-full">
            <Subheading>{_t("form.steps.fromAndTo.billFrom")}:</Subheading>
            <div className="flex flex-col gap-2 my-4">
                <FormInput
                    name="sender.email"
                    label={_t("form.steps.fromAndTo.email")}
                    placeholder="e.g. info@example.com"
                    vertical
                />
                {/* TODO: Add a tooltip to this label */}
                <Label className="text-xs text-[#999999] font-normal">
                    We will automatically populate the billing details if the company is found
                </Label>
            </div>
            <FormFile
                name="sender.senderLogo"
                label={_t(
                    "form.steps.fromAndTo.companyLogo"
                )}
                placeholder={_t(
                    "form.steps.fromAndTo.placeholder"
                )}
            />
            <FormInput
                name="sender.name"
                label={_t("form.steps.fromAndTo.name")}
                placeholder="Acme Inc."
                vertical
            />
            <FormInput
                name="sender.address"
                label={_t("form.steps.fromAndTo.address")}
                placeholder="1234 Main St."
                vertical
            />
            <FormInput
                name="sender.zipCode"
                label={_t("form.steps.fromAndTo.zipCode")}
                placeholder="12345"
                vertical
            />
            <FormInput
                name="sender.city"
                label={_t("form.steps.fromAndTo.city")}
                placeholder="Solana Beach"
                vertical
            />
            <FormInput
                name="sender.country"
                label={_t("form.steps.fromAndTo.country")}
                placeholder="Your country"
                vertical
            />

            <FormInput
                name="sender.phone"
                label={_t("form.steps.fromAndTo.phone")}
                // placeholder="Your phone number"
                vertical
            />

            {/* //? key = field.id fixes a bug where wrong field gets deleted  */}
            {fields?.map((field, index) => (
                <FormCustomInput
                    key={field.id}
                    index={index}
                    location={CUSTOM_INPUT_NAME}
                    removeField={removeCustomInput}
                />
            ))}

            <BaseButton
                tooltipLabel="Add custom input to sender"
                size="sm"
                variant="link"
                className="w-fit"
                onClick={addNewCustomInput}
            >
                <Plus />
                {_t("form.steps.fromAndTo.addCustomInput")}
            </BaseButton>
        </section>
    );
};

export default BillFromSection;
