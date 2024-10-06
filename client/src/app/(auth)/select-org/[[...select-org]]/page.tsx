"use client";

import { useUser, useOrganizationList, OrganizationList } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  User,
  useCreateUserMutation,
  useUpdateUserMutation,
  useCreateOrganizationMutation,
} from "../../../../state/api";
import { useRouter } from "next/navigation";

export default function OrganizationPage() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { userMemberships, isLoaded: isOrgListLoaded } = useOrganizationList();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [createOrganization] = useCreateOrganizationMutation();
  const [userCreated, setUserCreated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const createUserInDatabase = async () => {
      if (isUserLoaded && user && !userCreated) {
        try {
          await createUser({
            id: user.id,
            name: user.username || `${user.firstName} ${user.lastName}`,
            email: user.primaryEmailAddress?.emailAddress || "",
            role: "MEMBER",
            createdAt: new Date().toISOString(),
          });
          setUserCreated(true);
          console.log("User created in database");
        } catch (error) {
          console.error("Error creating user in database:", error);
        }
      }
    };

    createUserInDatabase();
  }, [isUserLoaded, user, createUser, userCreated]);

  useEffect(() => {
    const updateUserOrganization = async () => {
      if (isOrgListLoaded && userMemberships.count > 0 && user) {
        const org = userMemberships.data[0].organization;
        try {
          // Create organization in your database if it doesn't exist
          await createOrganization({
            id: org.id,
            name: org.name,
            createdAt: new Date().toISOString(),
            userId: user.id,
          });

          // Update user with organization ID
          const updatedUserData: Partial<User> = {
            id: user.id,
            organizationId: org.id,
          };
          await updateUser(updatedUserData);

          console.log("User updated with organization");
          router.push("/dashboard");
        } catch (error) {
          console.error("Error updating user organization:", error);
        }
      }
    };

    updateUserOrganization();
  }, [
    isOrgListLoaded,
    userMemberships,
    user,
    updateUser,
    createOrganization,
    router,
  ]);

  if (!isUserLoaded || !isOrgListLoaded) {
    return <div>Loading...</div>;
  }

  if (user?.organizationMemberships.length === 0) {
    console.log(
      isOrgListLoaded,
      userMemberships.count,
      user?.organizationMemberships.length
    );
    return (
      <div className="h-full flex flex-col items-center justify-center mt-56">
        <h1 className="text-2xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-center max-w-md">
          Thank you for signing up! To access the dashboard, you need to be
          assigned to an organization. Please contact the administrator to be
          added to an organization.
        </p>
        <p className="mt-4">
          If you believe this is an error, please contact support.
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center p-5 pt-44">
        <OrganizationList
          hidePersonal
          afterSelectOrganizationUrl="/dashboard"
          afterCreateOrganizationUrl="/dashboard"
        />
      </div>
    ); // This will not be rendered as the user will be redirected if they have an organization
  }
}
