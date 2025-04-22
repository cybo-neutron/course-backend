import { getResourcePermission } from "@app/resource_permission/resource_permission.repo";
import {
  PermissionAttributes,
  ResourceEnum,
} from "@utils/permission/permission.attribute";

interface UserType {
  id: string;
  role: string;
}

export const hasPermission = async ({
  user,
  resourceAttributes,
}: {
  user: any;
  resourceAttributes: PermissionAttributes;
}) => {
  const { id: userId, role } = user;

  const resourcePermission = await getResourcePermission({
    ...(userId && {
      id: userId,
    }),
    role,
  });

  if (!resourcePermission) {
    return false;
  }

  const attributes = resourcePermission.attributes;

  //   resourceAttributes[ResourceEnum.content]?.create

  for (const resource of Object.keys(resourceAttributes)) {
    for (const action of Object.keys(resourceAttributes[resource])) {
      if (!attributes[resource][action]) {
        return false;
      }
    }
  }
  return true;
};

const user = {
  id: 1,
  role: "admin",
};

hasPermission({
  user,
  resourceAttributes: {
    [ResourceEnum.course]: {
      create: true,
    },
  },
});
