import {
  BookOpen,
  Briefcase,
  Cake,
  Heart,
  Languages,
  MapPin,
  MoreHorizontal,
  Phone,
  PlusCircle,
} from "lucide-react";

type OverviewFormType = {
  overviewInputs: {
    locationText: string;
    educationText: string;
    careerText: string;
    relationshipText: string;
    contactText: string;
    birthInfoText: string;
    languageText: string;
  };
  overviewEditModes: {
    locationText: boolean;
    educationText: boolean;
    careerText: boolean;
    relationshipText: boolean;
    contactText: boolean;
    birthInfoText: boolean;
    languageText: boolean;
  };
  overviewHandleInputChange: (fieldName: string, value: string) => void;
};

const OverviewForm = ({
  overviewEditModes,
  overviewInputs,
  overviewHandleInputChange,
}: OverviewFormType) => {
  return (
    <div className="flex justify-center items-center w-full">
      no records yet.
    </div>
    // <div className="flex flex-col w-full space-y-5">
    //   <div className="flex flex-row justify-between w-full px-5">
    //     {overviewEditModes.locationText ? (
    //       <div className="flex flex-row space-x-2 hover:cursor-pointer">
    //         <PlusCircle
    //           color="#FF599B"
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <input
    //           type="text"
    //           value={overviewInputs.locationText}
    //           onChange={(e) =>
    //             overviewHandleInputChange("locationText", e.target.value)
    //           }
    //           // onBlur={() => overviewSetEditMode("locationText", false)}
    //           autoFocus
    //           className="outline-0 text-[#FF599B]"
    //           name="locationText"
    //         />
    //       </div>
    //     ) : (
    //       <div
    //         className="flex flex-row space-x-2 hover:cursor-pointer"
    //         // onDoubleClick={() => overviewSetEditMode("locationText", true)}
    //       >
    //         <MapPin
    //           color={
    //             overviewInputs.locationText === "Add Relationship Status"
    //               ? "#FF599B"
    //               : "#727272"
    //           }
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <p
    //           className={
    //             overviewInputs.locationText === "Add Relationship Status"
    //               ? "text-[#FF599B]"
    //               : "text-[#727272]"
    //           }
    //         >
    //           {overviewInputs.locationText}
    //         </p>
    //       </div>
    //     )}
    //     {overviewInputs.locationText !== "Add Relationship Status" &&
    //       !overviewEditModes.locationText && (
    //         <MoreHorizontal
    //           color="#727272"
    //           size={20}
    //           className="hover:cursor-pointer "
    //         />
    //       )}
    //   </div>
    //   <div className="flex flex-row justify-between w-full px-5">
    //     {overviewEditModes.educationText ? (
    //       <div className="flex flex-row space-x-2 hover:cursor-pointer">
    //         <PlusCircle
    //           color="#FF599B"
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <input
    //           type="text"
    //           value={overviewInputs.educationText}
    //           onChange={(e) =>
    //             overviewHandleInputChange("educationText", e.target.value)
    //           }
    //           // onBlur={() => overviewSetEditMode("educationText", false)}
    //           autoFocus
    //           className="outline-0 text-[#FF599B]"
    //           name="educationText"
    //         />
    //       </div>
    //     ) : (
    //       <div
    //         className="flex flex-row space-x-2 hover:cursor-pointer"
    //         // onDoubleClick={() => overviewSetEditMode("educationText", true)}
    //       >
    //         <BookOpen
    //           color={
    //             overviewInputs.educationText === "Add Relationship Status"
    //               ? "#FF599B"
    //               : "#727272"
    //           }
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <p
    //           className={
    //             overviewInputs.educationText === "Add Relationship Status"
    //               ? "text-[#FF599B]"
    //               : "text-[#727272]"
    //           }
    //         >
    //           {overviewInputs.educationText}
    //         </p>
    //       </div>
    //     )}
    //     {overviewInputs.educationText !== "Add Relationship Status" &&
    //       !overviewEditModes.educationText && (
    //         <MoreHorizontal
    //           color="#727272"
    //           size={20}
    //           className="hover:cursor-pointer "
    //         />
    //       )}
    //   </div>
    //   <div className="flex flex-row justify-between w-full px-5">
    //     {overviewEditModes.careerText ? (
    //       <div className="flex flex-row space-x-2 hover:cursor-pointer">
    //         <PlusCircle
    //           color="#FF599B"
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <input
    //           type="text"
    //           value={overviewInputs.careerText}
    //           onChange={(e) =>
    //             overviewHandleInputChange("careerText", e.target.value)
    //           }
    //           // onBlur={() => overviewSetEditMode("careerText", false)}
    //           autoFocus
    //           className="outline-0 text-[#FF599B]"
    //           name="careerText"
    //         />
    //       </div>
    //     ) : (
    //       <div
    //         className="flex flex-row space-x-2 hover:cursor-pointer"
    //         // onDoubleClick={() => overviewSetEditMode("careerText", true)}
    //       >
    //         <Briefcase
    //           color={
    //             overviewInputs.careerText === "Add Relationship Status"
    //               ? "#FF599B"
    //               : "#727272"
    //           }
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <p
    //           className={
    //             overviewInputs.careerText === "Add Relationship Status"
    //               ? "text-[#FF599B]"
    //               : "text-[#727272]"
    //           }
    //         >
    //           {overviewInputs.careerText}
    //         </p>
    //       </div>
    //     )}
    //     {overviewInputs.careerText !== "Add Relationship Status" &&
    //       !overviewEditModes.careerText && (
    //         <MoreHorizontal
    //           color="#727272"
    //           size={20}
    //           className="hover:cursor-pointer "
    //         />
    //       )}
    //   </div>

    //   {/* add new */}
    //   <div className="flex flex-row justify-between w-full px-5">
    //     {overviewEditModes.relationshipText ? (
    //       <div className="flex flex-row space-x-2 hover:cursor-pointer">
    //         <PlusCircle
    //           color="#FF599B"
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <input
    //           type="text"
    //           value={overviewInputs.relationshipText}
    //           onChange={(e) =>
    //             overviewHandleInputChange("relationshipText", e.target.value)
    //           }
    //           // onBlur={() => overviewSetEditMode("relationshipText", false)}
    //           autoFocus
    //           className="outline-0 text-[#FF599B]"
    //           name="relationshipText"
    //         />
    //       </div>
    //     ) : (
    //       <div
    //         className="flex flex-row space-x-2 hover:cursor-pointer"
    //         // onDoubleClick={() => overviewSetEditMode("relationshipText", true)}
    //       >
    //         <Heart
    //           color={
    //             overviewInputs.relationshipText === "Add Relationship Status"
    //               ? "#FF599B"
    //               : "#727272"
    //           }
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <p
    //           className={
    //             overviewInputs.relationshipText === "Add Relationship Status"
    //               ? "text-[#FF599B]"
    //               : "text-[#727272]"
    //           }
    //         >
    //           {overviewInputs.relationshipText}
    //         </p>
    //       </div>
    //     )}
    //     {overviewInputs.relationshipText !== "Add Relationship Status" &&
    //       !overviewEditModes.relationshipText && (
    //         <MoreHorizontal
    //           color="#727272"
    //           size={20}
    //           className="hover:cursor-pointer "
    //         />
    //       )}
    //   </div>

    //   <div className="flex flex-row justify-between w-full px-5">
    //     {overviewEditModes.contactText ? (
    //       <div className="flex flex-row space-x-2 hover:cursor-pointer">
    //         <PlusCircle
    //           color="#FF599B"
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <input
    //           type="text"
    //           value={overviewInputs.contactText}
    //           onChange={(e) =>
    //             overviewHandleInputChange("contactText", e.target.value)
    //           }
    //           // onBlur={() => overviewSetEditMode("contactText", false)}
    //           autoFocus
    //           className="outline-0 text-[#FF599B]"
    //           name="contactText"
    //         />
    //       </div>
    //     ) : (
    //       <div
    //         className="flex flex-row space-x-2 hover:cursor-pointer"
    //         // onDoubleClick={() => overviewSetEditMode("contactText", true)}
    //       >
    //         <Phone
    //           color={
    //             overviewInputs.contactText === "Add Relationship Status"
    //               ? "#FF599B"
    //               : "#727272"
    //           }
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <p
    //           className={
    //             overviewInputs.contactText === "Add Relationship Status"
    //               ? "text-[#FF599B]"
    //               : "text-[#727272]"
    //           }
    //         >
    //           {overviewInputs.contactText}
    //         </p>
    //       </div>
    //     )}
    //     {overviewInputs.contactText !== "Add Relationship Status" &&
    //       !overviewEditModes.contactText && (
    //         <MoreHorizontal
    //           color="#727272"
    //           size={20}
    //           className="hover:cursor-pointer "
    //         />
    //       )}
    //   </div>

    //   <div className="flex flex-row justify-between w-full px-5">
    //     {overviewEditModes.birthInfoText ? (
    //       <div className="flex flex-row space-x-2 hover:cursor-pointer">
    //         <PlusCircle
    //           color="#FF599B"
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <input
    //           type="text"
    //           value={overviewInputs.birthInfoText}
    //           onChange={(e) =>
    //             overviewHandleInputChange("birthInfoText", e.target.value)
    //           }
    //           // onBlur={() => overviewSetEditMode("birthInfoText", false)}
    //           autoFocus
    //           className="outline-0 text-[#FF599B]"
    //           name="birthInfoText"
    //         />
    //       </div>
    //     ) : (
    //       <div
    //         className="flex flex-row space-x-2 hover:cursor-pointer"
    //         // onDoubleClick={() => overviewSetEditMode("birthInfoText", true)}
    //       >
    //         <Cake
    //           color={
    //             overviewInputs.birthInfoText === "Add Relationship Status"
    //               ? "#FF599B"
    //               : "#727272"
    //           }
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <p
    //           className={
    //             overviewInputs.birthInfoText === "Add Relationship Status"
    //               ? "text-[#FF599B]"
    //               : "text-[#727272]"
    //           }
    //         >
    //           {overviewInputs.birthInfoText}
    //         </p>
    //       </div>
    //     )}
    //     {overviewInputs.birthInfoText !== "Add Relationship Status" &&
    //       !overviewEditModes.birthInfoText && (
    //         <MoreHorizontal
    //           color="#727272"
    //           size={20}
    //           className="hover:cursor-pointer "
    //         />
    //       )}
    //   </div>

    //   <div className="flex flex-row justify-between w-full px-5">
    //     {overviewEditModes.languageText ? (
    //       <div className="flex flex-row space-x-2 hover:cursor-pointer">
    //         <PlusCircle
    //           color="#FF599B"
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <input
    //           type="text"
    //           value={overviewInputs.languageText}
    //           onChange={(e) =>
    //             overviewHandleInputChange("languageText", e.target.value)
    //           }
    //           // onBlur={() => overviewSetEditMode("languageText", false)}
    //           autoFocus
    //           className="outline-0 text-[#FF599B]"
    //           name="languageText"
    //         />
    //       </div>
    //     ) : (
    //       <div
    //         className="flex flex-row space-x-2 hover:cursor-pointer"
    //         // onDoubleClick={() => overviewSetEditMode("languageText", true)}
    //       >
    //         <Languages
    //           color={
    //             overviewInputs.languageText === "Add Relationship Status"
    //               ? "#FF599B"
    //               : "#727272"
    //           }
    //           size={20}
    //           className="hover:cursor-pointer"
    //         />
    //         <p
    //           className={
    //             overviewInputs.languageText === "Add Relationship Status"
    //               ? "text-[#FF599B]"
    //               : "text-[#727272]"
    //           }
    //         >
    //           {overviewInputs.languageText}
    //         </p>
    //       </div>
    //     )}
    //     {overviewInputs.languageText !== "Add Relationship Status" &&
    //       !overviewEditModes.languageText && (
    //         <MoreHorizontal
    //           color="#727272"
    //           size={20}
    //           className="hover:cursor-pointer "
    //         />
    //       )}
    //   </div>

    //   {/*  */}
    // </div>
  );
};

export default OverviewForm;
