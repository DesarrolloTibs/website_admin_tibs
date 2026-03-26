"use client";
import React, {useState} from "react";
import {CheckIcon, PencilIcon, PhotoIcon, TrashIcon, XMarkIcon} from "@heroicons/react/24/solid";

import SocialMedia from "../social-media";
import {useRouter} from "next/navigation";
import { DialogSuccess } from "../dialog-success";

interface CardProps {
    id?: number;
    title: string;
    description: string;
    date: string;
    link: string;
    image: string;
    isEdit?: boolean;
    isSubmitted?: boolean;
    onSubmitted?: (value: boolean) => void;
    token?: string | null;
    onShow?: (value: boolean) => void;
}

export default function Card(props: CardProps) {
    const {
        id,
        title,
        description,
        date,
        link,
        image,
        isEdit = false,
        isSubmitted,
        onSubmitted,
        token,
        onShow
    } = props;

    const router = useRouter();
    
    const [isEditing, setIsEditing] = useState<boolean>(isEdit);
    const [editedTitle, setEditedTitle] = useState<string>(title);
    const [editedDescription, setEditedDescription] = useState<string>(description);
    const [editedLink, setEditedLink] = useState<string>(link);
    const [selectedImage, setSelectedImage] = useState(image);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [dialog, setDialog] = useState({
        open: false,
        title: "¿Estás seguro de que quieres eliminar este tema?", 
        subTitle: "Esta acción no se puede deshacer.", 
        type: "warning"
    });

    const handleSaveToApi = async () => {
        try {
            let method: string = "PATCH";
            let url: string = "update";

            const formData = new FormData();
            formData.append("title", editedTitle);
            formData.append("description", editedDescription);
            formData.append("link", editedLink);

            if (imageFile) {
                formData.append("image", imageFile);
            }

            if (id === 0) {
                method = "POST";
                url = "create";
            } else {
                formData.append("id", id ? id.toString() : "");
            }

            const response = await fetch(`${process.env.NEXT_API_URL}/blog/${url}`, {
                method,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            });

            if (response.status === 401) {
                alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                if (onSubmitted) onSubmitted(!isSubmitted);
                if (onShow) onShow(false);
                router.replace("/");
                return;
            }

            if (response.ok) {
                if (onSubmitted) onSubmitted(!isSubmitted);
                if (onShow) onShow(false);
            }
        } catch (error) {
            console.error("Error al guardar en la API:", error);
            if (onSubmitted) onSubmitted(!isSubmitted);
            if (onShow) onShow(false);
        }
    };

    const handleEdit = async () => {
        if (isEditing) {
            await handleSaveToApi();
        }
        setIsEditing(!isEditing);
    };

    const handleCancel = () => {
        setIsEditing(!isEditing);
        if (onShow) onShow(false);
    };

    const handleDelete = async () => {
        const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este tema?");
        if (isConfirmed) {
            try {
                const response = await fetch(`${process.env.NEXT_API_URL}/blog/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (response.status === 200) {
                    console.log("Tema eliminado con éxito");
                    setDialog((prev) => ({...prev, open: false}))
                    if (onSubmitted) onSubmitted(!isSubmitted);
                    if (onShow) onShow(false);
                }
            } catch (error) {
                console.error("Error al eliminar el tema", error);
                if (onSubmitted) onSubmitted(!isSubmitted);
                if (onShow) onShow(false);
            }
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageFile(file);

            const reader = new FileReader();

            reader.onloadend = () => {
                if (reader.result) {
                    setSelectedImage(reader.result as string);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    
    const handleDialogDelete = () => {
        setDialog((prev) => ({...prev, open: true}));
    }

    return (
        <div
            className="relative flex flex-col rounded-t-[14px] w-[310px] h-[450px] bg-white shadow-[0px_0px_24px_rgba(0,0,0,0.16)] text-[#808080] nav-border-gradient-card
                        md:rounded-t-[25px] md:w-[420px] md:h-[650px] xl:rounded-t-[24px] xl:w-[550px] xl:h-[840px] xl:mt-8"
        >
            <DialogSuccess 
                dialog={dialog} 
                closeDialog={() => setDialog((prev) => ({...prev, open: false})) }
                handleAction={handleDelete}
            />
            <div className="relative">
                {selectedImage === "" ? (
                    <PhotoIcon
                        className="w-full h-[180px] rounded-t-[14px] md:h-[250px] xl:h-[300px] xl:rounded-t-[28px]"
                    />
                ) : (
                    <img
                        src={selectedImage}
                        alt={title}
                        className="w-full h-[180px] rounded-t-[14px] md:h-[250px] xl:h-[350px] xl:rounded-t-[24px]"
                        onClick={() => {
                            if (editedLink) {
                                window.open(editedLink, "_blank");
                            }
                        }}
                        style={{cursor: editedLink ? "pointer" : "default"}}
                    />
                )}

                <div className="absolute top-2 right-2 flex gap-2 md:top-4 md:right-4 md:gap-4">
                    <button onClick={handleEdit} className="img-shadow p-2 bg-white rounded-full hover:bg-gray-300">
                        {isEditing ? (
                            <CheckIcon className="w-5 h-5 text-green-700 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        ) : (
                            <PencilIcon className="w-5 h-5 text-gray-700 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        )}
                    </button>
                    <button
                        className="img-shadow p-2 bg-white rounded-full hover:bg-red-300"
                        onClick={isEditing ? handleCancel : handleDialogDelete}
                    >
                        {isEditing ? (
                            <XMarkIcon className="w-5 h-5 text-red-600 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        ) : (
                            <TrashIcon className="w-5 h-5 text-red-600 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        )}
                    </button>
                </div>

                {isEditing && (
                    <>
                        <label
                            htmlFor="imageUpload"
                            className="absolute img-shadow top-2 left-2 cursor-pointer bg-white p-2 rounded-full shadow-md hover:bg-gray-300 xl:top-4 xl:left-4"
                        >
                            <PencilIcon className="w-4 h-4 text-gray-700 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </>
                )}

                <div
                    className="absolute flex items-center text-[12px] py-1 right-0 bottom-4 bg-white w-[120px] rounded-l-full xl:w-[200px] xl:text-[24px] xl:bottom-6">
                    <img
                        src="/icons/icono-calendario.webp"
                        className="w-[22px] h-[22px] mx-2 xl:w-[28px] xl:h-[28px]"
                        alt="Icono Calendario"
                    />
                    {date}
                </div>
            </div>

            <div
                className="flex flex-col h-full mt-[12px] text-center xl:mt-[24px] px-4 md:px-6 xl:px-10 xl:text-start">
                <div className="flex flex-col w-full h-full">
                    {isEditing ? (
                        <input
                            className="text-[12px] text-[#1717D2] font-bold w-full border border-gray-300 rounded p-1 md:text-[16px] xl:text-[24px]"
                            type="text"
                            value={editedTitle}
                            placeholder="Título"
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                    ) : (
                        <span
                            className="text-[12px] text-[#1717D2] font-bold md:text-[16px] xl:text-[24px]"
                            onClick={() => {
                                if (editedLink) {
                                    window.open(editedLink, "_blank");
                                }
                            }}
                            style={{cursor: editedLink ? "pointer" : "default"}}
                        >
                            {editedTitle}
                        </span>
                    )}
                    <div className="flex flex-col mt-[10px] h-[110px] md:h-[190px] xl:h-[250px] overflow-y-auto">
                        <div className="text-[12px] font-medium flex flex-col md:text-[14px] xl:text-[18px] gap-4">
                            {isEditing ? (
                                <>
                                    <textarea
                                        className="text-[12px] font-medium w-full border border-gray-300 rounded p-1 md:text-[14px] xl:text-[18px]"
                                        value={editedDescription}
                                        placeholder="Descripción"
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                        rows={7}
                                    />

                                    <input
                                        className="text-[12px] text-[#1717D2] font-bold w-full border border-gray-300 rounded p-1 md:text-[14px] xl:text-[18px]"
                                        type="text"
                                        placeholder="Enlace url"
                                        value={editedLink}
                                        onChange={(e) => setEditedLink(e.target.value)}
                                    />
                                </>
                            ) : (
                                <p>
                                    {editedDescription}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className='w-full flex flex-row gap-1 justify-center items-center xl:justify-end my-3 xl:my-6'>
                        <SocialMedia widthStyle="w-[24px] lg:w-[30px] xl:w-[36px]"/>
                    </div>
                </div>

            </div>
        </div>
    )
};
