import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";
import Image from "next/image";
import { SkeletonField } from "./SkeletonField";
import { SkeletonLogo } from "./SkeletonLogo";
import useWizzardStore from "@/app/store/wizzardStore";

const InvoiceTemplate = (data: InvoiceType) => {
    const { sender, receiver, details } = data;
    const { activeStep, setActiveStep } = useWizzardStore() as any;

    console.log(details, 'details')

    return (
        <InvoiceLayout data={data}>
            <div className="card w-full h-fit items-start rounded-md border-b border-[#ebebeb] hover:bg-[#F1F5FF] cursor-pointer" onClick={() => setActiveStep(2)}>
                <div className="card-details">
                    <div className="group w-full  relative z-10 flex h-full justify-between">
                        <div className="text-lg font-semibold text-gray-500">
                            <h3 className="text-xs font-semibold uppercase text-gray-500 my-0">
                                Invoice NO
                            </h3>
                            <span className="text-lg font-semibold text-gray-800">
                                {details.invoiceNumber || <SkeletonField className="w-[100px]" />}
                            </span>
                        </div>
                        <div className="flex items-center gap-8 text-sm">
                            <dl className="flex flex-col justify-start items-start ">
                                <dt className="font-semibold text-gray-800">Issued</dt>
                                <dd className="text-gray-500 ml-0">
                                    <dd className="text-gray-500 ml-0">
                                        {details.invoiceDate ? (
                                            new Date(details.invoiceDate).toLocaleDateString("en-US")
                                        ) : (
                                            <SkeletonField className="w-[100px]" />
                                        )}
                                    </dd>
                                </dd>
                            </dl>
                            <dl className="flex flex-col justify-start items-start">
                                <dt className="font-semibold text-gray-800">Due date</dt>
                                <dd className="text-gray-500 ml-0">
                                    <dd className="text-gray-500 ml-0">
                                        {details.dueDate ? (
                                            new Date(details.dueDate).toLocaleDateString("en-US")
                                        ) : (
                                            <SkeletonField className="w-[100px]" />
                                        )}
                                    </dd>

                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            {/* create bill to and bill from section that will be 2 in grid */}
            <div className="grid grid-cols-2 w-full border-1 border-[#ebebeb] border-solid">
                <div className="card w-full rounded-md border-r border-[#ebebeb] hover:bg-[#F1F5FF] cursor-pointer" onClick={() => setActiveStep(0)}>
                    <div className="card-details">
                        <h3 className="text-xs font-semibold uppercase text-gray-500 my-2">
                            From
                        </h3>
                        {/* logo image -> name -> email -> address */}
                        <div className="flex flex-col items-start">
                            {sender.senderLogo ? (
                                <Image
                                    src={sender.senderLogo}
                                    width={140}
                                    height={100}
                                    alt={`Logo of ${sender.name}`}
                                    className="w-16 h-16 rounded-full object-contain"
                                />) : <SkeletonLogo />
                            }
                            <h3 className="mt-2 whitespace-normal text-xl font-medium text-gray-800">
                                {sender.name ? sender.name : <SkeletonField className="w-[100px]" />}
                            </h3>
                            <address className="flex flex-col gap-2 mt-2 not-italic text-[#999999] text-xs">
                                {sender.address ? <>
                                    {sender.address}
                                    <br />
                                </> : <SkeletonField className="w-[100px]" />}

                                {sender.zipCode && <>
                                    {sender.zipCode}
                                    <br />
                                </> ? `${sender.zipCode}, ${sender.city}` : <SkeletonField className="w-[100px]" />}

                                {sender.country ?
                                    <>
                                        {sender.country}
                                        <br />
                                    </>
                                    : <SkeletonField className="w-[100px]" />}
                            </address>

                        </div>
                    </div>
                </div>
                {/* vertical line */}
                {/* <div className="absolute h-[15.5em] w-[1px] right-[50%] bg-[#ebebeb]"></div> */}
                {/* receiver card */}
                <div className="card w-full rounded-md hover:bg-[#F1F5FF] cursor-pointer" onClick={() => setActiveStep(1)}>
                    <div className="card-details">
                        <h3 className="text-xs font-semibold uppercase text-gray-500 my-2">
                            To
                        </h3>
                        {receiver.receiverLogo ? (
                            <Image
                                src={receiver.receiverLogo}
                                width={140}
                                height={100}
                                alt={`Logo of ${receiver.name}`}
                                className="w-16 h-16 rounded-full object-contain"
                            />) : <SkeletonLogo />
                        }
                        <h3 className="mt-2 whitespace-normal text-xl font-medium text-gray-800">
                            {receiver.name ? receiver.name : <SkeletonField className="w-[100px]" />}
                        </h3>
                        <address className="flex flex-col gap-2 mt-2 not-italic text-[#999999] text-xs">
                            {receiver.address ? <>
                                {receiver.address}
                                <br />
                            </> : <SkeletonField className="w-[100px]" />}

                            {receiver.zipCode && <>
                                {receiver.zipCode}
                                <br />
                            </> ? `${receiver.zipCode}, ${receiver.city}` : <SkeletonField className="w-[100px]" />}

                            {receiver.country ?
                                <>
                                    {receiver.country}
                                    <br />
                                </>
                                : <SkeletonField className="w-[100px]" />}
                        </address>
                    </div>
                </div>
            </div>
            {/* horizontal line */}

            <div className="card w-full rounded-md hover:bg-[#F1F5FF] cursor-pointer" onClick={() => setActiveStep(3)}>
                <div className="card-details">
                    <div className="mt-3">
                        <div className="p-1 rounded-lg space-y-2 text-sm">
                            <div className="hidden sm:grid sm:grid-cols-5 my-1">
                                <div className="sm:col-span-2 text-xs font-medium text-[#999999] uppercase">
                                    Description
                                </div>
                                <div className="text-left text-xs font-medium text-[#999999]  uppercase">
                                    Qty
                                </div>
                                <div className="text-left text-xs font-medium text-[#999999]  uppercase">
                                    Rate
                                </div>
                                <div className="text-right text-xs font-medium text-[#999999] uppercase">
                                    Amount
                                </div>
                            </div>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-2">
                                {details.items.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <div className="col-span-full sm:col-span-2 text-xs">
                                            <p className="font-medium text-gray-800">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-[#999999]">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="text-gray-800">
                                                {item.quantity}
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="text-gray-800">
                                                {item.unitPrice} {details.currency}
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="sm:text-right text-gray-800">
                                                {item.total} {details.currency}
                                            </p>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute h-[1px] bg-[#ebebeb] w-full"></div>
            </div>
            <div className="card w-full rounded-md hover:bg-[#F1F5FF] cursor-pointer" onClick={() => setActiveStep(4)}>
                <div className="card-details">
                    <div className="flex sm:justify-end">
                        <div className="sm:text-right">
                            <div className="grid grid-cols-2 sm:grid-cols-1 gap-1 sm:gap-1 text-sm">
                                <dl className="grid sm:grid-cols-5 my-1">
                                    <dt className="col-span-3 font-semibold text-gray-800">
                                        Subtotal:
                                    </dt>
                                    <dd className="col-span-2 text-[#999999] text-xs">
                                        {formatNumberWithCommas(
                                            Number(details.subTotal)
                                        )}{" "}
                                        {details.currency}
                                    </dd>
                                </dl>
                                {details.discountDetails?.amount != undefined &&
                                    details.discountDetails?.amount > 0 && (
                                        <dl className="grid sm:grid-cols-5 my-1 gap-1">
                                            <dt className="col-span-3 font-semibold text-gray-800">
                                                Discount:
                                            </dt>
                                            <dd className="col-span-2 text-[#999999] text-xs">
                                                {details.discountDetails.amountType ===
                                                    "amount"
                                                    ? `- ${details.discountDetails.amount} ${details.currency}`
                                                    : `- ${details.discountDetails.amount}%`}
                                            </dd>
                                        </dl>
                                    )}
                                {details.taxDetails?.amount != undefined &&
                                    details.taxDetails?.amount > 0 && (
                                        <dl className="grid sm:grid-cols-5 my-1">
                                            <dt className="col-span-3 font-semibold text-gray-800">
                                                Tax:
                                            </dt>
                                            <dd className="col-span-2 text-[#999999] text-xs">
                                                {details.taxDetails.amountType ===
                                                    "amount"
                                                    ? `+ ${details.taxDetails.amount} ${details.currency}`
                                                    : `+ ${details.taxDetails.amount}%`}
                                            </dd>
                                        </dl>
                                    )}
                                {details.shippingDetails?.cost != undefined &&
                                    details.shippingDetails?.cost > 0 && (
                                        <dl className="grid sm:grid-cols-5 my-1">
                                            <dt className="col-span-3 font-semibold text-gray-800">
                                                Shipping:
                                            </dt>
                                            <dd className="col-span-2 text-[#999999] text-xs">
                                                {details.shippingDetails.costType ===
                                                    "amount"
                                                    ? `+ ${details.shippingDetails.cost} ${details.currency}`
                                                    : `+ ${details.shippingDetails.cost}%`}
                                            </dd>
                                        </dl>
                                    )}
                                <dl className="grid sm:grid-cols-5 my-1">
                                    <dt className="col-span-3 font-semibold text-gray-800">
                                        Total:
                                    </dt>
                                    <dd className="col-span-2 text-[#999999] text-xs">
                                        {formatNumberWithCommas(
                                            Number(details.totalAmount)
                                        )}{" "}
                                        {details.currency}
                                    </dd>
                                </dl>
                                {details.totalAmountInWords && (
                                    <dl className="grid sm:grid-cols-5 my-1">
                                        <dt className="col-span-3 font-semibold text-gray-800">
                                            Total in words:
                                        </dt>
                                        <dd className="col-span-2 text-[#999999] text-xs">
                                            <em>
                                                {details.totalAmountInWords}{" "}
                                                {details.currency}
                                            </em>
                                        </dd>
                                    </dl>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute h-[1px] bg-[#ebebeb] w-full"></div>
            </div>


            <div className="self-end">
                {details?.signature?.data && isDataUrl(details?.signature?.data) ? (
                    <div className="mt-6">
                        <p className="font-semibold text-gray-800">Signature:</p>
                        <img
                            src={details.signature.data}
                            width={120}
                            height={60}
                            alt={`Signature of ${sender.name}`}
                        />
                    </div>
                ) : details.signature?.data ? (
                    <div className="mt-6">
                        <p className="text-gray-800">Signature:</p>
                        <p
                            style={{
                                fontSize: 30,
                                fontWeight: 400,
                                fontFamily: `${details.signature.fontFamily}, cursive`,
                                color: "black",
                            }}
                        >
                            {details.signature.data}
                        </p>
                    </div>
                ) : null}
            </div>

        </InvoiceLayout >
    );
};

export default InvoiceTemplate;
