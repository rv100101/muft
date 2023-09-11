import { releaseNotesData } from "@/lib/releaseNotes";

const ReleaseNotesPage = () => {
  const notes = releaseNotesData.map((data) => (
    <div className="text-[#212529] border-2 rounded-2xl p-4 space-y-2">
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
      <h1 className="text-2xl md:text-4xl font-bold text-[#1B2950]">
        Release Notes
      </h1>
      <div className="space-y-4">{notes}</div>
    </div>
  );
};

export default ReleaseNotesPage;
