//
// export const WorkplaceTypeList: { workplaceTypeId: number; workplaceTypeName: string }[] = [
//   { workplaceTypeId: 0, workplaceTypeName: "job_workplace_onsite" },
//   { workplaceTypeId: 1, workplaceTypeName: "job_workplace_remote" },
//   { workplaceTypeId: 2, workplaceTypeName: "job_workplace_hybrid" },
// ];
//
// export const WorkTypeList: { workTypeId: number; workTypeName: string }[] = [
//   { workTypeId: 0, workTypeName: "job_worktype_full" },
//   { workTypeId: 1, workTypeName: "job_worktype_part" },
// ];

import {t} from "i18next";

export const modalTitles: Record<string, string> = {
    delete  : t("lblDelete"),
    confirm : t("lblConfirm"),
    cancel  : t("lblCancel"),
};
export const modalConfirmLabels: Record<string, string> = {
    delete  : t("lblDelete"),
    confirm : t("lblConfirm"),
    cancel  : t("lblCancel"),
};