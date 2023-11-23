import { SubHeader } from "@/components/elements/SubHeader";
import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { EditProfileForm } from "@/features/profile/components";
import { EditProfileFormSchema } from "@/features/profile/forms/edit-profile";
import { useEditProfile } from "@/features/profile/useEditProfile";
import { useStore } from "@/store";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { toast } from "sonner";

const ProfilePage: NextPage = () => {
  const { onProfileUpdate } = useStore();
  const { mutateAsync: editProfileMutate, isPending: editProfileIsPending } =
    useEditProfile();

  const handleEditProfileSubmit = async (values: EditProfileFormSchema) => {
    try {
      const response = await editProfileMutate(values);
      toast.success(response.data.message);
      onProfileUpdate(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
    }
  };

  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Profile" />
      <FullPageLayout>
        <SubHeader url="/" title="Profile" />
        <div className="container py-4 pb-24 lg:pb-4">
          <p className="text-lg font-bold">Account Information</p>
          <p className="text-foreground/60">View and change profile data</p>
          <EditProfileForm
            isPending={editProfileIsPending}
            onSubmit={handleEditProfileSubmit}
          />
        </div>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default ProfilePage;
