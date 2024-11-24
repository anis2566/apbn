"use client"

import { Scout, Section } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { BADGES_ADULT_CUB, BADGES_CUB, BADGES_ROVER, BADGES_SCOUT, BLOODGROUP, MEMBERTYPE, ROLES_ADULT_CUB_ROLE, ROLES_ADULT_ROVER_ROLE, ROLES_CUB_ROLE, ROLES_ROVER_ROLE, ROLES_SCOUT_ROLE, SCOUT_SECTION_TYPE } from "@/constant"
import { UploadButton } from "@/lib/uploadthing"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { GET_UNITS } from "@/app/apply/action"
import { ScoutSchema } from "@/app/apply/schema"
import { UPDATE_SCOUT } from "../action"

type Division = {
    id: string;
    name: string;
};

interface EditScoutFormProps {
    scout: Scout
}

export const EditScoutForm = ({ scout }: EditScoutFormProps) => {
    const [dob, setDob] = useState<Date>(new Date())
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [division, setDivision] = useState<string | null>(null)
    const [districts, setDistricts] = useState<Division[]>([])
    const [joinDate, setJoinDate] = useState<Date>(new Date())
    const [section, setSection] = useState<Section>()
    const [courseStart, setCourseStart] = useState<Date>(new Date())
    const [courseEnd, setCourseEnd] = useState<Date>(new Date())

    useEffect(() => {
        const fetchDivisions = async () => {
            const res = await fetch("https://bdapi.vercel.app/api/v.1/division");
            if (res.ok) {
                const data = await res.json();
                setDivisions(data?.data || []);
            } else {
                console.error("Failed to fetch divisions:", res.status);
            }
        };
        fetchDivisions();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            const res = await fetch(`https://bdapi.vercel.app/api/v.1/district/${division}`, {
                mode: 'cors'
            });
            if (res.ok) {
                const data = await res.json();
                setDistricts(data?.data || []);
            } else {
                console.error("Failed to fetch divisions:", res.status);
            }
        };
        fetchDistricts();
    }, [division]);

    const { data: units } = useQuery({
        queryKey: ["scout-units", section],
        queryFn: async () => {
            const res = await GET_UNITS(section as Section)
            return res.units
        },
    })

    const form = useForm<z.infer<typeof ScoutSchema>>({
        resolver: zodResolver(ScoutSchema),
        defaultValues: {
            name: scout.name || "",
            nameBangla: scout.nameBangla || "",
            apsId: scout.apsId || "",
            fatherName: scout.fatherName || "",
            motherName: scout.motherName || "",
            dob: scout.dob || new Date(),
            gender: scout.gender || "",
            phone: scout.phone || "",
            religion: scout.religion || "",
            email: scout.email || "",
            bloodGroup: scout.bloodGroup || "",
            villageHouse: scout.villageHouse || "",
            roadBlockSector: scout.roadBlockSector || "",
            district: scout.district || "",
            division: scout.division || "",
            thana: scout.thana || "",
            postCode: scout.postCode || "",
            scoutType: scout.scoutType || "",
            experience: scout.experience || [],
            joinDate: scout.joinDate || new Date(),
            section: scout.section || "",
            memberType: scout.memberType || "",
            badge: scout.badge || "",
            role: scout.role || [],
            certificateNo: scout.certificateNo || "",
            courseDateEnd: scout.courseDateEnd || undefined,
            courseDateSatrt: scout.courseDateSatrt || undefined,
            scoutRegion: scout.scoutRegion || "",
            scoutDistrict: scout.scoutDistrict || "",
            scoutUpazilla: scout.scoutUpazilla || "",
            institute: scout.institute || "",
            class: scout.class || "",
            roll: scout.roll || "",
            organization: scout.organization || "",
            designation: scout.designation || "",
            imageUrl: scout.imageUrl || "",
            preferedUnit: scout.preferedUnitId || ""
        },
    })

    const { mutate: updateScout, isPending } = useMutation({
        mutationFn: UPDATE_SCOUT,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "update-scout"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-scout"
            });
        }
    })

    function onSubmit(values: z.infer<typeof ScoutSchema>) {
        toast.loading("Scout updating...", {
            id: "update-scout"
        })
        updateScout({ values, id: scout.id })
    }

    return (
        <Form {...form}>
            <form className="space-y-8 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Fill up the personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
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
                                name="nameBangla"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name Bangla</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="fatherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Father Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="motherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mother Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex"
                                                disabled={isPending}
                                            >
                                                {
                                                    ["Male", "Female", "Other"].map((v, i) => (
                                                        <FormItem className="flex items-center space-x-3 space-y-0" key={i}>
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
                            <FormField
                                control={form.control}
                                name="religion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Religion</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select religion" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    ["Islam", "Hinduism", "Christianism", "Buddhism"].map((v, i) => (
                                                        <SelectItem value={v} key={i}>{v}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="phone"
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
                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <div>
                                            <DatePicker
                                                selected={dob}
                                                onChange={(date: Date | null) => {
                                                    if (date) {
                                                        setDob(date)
                                                        field.onChange(date)
                                                    }
                                                }}
                                                showYearDropdown
                                                dateFormatCalendar="MMMM"
                                                yearDropdownItemNumber={30}
                                                scrollableYearDropdown
                                                isClearable
                                                className="border border-input w-full p-2 rounded-md"
                                            />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="bloodGroup"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Blood Group</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select blood group" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    BLOODGROUP.map((v, i) => (
                                                        <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
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
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        {
                                            form.watch("imageUrl") ? (
                                                <div className="relative">
                                                    <Avatar>
                                                        <AvatarImage src={form.getValues("imageUrl")} />
                                                    </Avatar>
                                                    <Button type="button" disabled={isPending} onClick={() => form.setValue("imageUrl", "")} variant="ghost" size="icon" className="absolute right-0 top-0">
                                                        <Trash2 className="w-5 h-5 text-rose-500" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <UploadButton
                                                    endpoint="imageUploader"
                                                    onClientUploadComplete={(res) => {
                                                        field.onChange(res[0].url)
                                                        toast.success("Image uploaded")
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        toast.error("Image upload failed")
                                                    }}
                                                />
                                            )
                                        }
                                        <FormDescription>স্কাউট পোশাক পরিহিত পাসপোর্ট সাইজ ছবি অপলাভ করুন</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Address</CardTitle>
                        <CardDescription>Fill up the address.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="villageHouse"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Village / House</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="roadBlockSector"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Road / Block / Sector</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="division"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormLabel>Division</FormLabel>
                                        <Select
                                            value={field.value}
                                            defaultValue={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                const div = divisions.find(item => item.name === value)
                                                setDivision(div?.id || null)
                                            }}
                                            disabled={isPending}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a division" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {divisions.map((division, i) => (
                                                    <SelectItem value={division.name} key={i}>
                                                        {division.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormLabel>District</FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={(value) => field.onChange(value)}
                                            disabled={isPending}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a division" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {districts.map((district, i) => (
                                                    <SelectItem value={district.name} key={i}>
                                                        {district.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="thana"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thana</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="postCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Post Code</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Scout Information</CardTitle>
                        <CardDescription>Fill up the scout information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="scoutType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Priority</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex gap-x-2"
                                                disabled={isPending}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="scoutMember" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        For Scouts member
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="interestMember" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        For interested to be scouts member
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-3">
                                <Label>Experience</Label>
                                <div className="flex items-center gap-x-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={form.watch("experience").includes("cubScout")}
                                            disabled={isPending}
                                            onCheckedChange={(isChecked) => {
                                                const currentExperience = form.watch("experience");
                                                const updatedExperience = isChecked ? [...currentExperience, "cubScout"] : currentExperience.filter(exp => exp !== "cubScout");
                                                form.setValue("experience", updatedExperience);
                                            }}
                                        />
                                        <Label htmlFor="terms">Cub Scout</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={form.watch("experience").includes("scout")}
                                            disabled={isPending}
                                            onCheckedChange={(isChecked) => {
                                                const currentExperience = form.watch("experience");
                                                const updatedExperience = isChecked ? [...currentExperience, "scout"] : currentExperience.filter(exp => exp !== "scout");
                                                form.setValue("experience", updatedExperience);
                                            }}
                                        />
                                        <Label htmlFor="terms">Scout</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={form.watch("experience").includes("roverScout")}
                                            disabled={isPending}
                                            onCheckedChange={(isChecked) => {
                                                const currentExperience = form.watch("experience");
                                                const updatedExperience = isChecked ? [...currentExperience, "roverScout"] : currentExperience.filter(exp => exp !== "roverScout");
                                                form.setValue("experience", updatedExperience);
                                            }}
                                        />
                                        <Label htmlFor="terms">Rover Scout</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={form.watch("experience").includes("adult")}
                                            disabled={isPending}
                                            onCheckedChange={(isChecked) => {
                                                const currentExperience = form.watch("experience");
                                                const updatedExperience = isChecked ? [...currentExperience, "adult"] : currentExperience.filter(exp => exp !== "adult");
                                                form.setValue("experience", updatedExperience);
                                            }}
                                        />
                                        <Label htmlFor="terms">Adult Experience</Label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="joinDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Join Date</FormLabel>
                                        <div>
                                            <DatePicker
                                                selected={joinDate}
                                                onChange={(date: Date | null) => {
                                                    if (date) {
                                                        setJoinDate(date)
                                                        field.onChange(date)
                                                    }
                                                }}
                                                showYearDropdown
                                                dateFormatCalendar="MMMM"
                                                yearDropdownItemNumber={30}
                                                scrollableYearDropdown
                                                isClearable
                                                disabled={isPending}
                                                className="border border-input w-full p-2 rounded-md"
                                            />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="memberType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Member Type</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select member type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    MEMBERTYPE.map((v, i) => (
                                                        <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="section"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Section Type</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select member type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    SCOUT_SECTION_TYPE.map((v, i) => (
                                                        <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
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
                                name="badge"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Badge</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select member type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    form.watch("memberType") !== "adultLeader" && form.watch("section") === "Cub" ?
                                                        BADGES_CUB.map((v, i) => (
                                                            <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
                                                        ))
                                                        : null
                                                }
                                                {
                                                    form.watch("memberType") !== "adultLeader" && form.watch("section") === "Scout" ?
                                                        BADGES_SCOUT.map((v, i) => (
                                                            <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
                                                        ))
                                                        : null
                                                }
                                                {
                                                    form.watch("memberType") !== "adultLeader" && form.watch("section") === "Rover" ?
                                                        BADGES_ROVER.map((v, i) => (
                                                            <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
                                                        ))
                                                        : null
                                                }
                                                {
                                                    form.watch("memberType") === "adultLeader" &&
                                                    BADGES_ADULT_CUB.map((v, i) => (
                                                        <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select defaultValue={field.value[0]} onValueChange={(value) => field.onChange([value])} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select scout role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    form.watch("memberType") !== "adultLeader" && form.watch("section") === "Cub" ?
                                                        ROLES_CUB_ROLE.map((v, i) => (
                                                            <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
                                                        ))
                                                        : null
                                                }
                                                {
                                                    form.watch("memberType") !== "adultLeader" && form.watch("section") === "Scout" ?
                                                        ROLES_SCOUT_ROLE.map((v, i) => (
                                                            <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
                                                        ))
                                                        : null
                                                }
                                                {
                                                    form.watch("memberType") !== "adultLeader" && form.watch("section") === "Rover" ?
                                                        ROLES_ROVER_ROLE.map((v, i) => (
                                                            <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
                                                        ))
                                                        : null
                                                }
                                                {
                                                    form.watch("memberType") === "adultLeader" && form.watch("section") === "Cub" || form.watch("memberType") === "adultLeader" && form.watch("section") === "Scout" ?
                                                        ROLES_ADULT_CUB_ROLE.map((v, i) => (
                                                            <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
                                                        ))
                                                        : null
                                                }
                                                {
                                                    form.watch("memberType") === "adultLeader" && form.watch("section") === "Rover" ?
                                                        ROLES_ADULT_ROVER_ROLE.map((v, i) => (
                                                            <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
                                                        ))
                                                        : null
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="scoutRegion"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormLabel>Scout Region</FormLabel>
                                        <Select
                                            value={field.value}
                                            disabled={isPending}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select region" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    form.watch("section") === "Scout" &&
                                                    <SelectItem value="Dhaka">
                                                        Bangladesh Scouts, Dhaka Region
                                                    </SelectItem>
                                                }
                                                {
                                                    form.watch("section") === "Cub" &&
                                                    <SelectItem value="Dhaka">
                                                        Bangladesh Scouts, Dhaka Region
                                                    </SelectItem>
                                                }
                                                {
                                                    form.watch("section") === "Rover" &&
                                                    <SelectItem value="Dhaka">
                                                        Bangladesh Scouts, Rover Region
                                                    </SelectItem>
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="scoutDistrict"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormLabel>Scout District</FormLabel>
                                        <Select
                                            value={field.value}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                            disabled={isPending}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select district" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {form.watch("section") === "Cub" && (
                                                    <SelectItem value="DhakaMetroPoliton">
                                                        Bangladesh Scouts, Dhaka Metro Politon
                                                    </SelectItem>
                                                )
                                                }
                                                {form.watch("section") === "Scout" && (
                                                    <SelectItem value="DhakaMetroPoliton">
                                                        Bangladesh Scouts, Dhaka Metro Politon
                                                    </SelectItem>
                                                )
                                                }
                                                {form.watch("section") === "Rover" && (
                                                    <SelectItem value="DhakaDistrict">
                                                        Bangladesh Scouts, Dhaka District Rover
                                                    </SelectItem>
                                                )
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="institute"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Institute</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="class"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Class</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="roll"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Roll</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="preferedUnit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select unit" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    units?.map((unit, i) => (
                                                        <SelectItem value={unit.id} key={i}>{unit.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <FormField
                                    control={form.control}
                                    name="apsId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>APS ID</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 items-center", form.watch("memberType") === "adultLeader" ? "grid" : "hidden")}>
                            <FormField
                                control={form.control}
                                name="certificateNo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cetificate No</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="courseDateSatrt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course Start</FormLabel>
                                        <div>
                                            <DatePicker
                                                selected={courseStart}
                                                onChange={(date: Date | null) => {
                                                    if (date) {
                                                        setCourseStart(date)
                                                        field.onChange(date)
                                                    }
                                                }}
                                                showYearDropdown
                                                dateFormatCalendar="MMMM"
                                                yearDropdownItemNumber={30}
                                                scrollableYearDropdown
                                                isClearable
                                                disabled={isPending}
                                                className="border border-input w-full p-2 rounded-md"
                                            />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 items-center", form.watch("memberType") === "adultLeader" ? "grid" : "hidden")}>
                            <FormField
                                control={form.control}
                                name="courseDateEnd"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course End</FormLabel>
                                        <div>
                                            <DatePicker
                                                selected={courseEnd}
                                                onChange={(date: Date | null) => {
                                                    if (date) {
                                                        setCourseEnd(date)
                                                        field.onChange(date)
                                                    }
                                                }}
                                                showYearDropdown
                                                dateFormatCalendar="MMMM"
                                                yearDropdownItemNumber={30}
                                                scrollableYearDropdown
                                                isClearable
                                                disabled={isPending}
                                                className="border border-input w-full p-2 rounded-md"
                                            />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Button type="submit" disabled={isPending}>Update</Button>
            </form>
        </Form>
    )
}