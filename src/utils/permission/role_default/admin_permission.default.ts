import { PermissionAttributes, ResourceEnum } from "../permission.attribute";

export const AdminPermissionDefault: PermissionAttributes = {
  [ResourceEnum.course]: {
    create: true,
    update: true,
    delete: true,
    read: true,
    course_view_unpublished: true,
  },
  [ResourceEnum.content]: {
    create: true,
    update: true,
    delete: true,
    read: true,
  },
  [ResourceEnum.user]: {
    create: true,
    update: true,
    delete: true,
    read: true,
  },
};
