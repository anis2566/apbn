import { ScoutRequestModal } from "@/components/dashboard/modal/scout-status.modal"
import { DeleteScoutModal } from "@/components/dashboard/modal/scout.modal"

export const ModalProvider = () => {
    return (
        <>
            <ScoutRequestModal />
            <DeleteScoutModal />
        </>
    )
}