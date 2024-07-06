// UNIT
import { DeleteUnitModal } from "@/components/dashboard/modal/unit/delete-unit.modal"
import { RemoveLeaderModal } from "@/components/dashboard/modal/unit/remove-leader.modal"
import { RemoveScoutModal } from "@/components/dashboard/modal/unit/remove-scout.modal"
import { ScoutRequestModalLeader } from "@/components/scout/modal/scout-status.modal"

// SCOUT
import { ScoutRequestModal } from "@/components/dashboard/modal/scout/scout-status.modal"
import { DeleteScoutModal } from "@/components/dashboard/modal/scout/delete-scout.modal"
import { AssignUnitLeaderModal } from "@/components/dashboard/modal/unit/assign-leader.modal"
import { ScoutCardModal } from "@/components/dashboard/modal/scout/scout-card.modal"

// AWARD
import { CreateAwardModal } from "@/components/dashboard/modal/award/create-award-modal"
import { UpdateAwardModal } from "@/components/dashboard/modal/award/update-award-modal"
import { DeleteAwardModal } from "@/components/dashboard/modal/award/delete-award.modal"

// EVENT
import { DeleteEventAppModal } from "@/components/dashboard/modal/event/delete-event-app.modal"
import { DeleteEventModal } from "@/components/dashboard/modal/event/delete-event.modal"
import { EventAppStatusModal } from "@/components/dashboard/modal/event/event-app-status.modal"

// TRAINING
import { DeleteTrainingModal } from "@/components/dashboard/modal/training/delete-training-modal"
import { TrainingAppStatusModal } from "@/components/dashboard/modal/training/training-app-status.modal"
import { DeleteTrainingAppModal } from "@/components/dashboard/modal/training/delete-training-app.modal"

// MIGRATION
import { DeleteMigrationModal } from "@/components/dashboard/modal/migration/delete-migration.modal"
import { MigrationStatusModal } from "@/components/dashboard/modal/migration/migration-status.modal"
import { MigrationViewModal } from "@/components/dashboard/modal/migration/migration-view.modal"
import { MigrationModal } from "@/components/dashboard/modal/migration/migration.modal"
import { MigrationModalLeader } from "@/components/scout/modal/migration.modal"

// BAN
import { BanStatusModal } from "@/components/dashboard/modal/ban/ban-status.modal"
import { DeleteBanModal } from "@/components/dashboard/modal/ban/delete-ban.modal"
import { BanModal } from "@/components/scout/modal/ban.modal"
import { BanViewModal } from "@/components/dashboard/modal/ban/ban-view.modal"

// COMMITEE
import { DeleteCommiteeModal } from "@/components/dashboard/modal/commitee/delete-commitee-modal"

// FEE
import { AssignFeeModal } from "@/components/dashboard/modal/fee/assign-fee.modal"
import { UpdateFeeModal } from "@/components/dashboard/modal/fee/update-fee.modal"
import { DeleteFeeModal } from "@/components/dashboard/modal/fee/delete-fee.modal"

// COUPON
import { AssignCouponModal } from "@/components/dashboard/modal/coupon/assign-coupon.modal"
import { UpdateCouponModal } from "@/components/dashboard/modal/coupon/update-coupon.modal"
import { DeleteCouponModal } from "@/components/dashboard/modal/coupon/delete-coupon.modal"

// SIGNATURE
import { UpdateSignatureModal } from "@/components/dashboard/modal/signature/update-signature.modal"
import { AssignSignatureModal } from "@/components/dashboard/modal/signature/assign-signature.modal"
import { DeleteSignatureModal } from "@/components/dashboard/modal/signature/delete-signature.modal"

// GALLERY
import { DeleteGalleryModal } from "@/components/dashboard/modal/gallery/delete-gallery.modal"

// NEWS
import { DeleteNewsModal } from "@/components/dashboard/modal/news/delete-news.modal"

// NOTICE
import { DeleteNoticeModal } from "@/components/dashboard/modal/notice/delete-notice.modal"

export const ModalProvider = () => {
    return (
        <>
            {/* UNIT */}
            <DeleteUnitModal />
            <AssignUnitLeaderModal />
            <RemoveLeaderModal />
            <RemoveScoutModal />

            {/* SCOUT */}
            <ScoutRequestModal />
            <DeleteScoutModal />
            <ScoutRequestModalLeader />
            <ScoutCardModal />

            {/* AWARD */}
            <CreateAwardModal />
            <UpdateAwardModal />
            <DeleteAwardModal />

            {/* EVENT */}
            <EventAppStatusModal />
            <DeleteEventAppModal />
            <DeleteEventModal />

            {/* TRAINING */}
            <DeleteTrainingModal />
            <TrainingAppStatusModal />
            <DeleteTrainingAppModal />

            {/* MIGRATION */}
            <MigrationModal />
            <MigrationViewModal />
            <MigrationStatusModal />
            <DeleteMigrationModal />
            <MigrationModalLeader />

            {/* BAN */}
            <BanViewModal />
            <BanStatusModal />
            <BanModal />
            <DeleteBanModal />

            {/* COMMITEE */}
            <DeleteCommiteeModal />

            {/* FEE */}
            <AssignFeeModal />
            <UpdateFeeModal />
            <DeleteFeeModal />

            {/* COUPON */}
            <AssignCouponModal />
            <UpdateCouponModal />
            <DeleteCouponModal />

            {/* SIGNATURE */}
            <AssignSignatureModal />
            <UpdateSignatureModal />
            <DeleteSignatureModal />

            {/* NEWS */}
            <DeleteNewsModal />

            {/* GALLERY */}
            <DeleteGalleryModal />

            {/* NOTICE */}
            <DeleteNoticeModal />
        </>
    )
}