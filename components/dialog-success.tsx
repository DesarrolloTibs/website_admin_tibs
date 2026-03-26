interface DialogSuccessProps {
  dialog: {
    open: boolean;
    title: string;
    subTitle: string;
    type: string;
  };
  closeDialog: () => void;
  handleAction?: () => void; // Acción opcional para el botón de aceptar
}

export const DialogSuccess = ({ dialog, closeDialog, handleAction }: DialogSuccessProps) => {
  return (
    <>
      {dialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay oscuro */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => closeDialog()} // cerrar al hacer clic fuera
          ></div>

          {/* Contenido del modal */}
          <div className="relative z-10 mx-4 w-full max-w-xl transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className={`mx-auto flex size-12 shrink-0 items-center justify-center rounded-full ${dialog.type == "success" ? "bg-green-100" : "bg-red-100"}  sm:mx-0 sm:size-10`}>
                  {dialog.type == "success" ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="size-6 text-green-600"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      data-slot="icon"
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    >
                      <path
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    id="dialog-title"
                    className="text-lg font-semibold text-gray-900"
                  >
                    {dialog.title}
                  </h3>
                  <div className="mt-2">
                    <p className=" text-gray-500">{dialog.subTitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleAction}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Aceptar
              </button>
                <button
                    type="button"
                    onClick={() => closeDialog()}
                    className="mt-4 sm:mt-0 inline-flex w-full justify-center rounded-md bg-slate-600 px-3 py-2 font-semibold text-white shadow-xs hover:bg-slate-500 sm:ml-3 sm:w-auto"
                >
                    Cancelar
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
