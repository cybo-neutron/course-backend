import { createResourcePermissionByRole } from "@/app/resource_permission/resource_permission.repo";
import { UserRoles } from "@/db/schema/user.schema";
import logger from "@/utils/logger";

(async () => {
  await createResourcePermissionByRole(UserRoles.ADMIN);
  logger.info("Admin permission created");
  await createResourcePermissionByRole(UserRoles.MENTOR);
  logger.info("Mentor permission created");
  await createResourcePermissionByRole(UserRoles.STUDENT);
  logger.info("Student permission created");
})()
  .then(() => {
    console.log("--------- Done ---------");
  })
  .catch((error) => {
    console.error("error occured : ", error);
  });
