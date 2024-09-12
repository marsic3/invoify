"use client";

// ShadCn
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Components
import {
    PdfViewer,
    BaseButton,
    NewInvoiceAlert,
    InvoiceLoaderModal,
    InvoiceExportModal,
} from "@/app/components";

// Contexts
import { useInvoiceContext } from "@/contexts/InvoiceContext";

// Icons
import { FileInput, FolderUp, Import, Plus } from "lucide-react";

const InvoiceActions = () => {
    const { invoicePdfLoading } = useInvoiceContext();

    return (
        // <div className="w-full">
        //     <Card className="h-auto sticky top-0 px-2">
        //         <CardHeader>
        //             <CardTitle>ACTIONS</CardTitle>
        //             <CardDescription>Operations and preview</CardDescription>
        //         </CardHeader>

        //         <div className="flex flex-col flex-wrap items-center gap-2">
        //             <div className="flex flex-wrap gap-3">
        //                 {/* Load modal button */}
        //                 <InvoiceLoaderModal>
        //                     <BaseButton
        //                         variant="default"
        //                         tooltipLabel="Open load invoice menu"
        //                         disabled={invoicePdfLoading}
        //                     >
        //                         <FolderUp />
        //                         Load Invoice
        //                     </BaseButton>
        //                 </InvoiceLoaderModal>

        //                 {/* Export modal button */}
        //                 <InvoiceExportModal>
        //                     <BaseButton
        //                         variant="default"
        //                         tooltipLabel="Open load invoice menu"
        //                         disabled={invoicePdfLoading}
        //                     >
        //                         <Import />
        //                         Export Invoice
        //                     </BaseButton>
        //                 </InvoiceExportModal>
        //             </div>

        //             <div className="flex flex-wrap gap-3">
        //                 {/* New invoice button */}
        //                 <NewInvoiceAlert>
        //                     <BaseButton
        //                         variant="default"
        //                         tooltipLabel="Get a new invoice form"
        //                         disabled={invoicePdfLoading}
        //                     >
        //                         <Plus />
        //                         New Invoice
        //                     </BaseButton>
        //                 </NewInvoiceAlert>

        //                 {/* Generate pdf button */}
        //                 <BaseButton
        //                     type="submit"
        //                     tooltipLabel="Generate your invoice"
        //                     loading={invoicePdfLoading}
        //                     loadingText="Generating your invoice"
        //                 >
        //                     <FileInput />
        //                     Generate PDF
        //                 </BaseButton>
        //             </div>

        //             <div className="w-full">
        //                 {/* Live preview and Final pdf */}
        //                 <PdfViewer />
        //             </div>
        //         </div>
        //     </Card>
        // </div>
        // <div className="relative z-10 flex items-center">
        //     <div className="relative mx-auto flex w-[612.25px] origin-top scale-50 flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_0_0_1px_rgba(0,25,59,.05),0_1px_1px_0_rgba(0,25,59,.04),0_3px_3px_0_rgba(0,25,59,.03),_0_6px_4px_0_rgba(0,25,59,.02),0_11px_4px_0_rgba(0,25,59,.01),0_32px_24px_-12px_rgba(0,0,59,.06)] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[conic-gradient(from_var(--angle),transparent_0,#00C2FF_20%,transparent_25%)] before:p-[1px] before:opacity-0 before:[animation:inherit] before:[mask-composite:exclude!important] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] md:scale-[0.8] invoice:scale-100">
        //     </div>
        // </div>
        <PdfViewer />
    );
};

export default InvoiceActions;
