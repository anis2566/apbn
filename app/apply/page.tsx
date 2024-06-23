"use client"

import { Check, Contact, Edit, Home, User } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

import { cn } from "@/lib/utils"
import { ScoutSchema, ScoutSchemaType } from "@/schema/scout.schema"
import { BADGES, BLOODGROUP, MEMBERTYPE, ROLES, SCOUT_SECTION_TYPE } from "@/constant"
import { UploadButton } from "@/lib/uploadthing"
import { GET_UNITS } from "@/actions/unit.action"
import { Section } from "@/schema/unit.schema"
import { CREATE_SCOUT } from "@/actions/scout.action"

const steps = [
  {
    id: 1,
    name: 'Personal Information',
    fields: ["name", "fatherName", "motherName", "dob", "gender", "phone", "religion", "email", "bloodGroup", "imageUrl"],
    Icon: User
  },
  {
    id: 2,
    name: 'Address',
    fields: ["villageHouse", "roadBlockSector", "division", "district", "thana", "postCode"],
    Icon: Home
  },
  {
    id: 3,
    name: 'Scout Information',
    fields: ["scoutType", "experience", "joinDate", "memberType", "section", "badge", "role", "scoutRegion", "scoutDistrict", "scoutUpazilla", "institute", "class", "roll", "organization", "designation", "unitId", "apsId"],
    Icon: Contact
  },
]

type Division = {
  id: string;
  name: string;
};

