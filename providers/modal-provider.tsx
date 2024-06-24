import { AssignUnitLeaderModal } from "@/components/dashboard/modal/assign-leader.modal"
import { CreateAwardModal } from "@/components/dashboard/modal/create-award-modal"
import { DeleteAwardModal } from "@/components/dashboard/modal/delete-award.modal"
import { RemoveLeaderModal } from "@/components/dashboard/modal/remove-leader.modal"
import { ScoutCardModal } from "@/components/dashboard/modal/scout-card.modal"
import { ScoutRequestModal } from "@/components/dashboard/modal/scout-status.modal"
import { DeleteScoutModal } from "@/components/dashboard/modal/scout.modal"
import { UpdateAwardModal } from "@/components/dashboard/modal/update-award-modal"

export const ModalProvider = () => {
    return (
        <>
            <ScoutRequestModal />
            <DeleteScoutModal />
            <ScoutCardModal />
            <CreateAwardModal />
            <UpdateAwardModal />
            <DeleteAwardModal />
            <AssignUnitLeaderModal />
            <RemoveLeaderModal />
        </>
    )
}