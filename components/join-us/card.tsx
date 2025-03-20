"use client";
import React, {useState} from "react";
import {CheckIcon, PencilIcon, PhotoIcon, TrashIcon, XMarkIcon} from "@heroicons/react/24/solid";

interface CardProps {
    id?: number;
    title: string;
    profile: string;
    tools: string;
    characteristics: string;
    icon: string;
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
        profile,
        tools,
        characteristics,
        icon,
        isEdit = false,
        isSubmitted,
        onSubmitted,
        token,
        onShow
    } = props;

    const [isEditing, setIsEditing] = useState<boolean>(isEdit);
    const [editedTitle, setEditedTitle] = useState<string>(title);
    const [editedProfile, setEditedProfile] = useState<string>(profile);
    const [editedTools, setEditedTools] = useState<string>(tools);
    const [editedCharacteristics, setEditedCharacteristics] = useState<string>(characteristics);
    const [selectedImage, setSelectedImage] = useState(icon);

    const isAuthenticated = token !== null && token !== "";

    const handleSaveToApi = async () => {
        try {
            let method: string = "PATCH";
            let body: Partial<CardProps> = {
                id,
                title: editedTitle,
                profile: editedProfile,
                tools: editedTools,
                characteristics: editedCharacteristics,
                icon: selectedImage,
            };
            let url: string = "update";

            if (id === 0) {
                method = "POST";
                const bodyPost: Partial<CardProps> = {...body};
                delete bodyPost.id;
                body = bodyPost;
                url = "create";
            }

            const response = await fetch(`${process.env.NEXT_API_URL}/vacancies/${url}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body),
            });

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
        const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar esta tarjeta?");
        if (isConfirmed) {
            try {
                const response = await fetch(`${process.env.NEXT_API_URL}/vacancies/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (response.status === 200) {
                    console.log("Tarjeta eliminada con éxito");

                    if (onSubmitted) onSubmitted(!isSubmitted);
                    if (onShow) onShow(false);
                }
            } catch (error) {
                console.error("Error al eliminar la tarjeta", error);
                if (onSubmitted) onSubmitted(!isSubmitted);
                if (onShow) onShow(false);
            }
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();

            reader.onloadend = () => {
                if (reader.result) {
                    setSelectedImage(reader.result as string);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const profileSplit = editedProfile.split(".");
    const toolsSplit = editedTools.split("-").slice(1);
    const characteristicsSplit = editedCharacteristics.split("-").slice(1);

    return (
        <div
            className="relative flex flex-col p-6 rounded-[14px] w-[244px] h-[360px] bg-white shadow-[0px_0px_24px_rgba(0,0,0,0.16)] text-[#808080]
                        md:rounded-[25px] md:w-[400px] md:h-[550px] md:px-9 xl:rounded-[31px] xl:w-[552px] xl:h-[785px] xl:px-12 xl:mt-8"
        >
            {isAuthenticated && (
                <div className="absolute top-2 right-2 flex gap-2 md:top-4 md:right-4 md:gap-4">
                    <button onClick={handleEdit} className="img-shadow p-2 bg-white rounded-full hover:bg-gray-300">
                        {isEditing ? (
                            <CheckIcon className="w-3 h-3 text-green-700 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        ) : (
                            <PencilIcon className="w-3 h-3 text-gray-700 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        )}
                    </button>
                    <button
                        className="img-shadow p-2 bg-white rounded-full hover:bg-red-300"
                        onClick={isEditing ? handleCancel : handleDelete}
                    >
                        {isEditing ? (
                            <XMarkIcon className="w-3 h-3 text-red-600 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        ) : (
                            <TrashIcon className="w-3 h-3 text-red-600 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        )}
                    </button>
                </div>
            )}

            <div className="relative">
                {selectedImage === "" ? (
                    <PhotoIcon
                        className="absolute rounded-full p-2 bg-white img-shadow top-[-50px] left-1/2 -translate-x-1/2 w-[48px] md:w-[70px] md:top-[-60px] xl:p-4 xl:w-[125px] xl:top-[-85px]"
                    />
                ) : (
                    <img
                        src={selectedImage}
                        alt={title}
                        className="absolute img-shadow top-[-50px] left-1/2 -translate-x-1/2 w-[55px] md:w-[80px] md:top-[-65px] xl:w-[150px] xl:top-[-95px]"
                    />
                )}

                {isEditing && (
                    <>
                        <label
                            htmlFor="imageUpload"
                            className="absolute img-shadow top-[-50px] right-[65px] cursor-pointer bg-white p-2 rounded-full shadow-md hover:bg-gray-300 md:right-[115px] xl:top-[-80px] xl:right-[160px]"
                        >
                            <PencilIcon className="w-2 h-2 text-gray-700 md:w-4 md:h-4 xl:w-6 xl:h-6"/>
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
            </div>

            <div className="flex flex-col mt-[36px] xl:mt-[86px]">
                {isEditing ? (
                    <input
                        className="text-[11px] text-[#00178F] font-bold w-full border border-gray-300 rounded p-1 md:text-[18px] xl:text-[28px]"
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                ) : (
                    <span
                        className="text-[11px] text-[#00178F] font-bold md:text-[18px] xl:text-[28px]">{editedTitle}</span>
                )}
                <div className="flex flex-col h-[245px] md:h-[400px] xl:h-[550px] overflow-y-auto">
                    <span className="text-[9px] font-black mt-2 md:text-[15px] xl:text-[20px] xl:mt-4">Perfil:</span>
                    <div className="text-[9px] font-medium flex flex-col leading-tight md:text-[15px] xl:text-[20px]">
                        {isEditing ? (
                            <textarea
                                className="text-[9px] font-medium w-full border border-gray-300 rounded p-1 md:text-[15px] xl:text-[20px]"
                                value={editedProfile}
                                onChange={(e) => setEditedProfile(e.target.value)}
                                rows={5}
                            />
                        ) : (
                            profileSplit.map((profile: string, index: number) => (
                                <p key={index}>
                                    {profile}
                                </p>
                            ))
                        )}
                    </div>
                    <span
                        className="text-[9px] font-black mt-2 md:text-[15px] xl:text-[20px] xl:mt-4">Herramientas:</span>
                    <div className="text-[9px] font-medium flex flex-col leading-tight md:text-[15px] xl:text-[20px]">
                        {isEditing ? (
                            <textarea
                                className="text-[9px] font-medium w-full border border-gray-300 rounded p-1 md:text-[15px] xl:text-[20px]"
                                value={editedTools}
                                onChange={(e) => setEditedTools(e.target.value)}
                                rows={5}
                            />
                        ) : (
                            toolsSplit.map((tool: string, index: number) => (
                                <p key={index}>
                                    - {tool}
                                </p>
                            ))
                        )}
                    </div>
                    <span
                        className="text-[9px] font-black mt-2 md:text-[15px] xl:text-[20px] xl:mt-4">Características:</span>
                    <div className="text-[9px] font-medium flex flex-col leading-tight md:text-[15px] xl:text-[20px]">
                        {isEditing ? (
                            <textarea
                                className="text-[9px] font-medium w-full border border-gray-300 rounded p-1 md:text-[15px] xl:text-[20px]"
                                value={editedCharacteristics}
                                onChange={(e) => setEditedCharacteristics(e.target.value)}
                                rows={5}
                            />
                        ) : (
                            characteristicsSplit.map((char: string, index: number) => (
                                <p key={index}>
                                    - {char}
                                </p>
                            ))
                        )}
                    </div>
                </div>
                <span className="text-[#00178F] text-[10px] font-black mt-2.5 md:text-[16px] xl:text-[22px] xl:mt-6">
                    Envia tu CV a: {" "}
                    <a
                        className='hover:underline hover:duration-500'
                        href="mailto:rh@tibs.com.mx">
                        rh@tibs.com.mx
                    </a>
                </span>
            </div>
        </div>
    )
};
