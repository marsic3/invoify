"use client";

import { ChangeEvent, useRef, useState } from "react";

// RHF
import { useFormContext, useWatch } from "react-hook-form";

// ShadCn components
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

// Components
import { BaseButton } from "@/app/components";

// Icons
import { ImageMinus, PlusIcon, Trash2 } from "lucide-react";

// Types
import { NameType } from "@/types";

type FormFileProps = {
    name: NameType;
    label?: string;
    placeholder?: string;
};

const FormFile = ({ name, label, placeholder }: FormFileProps) => {
    const { control, setValue } = useFormContext();
    const [isHovered, setIsHovered] = useState(false);
    const logoImage = useWatch({
        name: name,
        control,
    });

    const [base64Image, setBase64Image] = useState<string>(logoImage ?? "");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target!.result as string;
                setBase64Image(base64String);
                setValue(name, base64String); // Set the value for form submission
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setBase64Image("");
        setValue(name, "");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <>
                        <FormItem className="flex w-full justify-between pb-2 items-center text-black border-b border-[#ebebeb] focus-within:border-[#0094FF] [&:hover:not(:focus-within)]:border-black/20" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            <Label>{label}:</Label>
                            {base64Image ? (
                                <div className="relative rounded-full flex justify-end items-center gap-2 h-full mt-0">
                                    <img
                                        id="logoImage"
                                        src={base64Image}
                                        className="w-8 h-8 rounded-full object-contain"
                                    />
                                    <div className="flex flex-col justify-end items-center bg-red-500 rounded-full">
                                        <Trash2 className="w-4 h-4 text-white m-2 cursor-pointer" onClick={removeLogo} />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex w-fit justify-center items-center">
                                    <Label
                                        htmlFor={name}
                                        className="flex justify-center items-center h-8 w-8 self-center rounded-full cursor-pointer bg-gray-100 border border-[#ebebeb] hover:border-gray-500"
                                    >
                                        <>
                                            <div className="flex flex-col justify-center items-center">
                                                <PlusIcon className="w-3 h-3" />
                                            </div>
                                            <FormControl>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    id={name}
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                    accept="image/*"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </>
                                    </Label>
                                </div>
                            )}
                        </FormItem>
                    </>
                )}
            />

        </>
    );
};

export default FormFile;
