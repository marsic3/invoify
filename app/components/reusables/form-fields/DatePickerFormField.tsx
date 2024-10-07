"use client";

import { useState } from "react";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

// Utils
import { cn } from "@/lib/utils";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Icons
import { CalendarIcon } from "lucide-react";

// Types
import { NameType } from "@/types";

type DatePickerFormFieldProps = {
    name: NameType;
    label?: string;
};

const DatePickerFormField = ({ name, label }: DatePickerFormFieldProps) => {
    const { control } = useFormContext();

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <div className="w-full relative group flex pb-2 items-center justify-between border-b border-[#ebebeb] transition-all focus-within:border-[#0094FF] [&:hover:not(:focus-within)]:border-black/20">
                            <div>
                                <FormLabel className="text-xs text-black">{`${label}:`}</FormLabel>
                            </div>
                            <div>
                                <Popover
                                    open={isPopoverOpen}
                                    onOpenChange={setIsPopoverOpen}
                                >
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"ghost"}
                                                className={cn(
                                                    !field.value &&
                                                    "text-muted-foreground text-xs font-normal"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-3 w-3" />
                                                {field.value ? (
                                                    new Date(
                                                        field.value
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        DATE_OPTIONS
                                                    )
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">
                                                        Pick a date
                                                    </span>
                                                )}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 border-none shadow-lg">
                                        <Calendar
                                            mode="single"
                                            captionLayout="buttons"
                                            defaultMonth={field.value ? new Date(field.value) : undefined}
                                            selected={field.value ? new Date(field.value) : undefined}
                                            onSelect={(e) => {
                                                field.onChange(e);
                                                setIsPopoverOpen(false);
                                            }}
                                            disabled={(date) =>
                                                date < new Date("1900-01-01")
                                            }
                                            fromYear={1960}
                                            toYear={
                                                new Date().getFullYear() + 30
                                            }
                                            initialFocus
                                            className="bg-white text-muted-foreground"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </div>
                        </div>
                    </FormItem>
                )}
            />
        </>
    );
};

export default DatePickerFormField;
