"use client"

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { CampSchema, CampSchemaType } from "../schema";
import { CLASS } from "@/constant";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { CampType, Section } from "@prisma/client";
import { apply } from "../action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ApplyFormProps {
    id: string
}

export const ApplyForm = ({ id }: ApplyFormProps) => {
    const [open, setOpen] = useState(false);

    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: apply,
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success(data.success)
                router.push(`/event/${id}/pay/${data.id}`)
            }
        },
    })

    const form = useForm<CampSchemaType>({
        resolver: zodResolver(CampSchema),
        defaultValues: {
            type: CampType.Individual,
            amount: 104,
            unitName: "",
            unitLeaderName: "",
            unitPhone: "",
            eventId: id,
            members: [
                {
                    name: "",
                    class: "",
                    section: undefined,
                    role: undefined,
                    phone: "",
                }
            ],
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "members"
    });

    const onSubmit = (values: CampSchemaType) => {
        mutate(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Apply</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Application Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex gap-x-3 space-y-1"
                                        >
                                            {
                                                Object.values(CampType).map((v) => (
                                                    <FormItem className="flex items-center space-x-1 space-y-0" key={v}>
                                                        <FormControl>
                                                            <RadioGroupItem value={v} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {v}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Collapsible open={form.watch("type") === CampType.Unit}>
                            <CollapsibleContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Unit Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <FormField
                                            control={form.control}
                                            name="unitName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Unit Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="unitLeaderName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Unit Leader Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="unitPhone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Unit leader Phone</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>

                                {
                                    fields.map((field, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <CardTitle>Member {index + 1}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                <FormField
                                                    control={form.control}
                                                    name={`members.${index}.name`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Name</FormLabel>
                                                            <FormControl>
                                                                <Input onChange={value => {
                                                                    field.onChange(value)
                                                                    form.trigger(`members.${index}.class`)
                                                                }} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name={`members.${index}.class`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Class</FormLabel>
                                                            <Select onValueChange={value => {
                                                                field.onChange(value)
                                                                form.trigger(`members.${index}.section`)
                                                            }} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className="max-w-full min-w-[200px]">
                                                                        <SelectValue placeholder="Select a class" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {
                                                                        CLASS.map((v) => (
                                                                            <SelectItem value={v} key={v}>{v}</SelectItem>
                                                                        ))
                                                                    }
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />


                                                <FormField
                                                    control={form.control}
                                                    name={`members.${index}.section`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Section</FormLabel>
                                                            <Select onValueChange={value => {
                                                                field.onChange(value)
                                                                form.trigger(`members.${index}.phone`)
                                                            }} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select a section" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {
                                                                        Object.keys(Section).map((v) => (
                                                                            <SelectItem value={v} key={v}>{v}</SelectItem>
                                                                        ))
                                                                    }
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name={`members.${index}.role`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Role</FormLabel>
                                                            <Select onValueChange={value => {
                                                                field.onChange(value)
                                                                form.trigger(`members.${index}.phone`)
                                                            }} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select a role" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="participant">Participant</SelectItem>
                                                                    <SelectItem value="unitLeader">Unit Leader</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name={`members.${index}.phone`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Phone</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} onChange={value => {
                                                                    field.onChange(value)
                                                                    form.trigger(`members.${index}.phone`)
                                                                }} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </CardContent>
                                            <CardFooter>
                                                <Button type="button" disabled={fields.length === 1} variant="destructive" onClick={() => remove(index)}>Remove</Button>
                                            </CardFooter>
                                        </Card>
                                    ))
                                }
                            </CollapsibleContent>
                        </Collapsible>

                        <Collapsible open={form.watch("type") === CampType.Individual}>
                            <CollapsibleContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="unitName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unit Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="unitLeaderName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unit Leader Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="unitPhone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unit Leader Phone</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="members.0.name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="members.0.class"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Class</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                                <FormControl>
                                                    <SelectTrigger className="max-w-full min-w-[200px]">
                                                        <SelectValue placeholder="Select a class" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        CLASS.map((v) => (
                                                            <SelectItem value={v} key={v}>{v}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="members.0.section"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Section</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a section" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        Object.keys(Section).map((v) => (
                                                            <SelectItem value={v} key={v}>{v}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="members.0.role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="participant">Participant</SelectItem>
                                                    <SelectItem value="unitLeader">Unit Leader</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="members.0.phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CollapsibleContent>
                        </Collapsible>

                        <div className="flex items-center justify-end gap-x-3">
                            <Button type="button" className={cn(form.watch("type") !== CampType.Unit && "hidden")} onClick={() => append({
                                name: "",
                                class: "",
                                section: Section.Cub,
                                role: "participant",
                                phone: "",
                            })} variant="outline" disabled={isPending}>Add</Button>
                            <Button type="submit" disabled={isPending}>Submit</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card >
    )
}
