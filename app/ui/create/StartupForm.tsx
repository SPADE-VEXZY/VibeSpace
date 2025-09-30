"use client"

import { useActionState, useState } from "react"
import MDEditor from "@uiw/react-md-editor"
import { BsFillSendFill } from "react-icons/bs";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({})

    const [pitch, setPitch] = useState("")

    const router = useRouter()

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch
            }
            await formSchema.parseAsync(formValues)
            const result = await createPitch(prevState, formData, pitch)

            if(result.status == "SUCCESS"){
                toast.success("POSTED")
                router.push(`/startup/${result._id}`)
            }

            return result;

        } catch (error) {
            toast.error("Something went wrong")
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors
                setErrors(fieldErrors as unknown as Record<string, string>)


                return { ...prevState, error: "Validation Failed", status: "ERROR" }
            }

            return { ...prevState, error: "unexpect error occurred", status: "ERROR" }

        }
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL"
    })

    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label>
                <input type="text" id="title" name="title" className="startup-form_input" required placeholder="Startup Title" />

                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">Description</label>
                <textarea id="description" name="description" className="startup-form_textarea block w-full" required placeholder="Description" />

                {errors.description && <p className="startup-form_error">{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">Category</label>
                <input type="text" id="category" name="category" className="startup-form_input" required placeholder="Category (e.g. food, movie, tech...)" />

                {errors.category && <p className="startup-form_error">{errors.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label">Image URL</label>
                <input type="text" id="link" name="link" className="startup-form_input" required placeholder="e.g. https://image.jpeg" />

                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">Pitch</label>
                <MDEditor id="pitch" preview="edit" height={300} value={pitch} onChange={(value) => setPitch(value as string)} style={{ borderRadius: 20, overflow: "hidden" }} textareaProps={{ placeholder: "describe your opinion" }} previewOptions={{ disallowedElements: ["style"] }} />
                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>

            <button type="submit" className="startup-form_btn text-white flex items-center justify-center gap-5 cursor-pointer" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Your Post"}
                <BsFillSendFill />
            </button>
        </form>
    )
}

export default StartupForm