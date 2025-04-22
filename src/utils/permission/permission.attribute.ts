export enum ResourceEnum {
  course = "course",
  content = "content",
  user = "user",
}

type BaseActions = {
  create?: boolean;
  update?: boolean;
  delete?: boolean;
  read?: boolean;
};

export type PermissionAttributes = {
  [ResourceEnum.course]?: BaseActions & {
    course_view_unpublished?: boolean;
  };
  [ResourceEnum.content]?: BaseActions & {};
  [ResourceEnum.user]?: BaseActions & {};
};

const permission: PermissionAttributes = {
  [ResourceEnum.course]: {
    create: true,
    update: true,
  },
  [ResourceEnum.content]: {
    create: true,
    update: true,
  },
};

console.log(permission);

// console.log(permission["course"].create)
// for (const resource of Object.keys(
//   permission
// ) as (keyof PermissionAttributes)[]) {
//   // console.log(permission[resource as ResourceEnum]);
//   console.log(permission[resource])
//   // console.log(Object.keys(permission[resource]))

//   // console.log(permission[resource] as PermissionAttributes[resource])
//   // console.log(resource)
//   // for (const action of Object.keys(permission[resource as ResourceEnum])) {
//   //   console.log(`${resource}-${action}`);
//   // }
// }

for (const [resourceKey, resource] of Object.entries(permission)) {
}
