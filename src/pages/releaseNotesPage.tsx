import { releaseNotesData } from "@/lib/releaseNotes";
import { Undo2 } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

const ReleaseNotesPage = () => {
  const notes = releaseNotesData.map((data, index) => (
    <div
      key={index}
      className="text-[#212529] border-2 rounded-2xl p-4 space-y-2"
    >
      <p className="text-2xl font-semibold">{data.version}</p>
      <p>
        <span className="font-bold">Released On:</span> {data.releasedOn}
      </p>
      {data.changes.map((change, index) => (
        <p className="ml-2">
          {index + 1}. {change}
        </p>
      ))}
    </div>
  ));
  return (
    <div className="md:space-y-8 space-y-2 md:my-8 py-4 md:py-8 px-4 md:px-6 md:rounded-2xl bg-secondaryBackground">
      <Helmet>
        <title>Release Notes</title>
      </Helmet>
      <div className="flex flex-row space-x-5 items-center">
        <Link href="/">
          <Undo2 color="#1B2950" size={30} className="hover:cursor-pointer" />
        </Link>
        <h1 className="text-2xl md:text-4xl font-bold text-[#1B2950]">
          Release Notes
        </h1>
      </div>
      <div className="space-y-4">{notes}</div>
    </div>
  );
};

export default ReleaseNotesPage;
