import { AdminPermissionDefault } from "@utils/permission/role_default/admin_permission.default";
import { MentorPermissionDefault } from "@utils/permission/role_default/mentor_permission.default";
import { StudentPermissionDefault } from "@utils/permission/role_default/student_permission.default";
import db from "db/db";
import {
  ResourcePermission,
  ResourcePermissionInsertSchema,
} from "db/schema/resource_permission.schema";
import { UserRoles } from "db/schema/user.schema";
import { and, eq } from "drizzle-orm";

export const createResourcePermission = async (
  data: ResourcePermissionInsertSchema
) => {
  const permission = await db
    .insert(ResourcePermission)
    .values(data)
    .returning();

  return permission;
};

export const createResourcePermissionByRole = async (role: UserRoles) => {
  let defaultPermission = {};

  switch (role) {
    case UserRoles.ADMIN: {
      defaultPermission = AdminPermissionDefault;
      break;
    }
    case UserRoles.MENTOR: {
      defaultPermission = MentorPermissionDefault;
      break;
    }
    case UserRoles.STUDENT: {
      defaultPermission = StudentPermissionDefault;
      break;
    }
    default: {
      defaultPermission = StudentPermissionDefault;
    }
  }

  const data = {
    role,
    attributes: defaultPermission,
  };

  const permissionResource = await db
    .insert(ResourcePermission)
    .values(data)
    .returning();

  return permissionResource;
};

export const updateResourcePermmission = async (
  updatePayload: ResourcePermissionInsertSchema,
  whereClause: {
    id: string;
  }
) => {
  const updatedResourcePermission = await db
    .update(ResourcePermission)
    .set({
      ...updatePayload,
    })
    .where(eq(ResourcePermission.id, whereClause.id))
    .returning();

  return updateResourcePermmission;
};

export const getResourcePermission = async (whereClause: {
  id?: string;
  role?: UserRoles;
}) => {
  const andCondition = [];
  if (whereClause.role) {
    andCondition.push(eq(ResourcePermission.role, whereClause.role));
  }
  if (whereClause.id) {
    andCondition.push(eq(ResourcePermission.id, whereClause.id));
  }

  const whereCondition = and(...andCondition);

  const resourcePermission = await db
    .select()
    .from(ResourcePermission)
    .where(whereCondition)
    .limit(1);

  return resourcePermission[0];
};