const Apply = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [dob, setDob] = useState<Date>(new Date())
    const [joinDate, setJoinDate] = useState<Date>(new Date())
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [division, setDivision] = useState<string | null>(null)
    const [districts, setDistricts] = useState<Division[]>([])
    const [region, setRegion] = useState<string | null>(null)
    const [scoutDistricts, setScoutDistricts] = useState<Division[]>([])
    const [section, setSection] = useState<Section>()

    const router = useRouter()

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

    useEffect(() => {
        const fetchDivisions = async () => {
        const res = await fetch(`https://bdapi.vercel.app/api/v.1/district/${region}`, {
            mode: 'cors'
        });
        if (res.ok) {
            const data = await res.json();
            setScoutDistricts(data?.data || []);
        } else {
            console.error("Failed to fetch divisions:", res.status);
        }
        };
        fetchDivisions();
    }, [region]);

    const {data:units} = useQuery({
        queryKey: ["scout-units", section],
        queryFn: async () => {
            const res = await GET_UNITS(section)
            return res.units
        },
        enabled: !!section
    })

    const form = useForm<z.infer<typeof ScoutSchema>>({
        resolver: zodResolver(ScoutSchema),
        defaultValues: {
            name: "",
            apsId: "",
            fatherName: "",
            motherName: "",
            dob: new Date(),
            gender: "",
            phone: "",
            religion: "",
            email: "",
            bloodGroup: "",
            villageHouse: "",
            roadBlockSector: "",
            district: "",
            division: "",
            thana: "",
            postCode: "",
            scoutType: "",
            experience: [""],
            joinDate: new Date(),
            section: "",
            memberType: "",
            badge: "",
            role: [""],
            scoutRegion: "",
            scoutDistrict: "",
            scoutUpazilla: "",
            institute: "",
            class: "",
            roll: "",
            organization: "",
            designation: "",
            imageUrl: "",
            unitId: ""
        },
    })

    const { trigger, handleSubmit, formState:{errors},setValue } = form;
    
    type FieldName = keyof ScoutSchemaType

    const {mutate: createScout, isPending} = useMutation({
        mutationFn: CREATE_SCOUT,
        onSuccess: (data) => {
            router.push(`/apply/payment/${data?.id}`)
            toast.success(data.success, {
                id: "create-scout"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-scout"
            });
        }
    })

    function onSubmit(values: z.infer<typeof ScoutSchema>) {
        toast.loading("Registering...", {
            id: "create-scout"
        })
        createScout(values)
    }

    const next = async () => {
        const fields = steps[currentStep].fields
        const output = await trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return

        setCurrentStep(step => step + 1)
    }

    return (
        <div className="py-5 space-y-6 px-6 w-full max-w-screen-xl mx-auto">
            <div className="w-full flex flex-col items-center justify-center space-y-2">
                <div className="w-[100px] h-[100px] rounded-full shadow-md shadow-primary flex items-center justify-center">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        height={70}
                        width={70}
                    />
                </div>
                <h1 className="text-xl font-bold text-primary">APBN</h1>
                <p className="text-muted-foreground">Register as a Scout to unlock exclusive opportunities and join a community.</p>
            </div>

            <Separator />

            <nav aria-label='Progress'>
                <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                {steps.map((step, index) => (
                    <li key={step.name} className='md:flex-1'>
                    {currentStep > index ? (
                        <div className='group flex w-full flex-col border-l-4 border-green-500 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                            <div className="flex items-center gap-x-2">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">

                                    <Check className="w-6 h-6 text-white" />
                                </div>
                                {step.name}    
                            </div>
                        </div>
                    ) : currentStep === index ? (
                        <div
                        className='flex w-full flex-col border-l-4 border-amber-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                        aria-current='step'
                        >
                            <div className="flex items-center gap-x-2">
                                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">

                                    <Edit className="w-6 h-6 text-white" />
                                </div>
                                {step.name} 
                            </div>
                        </div>
                    ) : (
                        <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                            <div className="flex items-center gap-x-2">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">

                                    <step.Icon className="w-6 h-6 text-indigo-500" />
                                </div>
                                {step.name}    
                            </div>
                        </div>
                    )}
                    </li>
                ))}
                </ol>
            </nav>

            <Form {...form}>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    <div className={cn("hidden space-y-6", currentStep === 0 && "block")}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("name")
                                            }} />
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
                                                onChange={(date: Date) => {
                                                    setDob(date)
                                                    field.onChange(date)
                                                    trigger("dob")
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
                                name="fatherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Father Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("fatherName")
                                            }} />
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
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("motherName")
                                            }} />
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
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                    trigger("gender")
                                                }}
                                                defaultValue={field.value}
                                                className="flex"
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
                                        <Select defaultValue={field.value} onValueChange={(value) => {
                                            field.onChange(value)
                                            trigger("religion")
                                        }}>
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
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("phone")
                                            }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("email")
                                            }} />
                                        </FormControl>
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
                                        <Select defaultValue={field.value} onValueChange={(value) => {
                                            field.onChange(value)
                                            trigger("bloodGroup")
                                        }}>
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
                                                <Avatar>
                                                        <AvatarImage src={form.getValues("imageUrl")} />
                                                </Avatar>
                                            ): (
                                                <UploadButton
                                                    endpoint="imageUploader"
                                                    onClientUploadComplete={(res) => {
                                                        field.onChange(res[0].url)
                                                        toast.success("Image uploaded")
                                                        trigger("imageUrl")
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        toast.error("Image upload failed")
                                                    }}
                                                />
                                            )
                                        }
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    
                    <div className={cn("hidden space-y-6", currentStep === 1 && "block")}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="villageHouse"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Village / House</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("villageHouse")
                                            }} />
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
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("roadBlockSector")
                                            }} />
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
                                                trigger("division")
                                        }}
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
                                        defaultValue={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                trigger("district")
                                            }}
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
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("thana")
                                            }} />
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
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("postCode")
                                            }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className={cn("hidden space-y-6", currentStep === 2 && "block")}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="scoutType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                    <FormLabel>Priority</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => {
                                            field.onChange(value)
                                            trigger("scoutType")
                                        }}
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
                                                onChange={(date: Date) => {
                                                    setJoinDate(date)
                                                    field.onChange(date)
                                                    trigger("joinDate")
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
                                        <Select defaultValue={field.value} onValueChange={(value) => {
                                            field.onChange(value)
                                            trigger("memberType")
                                        }} disabled={isPending}>
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
                                        <Select defaultValue={field.value} onValueChange={(value) => {
                                            field.onChange(value)
                                            setSection(value as Section)
                                            trigger("section")
                                        }} disabled={isPending}>
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
                                        <Select defaultValue={field.value} onValueChange={(value) => {
                                            field.onChange(value)
                                            trigger("badge")
                                        }} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select member type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    BADGES.map((v, i) => (
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
                                        <Select defaultValue={field.value[0]} onValueChange={(value) => {
                                                field.onChange([value])
                                                trigger("role")
                                            }} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select scout role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    ROLES.map((v, i) => (
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
                                name="scoutRegion"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                    <FormLabel>Scout Region</FormLabel>
                                    <Select
                                            value={field.value}
                                            disabled={isPending}
                                        defaultValue={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                const div = divisions.find(item => item.name === value)
                                                setRegion(div?.id || null)
                                                trigger("scoutRegion")
                                        }}
                                    >
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select region" />
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
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                trigger("scoutDistrict")
                                            }}
                                            disabled={isPending}
                                    >
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select district" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        {scoutDistricts.map((district, i) => (
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
                            <FormField
                                control={form.control}
                                name="scoutUpazilla"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Scout Upazilla</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("scoutUpazilla")
                                            }} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="institute"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Institute</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("institute")
                                            }} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="class"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Class</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("class")
                                            }} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="roll"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Roll</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("roll")
                                            }} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="unitId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={(value) => {
                                            field.onChange(value)
                                            trigger("unitId")
                                        }} disabled={isPending}>
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <FormField
                                control={form.control}
                                name="apsId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>APS ID</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e.target.value)
                                                trigger("apsId")
                                            }} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-x-4">
                        <Button type="button" variant="outline" onClick={() => setCurrentStep(currentStep -1)} disabled={currentStep === 0 || isPending}>Back</Button>
                        <Button type="button" onClick={next} className={cn("", currentStep === 2 && "hidden")}>{currentStep === 2 ? "Submit" : "Next"}</Button>
                        <Button type="submit" className={cn("hidden", currentStep === 2 && "flex")} disabled={isPending}>Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default Apply