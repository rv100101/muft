import AboutAccordion from "@/components/profile/about/aboutAccordion";
import ProfileHeader from "@/components/profile/profileHeader";
import ProfileTopNav from "@/components/profile/profileTopNav";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import { emptyDefault, ProfileFormSchema } from "@/lib/profileZodSchema";
import { useEffect, useState } from "react";
import profileHeaderStore from "@/zustand/profile/profileHeaderStore";
import profileContentQuery from "@/queries/profile/profileContent";
import selectOptions from "@/zustand/profile/selectData/selectOptions";
import { User, useUserStore } from "@/zustand/auth/user";
import { useQueryClient } from "@tanstack/react-query";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent } from "@/components/ui/dialog";
import ActivateAccount from "./accountActivationPage";
import removeDuplicates from "@/lib/removeDulpicates";
import removeExistingData from "@/lib/removeExistingData";
import calculateAge from "@/lib/calculateAge";
// import getDeletedItems from "@/lib/getDeleted";

const ProfilePageBody = ({ userId }: { userId: string }) => {
  const headerValues = profileHeaderStore((state) => state.headerValues);
  const setHeaderValues = profileHeaderStore(state => state.setHeaderValues);
  const { data, setEditModeFalse, setData } = profileAboutContentStore();
  const { setIsSaving } = profileAboutContentStore();
  const { user } = useUserStore();
  const updateUser = useUserStore((state) => state.updateUser);
  const queryClient = useQueryClient();
  const methods = useForm({
    defaultValues: emptyDefault,
    resolver: zodResolver(ProfileFormSchema),
  });

  const [open] = useState(true);
  useEffect(() => {
    if (data && headerValues) {
      methods.reset({
        car: data.car ?? "",
        gender: data.gender,
        nationality: data.nationality,
        birthInfo: data.birthInfo,
        ethnicity: data.ethnicity,
        maritalStatus: data.maritalStatus,
        language: removeDuplicates(data.language, "language_name"),
        education: data.education,
        employmentStatus: data.employmentStatus,
        occupationTitle: data.occupationTitle,
        income: data.income,
        height: data.height,
        weight: data.weight,
        bodyType: data.bodyType,
        favoriteFood: removeDuplicates(data.favoriteFood, "favorite_food_name"),
        country: data.country,
        region: data.region,
        nickname: data.nickname,
        religion: data.religion,
        hair: data.hair,
        eyes: data.eyes,
        bodyArt: data.bodyArt,
        haveChildren: data.haveChildren,
        wantChildren: data.wantChildren,
        workout: data.workout,
        disability: data.disability,
        pets: removeDuplicates(data.pets, "pet_name"),
        drinking: data.drinking,
        smoking: data.smoking,
        livingStatus: data.livingStatus,
        interest: removeDuplicates(data.interest, "interest_name"),
      });
    }
  }, [data, headerValues, methods]);

  const {
    educations,
    employmentStatus,
    incomes,
    occupations,
    nationalities,
    ethnicities,
    maritalStatus,
    bodyTypes,
    religion,
    countries,
    states,
    bodyArts,
    car,
    disability,
    drink,
    eyes,
    hair,
    haveChildren,
    wantChildren,
    livingStatus,
    smoke,
    workout,
  } = selectOptions();

  const getEthnicity = (ethnicityName: string) =>
    ethnicities.find((ethnicity) => ethnicity.ethnicity_name === ethnicityName);

  const getNationality = (nationalityName: string) =>
    nationalities.find(
      (nationality) => nationality.nationality === nationalityName
    );

  const getEducation = (name: string) =>
    educations.find((e) => e.education_name === name);

  const getOccupation = (name: string) =>
    occupations.find((e) => e.occupation_title === name);

  const getMaritalStatus = (maritalStatusName: string) =>
    maritalStatus.find((ms) => ms.marital_status_name === maritalStatusName);

  const getIncome = (name: string) =>
    incomes.find((income) => income.income_range === name);

  const getBodyType = (name: string) =>
    bodyTypes.find((bt) => bt.body === name);

  const getCountryData = (name: string) =>
    countries.find((c) => c.country_name === name);

  const getStateData = (name: string) =>
    states.find((s) => s.state_name === name);

  const getBodyArtsData = (name: string) =>
    bodyArts.find((s) => s.body === name);

  const getCarData = (name: string) => car.find((s) => s.car_name === name);

  const getDrinkData = (name: string) =>
    drink.find((s) => s.drink_name === name);

  const getDisabilityData = (name: string) =>
    disability.find((s) => s.disability_name === name);

  const getEyesData = (name: string) => eyes.find((s) => s.eyes_name === name);

  const getHairData = (name: string) => hair.find((s) => s.hair_name === name);

  const getHaveChildrenData = (name: string) =>
    haveChildren.find((s) => s.have_children_name === name);

  const getWantChildrenData = (name: string) =>
    wantChildren.find((s) => s.want_children_name === name);

  const getLivingStatusData = (name: string) =>
    livingStatus.find((s) => s.living_status === name);

  const getSmokeData = (name: string) =>
    smoke.find((s) => s.smoke_name === name);

  const getWorkoutData = (name: string) =>
    workout.find((s) => s.workout_name === name);

  const getReligion = (name: string) =>
    religion.find((s) => s.religion_name === name);

  const getEmploymentStatus = (name: string) =>
    employmentStatus.find((s) => s.employment_status_name === name);

  const onSubmit = async (formData: any) => {
    // return;
    // if (!methods.formState.isDirty) {
    //   toggleEditMode();
    //   return;
    // }
    setIsSaving(true);
    let finalFormData = { ...formData };
    try {
      const ethnicity = getEthnicity(formData.ethnicity);
      const nationality = getNationality(formData.nationality);
      const maritalStatus = getMaritalStatus(formData.maritalStatus);
      const education = getEducation(formData.education);
      const occupation = getOccupation(formData.occupationTitle);
      const income = getIncome(formData.income);
      const bodyType = getBodyType(formData.bodyType);
      const country = getCountryData(formData.country);
      const region = getStateData(formData.region);
      const bodyArts = getBodyArtsData(formData.bodyArt);
      const car = getCarData(formData.car);
      const drink = getDrinkData(formData.drinking);
      const eyes = getEyesData(formData.eyes);
      const hair = getHairData(formData.hair);
      const haveChildren = getHaveChildrenData(formData.haveChildren);
      const wantChildren = getWantChildrenData(formData.wantChildren);
      const livingStatus = getLivingStatusData(formData.livingStatus);
      const smoke = getSmokeData(formData.smoking);
      const workout = getWorkoutData(formData.workout);
      const religion = getReligion(formData.religion);
      const disability = getDisabilityData(formData.disability);
      const employmentStatus = getEmploymentStatus(formData.employmentStatus);
      const finalLanguages = removeExistingData(
        formData.language,
        data!.language,
        "language_name"
      );
      const finalFavoriteFood = removeExistingData(
        formData.favoriteFood,
        data!.favoriteFood,
        "favorite_food_name"
      );
      const finalPets = removeExistingData(
        formData.pets,
        data!.pets,
        "pet_name"
      );
      const finalInterests = removeExistingData(
        formData.interest,
        data!.interest,
        "interest_name"
      );
      finalFormData = {
        ...finalFormData,
        language: finalLanguages,
        favoriteFood: finalFavoriteFood,
        pets: finalPets,
        interest: finalInterests,
        // deletedLanguages: getDeletedItems(
        //   data?.language ?? [],
        //   finalLanguages,
        //   "language_code"
        // ),
        // deletedFaveFoods: getDeletedItems(
        //   data?.favoriteFood ?? [],
        //   finalFavoriteFood,
        //   "favorite_food_id"
        // ),
        // deletedInterests: getDeletedItems(
        //   data?.interest ?? [],
        //   finalInterests,
        //   "interest_id"
        // ),
        // deletedPets: getDeletedItems(data?.pets ?? [], finalPets, "pet_id"),
        ethnicity: ethnicity?.ethnicity_id,
        nationality: nationality?.country_code,
        maritalStatus: maritalStatus?.marital_status_id,
        education: education?.education_id,
        occupationTitle: occupation?.occupation_id,
        income: income?.income_id,
        bodyType: bodyType?.body_type_id,
        country: country?.country_code,
        region: region?.state_id,
        bodyArt: bodyArts?.body_art_id,
        car: car?.car_id,
        drinking: drink?.drink_id,
        eyes: eyes?.eyes_id,
        hair: hair?.hair_id,
        haveChildren: haveChildren?.have_children_id,
        wantChildren: wantChildren?.want_children_id,
        livingStatus: livingStatus?.living_status_id,
        smoking: smoke?.smoke_id,
        workout: workout?.workout_id,
        disability: disability?.disability_id,
        religion: religion?.religion_id,
        employmentStatus: employmentStatus?.employment_status_id,
      };
      await profileContentQuery.saveInformation(finalFormData, user!.member_id);
      console.log(formData);
      const age = calculateAge(formData.birthInfo);
      setHeaderValues({ ...headerValues!, nickname: formData.nickname, age });
      setData({ ...data!, ...formData, age });
      updateUser({ ...user, profile_completed: true } as User);
      queryClient.invalidateQueries(["profileHeader"]);
      queryClient.invalidateQueries(["profileContent"]);
      queryClient.invalidateQueries(["home-members"]);
      toast({
        variant: "success",
        title: "Profile saved!",
      });
      setEditModeFalse();
    } catch (error) {
      console.log(error);
    }
    setIsSaving(false);
  };
  useEffect(() => {
    if (Object.getOwnPropertyNames(methods.formState.errors).length > 0) {
      toast({
        variant: "destructive",
        title: "All Fields are required",
        description: "check all tabs to ensure all fields are inputted.",
        action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>,
      });
    }
  }, [methods.formState.errors]);
  return (
    <div className="flex h-screen flex-col justify-start w-full lg:w-3/4 border mx-auto">
      {!user!.is_active && (
        <div className="h-full overflow-y-scroll flex flex-col">
          <Dialog open={open}>
            <DialogContent className="sm:max-w-md opacity-100">
              <ActivateAccount />
            </DialogContent>
          </Dialog>
        </div>
      )}
      <FormProvider {...methods}>
        <form
          className="flex flex-col h-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <ProfileTopNav />
          <div className="h-full overflow-y-scroll no-scrollbar flex flex-col">
            {user?.profile_completed && <ProfileHeader userId={userId} />}
            <AboutAccordion userId={parseInt(userId)} />
            {/* user?.profile_completed && <GallerySection userId={userId} /> */}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProfilePageBody;
