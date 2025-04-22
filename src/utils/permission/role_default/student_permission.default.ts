import { PermissionAttributes, ResourceEnum } from "../permission.attribute";

export const StudentPermissionDefault: PermissionAttributes = {
  [ResourceEnum.course]: {
    create: false,
    update: false,
    delete: false,
    read: true,
    course_view_unpublished: false,
  },
  [ResourceEnum.content]: {
    create: false,
    update: false,
    delete: false,
    read: true,
  },
  [ResourceEnum.user]: {
    create: false,
    update: true,
    delete: false,
    read: true,
  },
};
