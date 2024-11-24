// FEE
import { AssignFeeModal } from "@/app/dashboard/utils/fee/_components/create-fee-modal"
import { UpdateFeeModal } from "@/app/dashboard/utils/fee/_components/update-fee-modal"
import { DeleteFeeModal } from "@/app/dashboard/utils/fee/_components/delete-fee-modal"

// COUPON
import { AssignCouponModal } from "@/app/dashboard/utils/coupon/_components/create-coupon-modal"
import { UpdateCouponModal } from "@/app/dashboard/utils/coupon/_components/update-coupon-modal"
import { DeleteCouponModal } from "@/app/dashboard/utils/coupon/_components/delete-coupon-modal"

// SCOUT
import { ScoutStatusModal } from "@/app/dashboard/scout/request/_components/status-modal"
import { DeleteScoutModal } from "@/app/dashboard/scout/request/_components/delete-modal"
import { ScoutCardModal } from "@/app/dashboard/scout/_components/card-modal"
import { RemoveScoutModal } from "@/app/dashboard/unit/[id]/_components/remove-scout-modal"
import { ScoutRequestModalLeader } from "@/app/scout/unit/request/_components/status-modal"
import { BanModal } from "@/app/scout/unit/_components/ban-modal"

// UNIT
import { AssignUnitLeaderModal } from "@/app/dashboard/unit/[id]/_components/assign-leader-modal"
import { RemoveLeaderModal } from "@/app/dashboard/unit/[id]/_components/remove-leader-modal"
import { MigrationModal } from "@/app/dashboard/unit/[id]/_components/migration-modal"
import { DeleteUnitModal } from "@/app/dashboard/unit/_components/delete-unit-modal"
import { MigrationModalLeader } from "@/app/scout/unit/_components/migration-modal"

// EVENT
import { DeleteEventModal } from "@/app/dashboard/event/_components/delete-event-modal"
import { EventAppStatusModal } from "@/app/dashboard/app/event/[id]/_components/status-modal"
import { DeleteEventAppModal } from "@/app/dashboard/app/event/[id]/_components/delete-modal"

// TRAINING
import { DeleteTrainingModal } from "@/app/dashboard/training/_components/delete-training-modal"
import { TrainingAppStatusModal } from "@/app/dashboard/app/training/[id]/_components/status-modal"
import { DeleteTrainingAppModal } from "@/app/dashboard/app/training/[id]/_components/delete-modal"

// AWARD
import { DeleteAwardModal } from "@/app/dashboard/award/_components/delete-award-modal"
import { AssignAwardrModal } from "@/app/dashboard/scout/_components/award-modal"

// MIGRATION
import { MigrationViewModal } from "@/app/dashboard/app/migration/_components/migration-app-modal"
import { MigrationStatusModal } from "@/app/dashboard/app/migration/_components/status-modal"
import { DeleteMigrationModal } from "@/app/dashboard/app/migration/_components/delete-modal"

// BAN
import { BanViewModal } from "@/app/dashboard/app/ban/_components/ban-app-modal"
import { BanStatusModal } from "@/app/dashboard/app/ban/_components/status-modal"
import { DeleteBanModal } from "@/app/dashboard/app/ban/_components/delete-modal"

// COMMITTEE
import { DeleteCommiteeModal } from "@/app/dashboard/committee/_components/delete-modal"
import { AssignMemberModal } from "@/app/dashboard/committee/[id]/_components/assign-member-modal"
import { UpdateMemberModal } from "@/app/dashboard/committee/[id]/_components/update-member-modal"
import { DeleteMemberModal } from "@/app/dashboard/committee/[id]/_components/delete-member-modal"

// NEWS
import { DeleteNewsModal } from "@/app/dashboard/news/_components/delete-modal"

// NOTICE
import { DeleteNoticeModal } from "@/app/dashboard/notice/_components/delete-modal"

// GALLERY
import { DeleteGalleryModal } from "@/app/dashboard/gallery/_components/delete-modal"
import { DeleteGalleryMediaModal } from "@/app/dashboard/gallery/[id]/_components/delete-modal"

// PASSWORD
import { PasswordModal } from "@/app/auth/forgot-password/[id]/_components/password-modal"

// SIGNATURE
import { AssignSignatureModal } from "@/app/dashboard/utils/signature/_components/create-signature-modal"
import { UpdateSignatureModal } from "@/app/dashboard/utils/signature/_components/update-signature-modal"
import { DeleteSignatureModal } from "@/app/dashboard/utils/signature/_components/delete-signature-modal"

// SIGNATURE

export const ModalProvider = () => {
    return (
        <>
            {/* FEE */}
            <AssignFeeModal />
            <UpdateFeeModal />
            <DeleteFeeModal />

            {/* COUPON */}
            <AssignCouponModal />
            <UpdateCouponModal />
            <DeleteCouponModal />

            {/* SCOUT */}
            <ScoutStatusModal />
            <DeleteScoutModal />
            <ScoutCardModal />
            <RemoveScoutModal />
            <ScoutRequestModalLeader />
            <BanModal />

            {/* UNIT */}
            <AssignUnitLeaderModal />
            <RemoveLeaderModal />
            <MigrationModal />
            <DeleteUnitModal />
            <MigrationModalLeader />

            {/* EVENT */}
            <DeleteEventModal />
            <EventAppStatusModal />
            <DeleteEventAppModal />

            {/* TRAINING */}
            <DeleteTrainingModal />
            <TrainingAppStatusModal />
            <DeleteTrainingAppModal />

            {/* AWARD */}
            <DeleteAwardModal />
            <AssignAwardrModal />

            {/* MIGRATION */}
            <MigrationViewModal />
            <MigrationStatusModal />
            <DeleteMigrationModal />

            {/* BAN */}
            <BanViewModal />
            <BanStatusModal />
            <DeleteBanModal />
            
            {/* COMMITTEE */}
            <DeleteCommiteeModal />
            <AssignMemberModal />
            <UpdateMemberModal />
            <DeleteMemberModal />

            {/* SIGNATURE */}

            {/* NEWS */}
            <DeleteNewsModal />

            {/* NOTICE */}
            <DeleteNoticeModal />
            
            {/* GALLERY */}
            <DeleteGalleryModal />
            <DeleteGalleryMediaModal />

            {/* PASSWORD */}
            <PasswordModal />

            {/* SIGNATURE */}
            <AssignSignatureModal />
            <UpdateSignatureModal />
            <DeleteSignatureModal />
        </>
    )
}