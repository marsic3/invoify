"use client";

// Debounce
import { useDebounce } from "use-debounce";

// RHF
import { useFormContext } from "react-hook-form";

// Components
import { FinalPdf, LivePreview } from "@/app/components";

// Contexts
import { useInvoiceContext } from "@/contexts/InvoiceContext";

// Types
import { InvoiceType } from "@/types";
import Logo from "@/public/assets/img/invoify-logo.svg";

const PdfViewer = () => {
    const { invoicePdf } = useInvoiceContext();

    const { watch } = useFormContext<InvoiceType>();

    const [debouncedWatch] = useDebounce(watch, 1000);
    const formValues = debouncedWatch();
    const formValuesPlaceholder: InvoiceType = {
        sender: {
            name: "TechCorp Solutions",
            senderLogo: Logo,
            address: "123 Tech Avenue",
            zipCode: "12345",
            city: "Silicon Valley",
            country: "United States",
            email: "billing@techcorp.com",
            phone: "+1 (555) 123-4567",
            customInputs: [
                { key: "VAT Number", value: "US123456789" }
            ]
        },
        receiver: {
            name: "Global Innovations Inc.",
            receiverLogo: Logo,
            address: "456 Innovation Boulevard",
            zipCode: "67890",
            city: "Tech City",
            country: "Canada",
            email: "accounts@globalinnovations.com",
            phone: "+1 (555) 987-6543",
            customInputs: [
                { key: "Customer ID", value: "GI-789" }
            ]
        },
        details: {
            invoiceLogo: Logo,
            invoiceNumber: "INV-2024-001",
            invoiceDate: "2024-09-15",
            dueDate: "2024-10-15",
            purchaseOrderNumber: "PO-2024-456",
            currency: "USD",
            language: "en",
            items: [
                {
                    name: "Web Development Services",
                    description: "Frontend and backend development for e-commerce platform",
                    quantity: 80,
                    unitPrice: 100,
                    total: 12000
                },
                {
                    name: "UI/UX Design",
                    description: "User interface and experience design for mobile app",
                    quantity: 3,
                    unitPrice: 124,
                    total: 5000,
                }
            ],
            paymentInformation: {
                bankName: "TechBank",
                accountName: "TechCorp Solutions",
                accountNumber: "1234567890"
            },
            taxDetails: {
                amount: 12,
                taxID: "US123456789",
                amountType: "percentage"
            },
            discountDetails: {
                amount: 150,
                amountType: "fixed"
            },
            shippingDetails: {
                cost: 350,
                costType: "fixed"
            },
            subTotal: 17000.00,
            totalAmount: 17850.00,
            totalAmountInWords: "Seventeen thousand eight hundred and fifty dollars",
            additionalNotes: "Thank you for your business!",
            paymentTerms: "Net 30",
            signature: {
                data: "John Doe",
                fontFamily: "Helvetica"
            },
            updatedAt: "2024-09-11T10:30:00Z",
            pdfTemplate: 1,
        },
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            {invoicePdf.size == 0 ? (
                <LivePreview data={formValuesPlaceholder} />
            ) : (
                <FinalPdf />
            )}
        </div>
    );
};

export default PdfViewer;
