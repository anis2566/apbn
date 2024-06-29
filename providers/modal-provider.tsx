import { AssignUnitLeaderModal } from "@/components/dashboard/modal/assign-leader.modal"
import { BanStatusModal } from "@/components/dashboard/modal/ban-status.modal"
import { BanViewModal } from "@/components/dashboard/modal/ban-view.modal"
import { CreateAwardModal } from "@/components/dashboard/modal/create-award-modal"
import { DeleteCommiteeModal } from "@/components/dashboard/modal/delete-commitee-modal"
import { DeleteAwardModal } from "@/components/dashboard/modal/delete-award.modal"
import { DeleteBanModal } from "@/components/dashboard/modal/delete-ban.modal"
import { DeleteEventAppModal } from "@/components/dashboard/modal/delete-event-app.modal"
import { DeleteEventModal } from "@/components/dashboard/modal/delete-event.modal"
import { DeleteMigrationModal } from "@/components/dashboard/modal/delete-migration.modal"
import { EventAppStatusModal } from "@/components/dashboard/modal/event-app-status.modal"
import { MigrationStatusModal } from "@/components/dashboard/modal/migration-status.modal"
import { MigrationViewModal } from "@/components/dashboard/modal/migration-view.modal"
import { MigrationModal } from "@/components/dashboard/modal/migration.modal"
import { RemoveLeaderModal } from "@/components/dashboard/modal/remove-leader.modal"
import { RemoveScoutModal } from "@/components/dashboard/modal/remove-scout.modal"
import { ScoutCardModal } from "@/components/dashboard/modal/scout-card.modal"
import { ScoutRequestModal } from "@/components/dashboard/modal/scout-status.modal"
import { DeleteScoutModal } from "@/components/dashboard/modal/scout.modal"
import { UpdateAwardModal } from "@/components/dashboard/modal/update-award-modal"
import { BanModal } from "@/components/scout/modal/ban.modal"
import { MigrationModalLeader } from "@/components/scout/modal/migration.modal"
import { ScoutRequestModalLeader } from "@/components/scout/modal/scout-status.modal"
import { DeleteTrainingModal } from "@/components/dashboard/modal/delete-training-modal"

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
            <MigrationModal />
            <MigrationViewModal />
            <MigrationStatusModal />
            <DeleteMigrationModal />
            <MigrationModalLeader />
            <BanViewModal />
            <BanStatusModal />
            <DeleteBanModal />
            <RemoveScoutModal />
            <ScoutRequestModalLeader />
            <BanModal />
            <EventAppStatusModal />
            <DeleteEventAppModal />
            <DeleteCommiteeModal />
            <DeleteEventModal />
            <DeleteTrainingModal />
        </>
    )
}