"use client";

import { useFormContext } from "react-hook-form";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TokenInfo, fetchAllSplTokens } from "@/lib/utils";
import { useVirtualizer } from '@tanstack/react-virtual';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useTokenStore from "@/app/store/tokenStore";

// ... TokenSelectorProps type definition ...

type TokenSelectorProps = {
    name: string;
    label?: string;
    placeholder?: string;
};

const BATCH_SIZE = 50;

const TokenSelector = ({
    name,
    label,
    placeholder,

}: TokenSelectorProps) => {
    const { control } = useFormContext();
    const [tokens, setTokens] = useState<TokenInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadTokens = async () => {
            try {
                const fetchedTokens = await fetchAllSplTokens();
                setTokens(fetchedTokens);
            } catch (error) {
                console.error("Error fetching tokens:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTokens();
    }, []);

    const filteredTokens = useMemo(() => {
        return tokens.filter((token: TokenInfo) =>
            token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tokens, searchTerm]);

    const parentRef = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) {
            // @ts-ignore
            parentRef.current = node;
        }
    }, []);

    const rowVirtualizer = useVirtualizer({
        count: filteredTokens.length,
        // @ts-ignore
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
        overscan: 5,
    });

    return (
        <div>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-between gap-2 items-center text-sm border-b border-[#ebebeb] transition-all focus-within:border-[#0094FF] [&:hover:not(:focus-within)]:border-black/20">
                            <div>
                                <FormLabel className="text-black">{label}:</FormLabel>
                            </div>
                            <div>
                                <Select
                                    {...field}
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger className="bg-white border-none focus:border-none focus:outline-none">
                                            <Badge>
                                                <SelectValue placeholder={placeholder} />
                                            </Badge>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            <SelectLabel className="text-black">Tokens</SelectLabel>
                                            <Input
                                                placeholder="Search tokens..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="mb-2"
                                            />
                                            {!loading && (
                                                <div ref={parentRef} style={{ height: '200px', overflow: 'auto' }}>
                                                    <div
                                                        style={{
                                                            height: `${rowVirtualizer.getTotalSize()}px`,
                                                            width: '100%',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                                                            const token = filteredTokens[virtualRow.index];
                                                            return (
                                                                <SelectItem
                                                                    key={token.address}
                                                                    value={token.address}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        left: 0,
                                                                        width: '100%',
                                                                        height: `${virtualRow.size}px`,
                                                                        transform: `translateY(${virtualRow.start}px)`,
                                                                    }}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <img src={token.logoURI} alt={token.symbol} className="w-4 h-4" />
                                                                        <span className="text-black">{token.symbol}</span>
                                                                    </div>
                                                                </SelectItem>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </div>
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
};

export default TokenSelector;